import {
  BED_RANK,
  BEDROOMS,
  COM_AREAS,
  COM_BUDGETS,
  COM_EXTRAS,
  COM_EXTRA_IDS,
  COM_TYPES,
  CONDITIONS,
  CONTACT_METHODS,
  FURNISHED,
  PARKING,
  RES_AMENITIES,
  RES_AMENITY_IDS,
  RES_AREAS,
  RES_BUDGETS,
  RES_TYPES,
  TERMS,
  bandById,
  optionLabel,
  provinceName,
  rentInBand,
  valueInBand,
} from "@/domain/catalog";
import { cityKey, endOfDay, formatCAD, parseISODate, plusDays, startOfToday } from "@/domain/format";
import { statusFromExpiry } from "@/domain/expiry";
import type {
  CommercialListing,
  CommercialRequirement,
  Listing,
  MatchAssessment,
  Requirement,
  ResidentialListing,
  ResidentialRequirement,
  SearchFilters,
} from "@/domain/types";

function formatCount(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function live<T extends { expiresAt: string; status: T["status"] }>(row: T): T {
  const status = statusFromExpiry(row.expiresAt);
  return row.status === status ? row : { ...row, status };
}

export function liveListing(row: Listing): Listing {
  return live(row);
}

export function liveRequirement(row: Requirement): Requirement {
  return live(row);
}

function termFits(a: string, b: string): boolean {
  return a === b || a === "flex" || b === "flex";
}

function readyDay(listing: { immediately: boolean; availableDate: string }): Date | null {
  if (listing.immediately) return startOfToday();
  return listing.availableDate ? parseISODate(listing.availableDate) : null;
}

function latestResidential(req: ResidentialRequirement): Date | null {
  if (req.immediately) return endOfDay(startOfToday());
  const raw = req.useRange && req.moveInEnd ? req.moveInEnd : req.moveInDate;
  const parsed = raw ? parseISODate(raw) : null;
  if (!parsed) return null;
  const shifted = req.dateFlexibility ? plusDays(parsed, 15) : parsed;
  return endOfDay(shifted);
}

function dateVerdict(
  ready: Date | null,
  latest: Date | null,
): { ok: boolean; message: string } {
  if (!ready) return { ok: false, message: "No availability date is set" };
  if (!latest) return { ok: true, message: "Move-in date is open" };
  if (ready.getTime() <= latest.getTime()) {
    return { ok: true, message: "Available in time for the move-in" };
  }
  return { ok: false, message: "Available after the latest move-in date" };
}

function assessResidential(req: ResidentialRequirement, listing: ResidentialListing): MatchAssessment {
  const reasons: string[] = [];
  const gaps: string[] = [];
  const blockers: string[] = [];
  let score = 30;

  if (req.province !== listing.province) blockers.push("Different province");
  else reasons.push(provinceName(req.province));

  if (cityKey(req.city) !== cityKey(listing.city)) blockers.push("Different city");
  else {
    reasons.push(listing.city);
    score += 25;
  }

  if (req.propertyType !== listing.propertyType) blockers.push("Property type differs");
  else {
    reasons.push(optionLabel(RES_TYPES, listing.propertyType));
    score += 20;
  }

  if ((BED_RANK[listing.bedrooms] ?? 0) < (BED_RANK[req.bedrooms] ?? 0)) {
    blockers.push("Fewer bedrooms than requested");
  } else {
    const bedroomReason = BEDROOMS.find((item) => item.id === listing.bedrooms)?.label;
    reasons.push(listing.bedrooms === "bachelor" ? "Bachelor layout" : `${bedroomReason} bedrooms`);
    score += 10;
  }

  if (!rentInBand(listing.monthlyRent, req.budget, RES_BUDGETS)) {
    blockers.push("Rent is outside the budget");
  } else {
    reasons.push(`${formatCAD(listing.monthlyRent)} is inside the budget`);
    score += 20;
  }

  const dates = dateVerdict(readyDay(listing), latestResidential(req));
  if (!dates.ok) blockers.push(dates.message);
  else {
    reasons.push(dates.message);
    score += 15;
  }

  if (termFits(req.rentalTerm, listing.rentalTerm)) {
    reasons.push(optionLabel(TERMS, listing.rentalTerm));
    score += 6;
  } else gaps.push("Rental term differs");

  if (req.furnished === "any" || req.furnished === listing.furnishing) {
    reasons.push(optionLabel(FURNISHED, listing.furnishing));
    score += 4;
  } else gaps.push("Furnishing does not match the preference");

  const conditionOrder = ["updates", "fair", "good", "excellent", "new"];
  const wanted = conditionOrder.indexOf(req.condition);
  const offered = conditionOrder.indexOf(listing.condition);
  if (wanted >= 0 && offered >= wanted) score += 4;
  else if (req.condition && listing.condition) gaps.push("Condition is below the preference");

  const have = new Set(listing.amenities);
  const hit = req.additional.filter((id) => have.has(id));
  const miss = req.additional.filter((id) => !have.has(id));
  if (hit.length) {
    reasons.push(hit.slice(0, 3).map((id) => optionLabel(RES_AMENITIES, id)).join(", "));
    score += hit.length * 2;
  }
  if (miss.length) {
    gaps.push(`Not listed: ${miss.slice(0, 3).map((id) => optionLabel(RES_AMENITIES, id)).join(", ")}`);
  }

  if (req.pets !== "none" && req.pets !== "negotiable" && !have.has("pets")) {
    gaps.push("Pet-friendly is not confirmed");
  }
  if ((req.laundry === "insuite" || req.laundry === "hookups") && !have.has("laundry")) {
    gaps.push("In-suite laundry is not listed");
  }
  if (req.garage === "required" && listing.parking !== "garage") {
    gaps.push("A garage is required but not offered");
  }
  if (req.strictGarageStorage && listing.parking !== "garage") {
    gaps.push("Strict garage storage is not met");
  }

  return finish(score, reasons, gaps, blockers, req, listing);
}

function assessCommercial(req: CommercialRequirement, listing: CommercialListing): MatchAssessment {
  const reasons: string[] = [];
  const gaps: string[] = [];
  const blockers: string[] = [];
  let score = 30;

  if (req.province !== listing.province) blockers.push("Different province");
  else reasons.push(provinceName(req.province));

  if (cityKey(req.city) !== cityKey(listing.city)) blockers.push("Different city");
  else {
    reasons.push(listing.city);
    score += 25;
  }

  if (req.commercialType !== listing.commercialType) blockers.push("Commercial category differs");
  else {
    reasons.push(optionLabel(COM_TYPES, listing.commercialType));
    score += 20;
  }

  const band = bandById(COM_AREAS, req.area);
  if (!band || !valueInBand(listing.areaSqft, band)) blockers.push("Floor area is outside the requested range");
  else {
    reasons.push(`${formatCount(listing.areaSqft)} sq ft`);
    score += 15;
  }

  if (!rentInBand(listing.monthlyRent, req.budget, COM_BUDGETS)) blockers.push("Rent is outside the budget");
  else {
    reasons.push(`${formatCAD(listing.monthlyRent)} is inside the budget`);
    score += 20;
  }

  const latest = req.moveInDate ? endOfDay(parseISODate(req.moveInDate) ?? startOfToday()) : null;
  const dates = dateVerdict(readyDay(listing), latest);
  if (!dates.ok) blockers.push(dates.message);
  else {
    reasons.push(dates.message);
    score += 12;
  }

  if (termFits(req.rentalTerm, listing.rentalTerm)) {
    reasons.push(optionLabel(TERMS, listing.rentalTerm));
    score += 6;
  } else gaps.push("Rental term differs");

  const have = new Set(listing.additional);
  const hit = req.additional.filter((id) => have.has(id));
  const miss = req.additional.filter((id) => !have.has(id));
  if (hit.length) {
    reasons.push(hit.slice(0, 3).map((id) => optionLabel(COM_EXTRAS, id)).join(", "));
    score += hit.length * 2;
  }
  if (miss.length) {
    gaps.push(`Not listed: ${miss.slice(0, 3).map((id) => optionLabel(COM_EXTRAS, id)).join(", ")}`);
  }

  return finish(score, reasons, gaps, blockers, req, listing);
}

function finish(
  score: number,
  reasons: string[],
  gaps: string[],
  blockers: string[],
  req: Requirement,
  listing: Listing,
): MatchAssessment {
  const reqStatus = statusFromExpiry(req.expiresAt);
  const listingStatus = statusFromExpiry(listing.expiresAt);
  const compatible = blockers.length === 0;
  const ok = compatible && reqStatus === "active" && listingStatus === "active";
  if (reqStatus === "expired" || listingStatus === "expired") {
    gaps.unshift("Expired records stay visible but are unavailable");
  }
  return {
    compatible,
    ok,
    score: ok ? score : compatible ? Math.max(score - 30, 1) : 0,
    reasons,
    gaps: [...blockers, ...gaps],
  };
}

export function assess(req: Requirement, listing: Listing): MatchAssessment {
  if (req.segment !== listing.segment) {
    return {
      compatible: false,
      ok: false,
      score: 0,
      reasons: [],
      gaps: ["Residential and commercial records are matched separately"],
    };
  }
  if (req.segment === "residential" && listing.segment === "residential") {
    return assessResidential(req, listing);
  }
  if (req.segment === "commercial" && listing.segment === "commercial") {
    return assessCommercial(req, listing);
  }
  return { compatible: false, ok: false, score: 0, reasons: [], gaps: ["Record kind does not match"] };
}

export interface MarketplaceCounts {
  matchingProperties: number;
  matchingTenants: number;
  availableProperties: number;
}

export function marketplaceCounts(listings: Listing[], requirements: Requirement[]): MarketplaceCounts {
  const activeListings = listings.filter((item) => statusFromExpiry(item.expiresAt) === "active");
  const activeRequirements = requirements.filter((item) => statusFromExpiry(item.expiresAt) === "active");
  const matchingProperties = activeListings.filter((listing) =>
    activeRequirements.some((req) => assess(req, listing).ok),
  ).length;
  const matchingTenants = activeRequirements.filter((req) =>
    activeListings.some((listing) => assess(req, listing).ok),
  ).length;
  return {
    matchingProperties,
    matchingTenants,
    availableProperties: activeListings.length,
  };
}

function numberOrNull(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function inDateWindow(day: Date | null, from: string, to: string): boolean {
  if (!from && !to) return true;
  if (!day) return false;
  const start = from ? parseISODate(from) : null;
  const end = to ? endOfDay(parseISODate(to) ?? day) : null;
  if (start && day < start) return false;
  if (end && day > end) return false;
  return true;
}

export function listingMatchesFilters(listing: Listing, filters: SearchFilters): boolean {
  const status = statusFromExpiry(listing.expiresAt);
  if (!filters.includeExpired && status !== "active") return false;
  if (filters.segment !== "all" && listing.segment !== filters.segment) return false;
  if (filters.province && listing.province !== filters.province) return false;
  if (filters.city && cityKey(listing.city) !== cityKey(filters.city)) return false;
  if (filters.condition && listing.condition !== filters.condition) return false;
  if (filters.rentalTerm && !termFits(listing.rentalTerm, filters.rentalTerm)) return false;
  if (filters.immediatelyOnly && !listing.immediately) return false;
  if (!inDateWindow(readyDay(listing), filters.availableFrom, filters.availableTo)) return false;

  const min = numberOrNull(filters.rentMin);
  const max = numberOrNull(filters.rentMax);
  if (min !== null && listing.monthlyRent < min) return false;
  if (max !== null && listing.monthlyRent > max) return false;

  if (listing.segment === "residential") {
    if (filters.propertyType && listing.propertyType !== filters.propertyType) return false;
    if (filters.commercialType) return false;
    if (filters.bedrooms && (BED_RANK[listing.bedrooms] ?? 0) < (BED_RANK[filters.bedrooms] ?? 0)) return false;
    if (filters.budget && !rentInBand(listing.monthlyRent, filters.budget, RES_BUDGETS)) return false;
    if (filters.area) {
      const band = bandById(RES_AREAS, filters.area);
      if (band && !valueInBand(listing.areaSqft, band)) return false;
    }
    const wanted = filters.additional.filter((id) => RES_AMENITY_IDS.has(id));
    if (wanted.some((id) => !listing.amenities.includes(id))) return false;
    return true;
  }

  if (filters.propertyType) return false;
  if (filters.bedrooms) return false;
  if (filters.commercialType && listing.commercialType !== filters.commercialType) return false;
  if (filters.budget && !rentInBand(listing.monthlyRent, filters.budget, COM_BUDGETS)) return false;
  if (filters.area) {
    const band = bandById(COM_AREAS, filters.area);
    if (band && !valueInBand(listing.areaSqft, band)) return false;
  }
  const wanted = filters.additional.filter((id) => COM_EXTRA_IDS.has(id));
  if (wanted.some((id) => !listing.additional.includes(id))) return false;
  return true;
}

export function requirementMatchesFilters(req: Requirement, filters: SearchFilters): boolean {
  const status = statusFromExpiry(req.expiresAt);
  if (!filters.includeExpired && status !== "active") return false;
  if (filters.segment !== "all" && req.segment !== filters.segment) return false;
  if (filters.province && req.province !== filters.province) return false;
  if (filters.city && cityKey(req.city) !== cityKey(filters.city)) return false;
  if (filters.condition && req.segment === "residential" && req.condition !== filters.condition) return false;
  if (filters.condition && req.segment === "commercial") return false;
  if (filters.rentalTerm && !termFits(req.rentalTerm, filters.rentalTerm)) return false;
  if (filters.immediatelyOnly && !(req.segment === "residential" && req.immediately)) return false;

  const min = numberOrNull(filters.rentMin);
  const max = numberOrNull(filters.rentMax);

  if (req.segment === "residential") {
    if (filters.propertyType && req.propertyType !== filters.propertyType) return false;
    if (filters.commercialType) return false;
    if (filters.bedrooms && (BED_RANK[req.bedrooms] ?? 0) < (BED_RANK[filters.bedrooms] ?? 0)) return false;
    if (filters.budget && req.budget !== filters.budget) return false;
    if (filters.area) return false;
    const band = bandById(RES_BUDGETS, req.budget);
    if (band && min !== null && band.max < min) return false;
    if (band && max !== null && band.min > max) return false;
    const move = req.immediately ? startOfToday() : parseISODate(req.useRange && req.moveInEnd ? req.moveInEnd : req.moveInDate);
    if ((filters.availableFrom || filters.availableTo) && !inDateWindow(move, filters.availableFrom, filters.availableTo)) {
      return false;
    }
    const wanted = filters.additional.filter((id) => RES_AMENITY_IDS.has(id));
    if (wanted.some((id) => !req.additional.includes(id))) return false;
    return true;
  }

  if (filters.propertyType || filters.bedrooms) return false;
  if (filters.commercialType && req.commercialType !== filters.commercialType) return false;
  if (filters.budget && req.budget !== filters.budget) return false;
  if (filters.area && req.area !== filters.area) return false;
  const band = bandById(COM_BUDGETS, req.budget);
  if (band && min !== null && band.max < min) return false;
  if (band && max !== null && band.min > max) return false;
  const move = req.moveInDate ? parseISODate(req.moveInDate) : null;
  if ((filters.availableFrom || filters.availableTo) && !inDateWindow(move, filters.availableFrom, filters.availableTo)) {
    return false;
  }
  const wanted = filters.additional.filter((id) => COM_EXTRA_IDS.has(id));
  if (wanted.some((id) => !req.additional.includes(id))) return false;
  return true;
}

export function contactMethodLabel(id: string): string {
  return optionLabel(CONTACT_METHODS, id);
}

export function conditionLabel(id: string): string {
  return optionLabel(CONDITIONS, id);
}

export function parkingLabel(id: string): string {
  return optionLabel(PARKING, id);
}
