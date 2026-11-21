import {
  BEDROOMS,
  COM_AREAS,
  COM_BUDGETS,
  COM_TENANT_CATEGORIES,
  COM_TYPES,
  CONDITIONS,
  CONTACT_METHODS,
  CONTACT_TIMES,
  CREDIT_SCORES,
  FURNISHED,
  GARAGE,
  LAUNDRY,
  PARKING,
  PETS,
  RES_BUDGETS,
  RES_TENANT_CATEGORIES,
  RES_TYPES,
  TERMS,
  optionLabel,
  provinceName,
} from "@/domain/catalog";
import { formatCAD, formatLong } from "@/domain/format";
import { statusFromExpiry } from "@/domain/expiry";
import type { Listing, Requirement } from "@/domain/types";

export function listingTitle(listing: Listing): string {
  if (listing.segment === "commercial") return optionLabel(COM_TYPES, listing.commercialType);
  if (listing.propertyType === "bachelor" || listing.bedrooms === "bachelor") {
    return optionLabel(RES_TYPES, listing.propertyType);
  }
  return `${optionLabel(BEDROOMS, listing.bedrooms)}-bedroom ${optionLabel(RES_TYPES, listing.propertyType).toLowerCase()}`;
}

export function requirementTitle(requirement: Requirement): string {
  if (requirement.segment === "commercial") return optionLabel(COM_TYPES, requirement.commercialType);
  return optionLabel(RES_TYPES, requirement.propertyType);
}

export function placeLine(row: { city: string; province: string }): string {
  return `${row.city}, ${provinceName(row.province)}`;
}

export function moneyLine(listing: Listing): string {
  return `${formatCAD(listing.monthlyRent)}/mo`;
}

export function budgetLine(requirement: Requirement): string {
  const bands = requirement.segment === "residential" ? RES_BUDGETS : COM_BUDGETS;
  return optionLabel(bands, requirement.budget);
}

export function areaLine(listing: Listing): string {
  return `${listing.areaSqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} sq ft`;
}

export function requirementArea(requirement: Requirement): string {
  if (requirement.segment === "residential") return "Any area";
  return optionLabel(COM_AREAS, requirement.area);
}

export function statusLabel(expiresAt: string): "Active" | "Expired" {
  return statusFromExpiry(expiresAt) === "active" ? "Active" : "Expired";
}

export function availabilityLine(row: { immediately: boolean; availableDate?: string; moveInDate?: string }): string {
  if (row.immediately) return "Available now";
  if (row.availableDate) return `Available ${formatLong(row.availableDate)}`;
  if (row.moveInDate) return `Move-in ${formatLong(row.moveInDate)}`;
  return "Date not set";
}

export function termLabel(id: string): string {
  return optionLabel(TERMS, id);
}

export function conditionLabel(id: string): string {
  return optionLabel(CONDITIONS, id);
}

export function parkingLabel(id: string): string {
  return optionLabel(PARKING, id);
}

export function contactLabel(method: string, time: string): string {
  return `${optionLabel(CONTACT_METHODS, method)} · ${optionLabel(CONTACT_TIMES, time)}`;
}

export function categoryLabel(requirement: Requirement): string {
  return requirement.segment === "residential"
    ? optionLabel(RES_TENANT_CATEGORIES, requirement.tenantCategory)
    : optionLabel(COM_TENANT_CATEGORIES, requirement.tenantCategory);
}

export function furnishedLabel(id: string): string {
  return optionLabel(FURNISHED, id);
}

export function petsLabel(id: string): string {
  return optionLabel(PETS, id);
}

export function laundryLabel(id: string): string {
  return optionLabel(LAUNDRY, id);
}

export function garageLabel(id: string): string {
  return optionLabel(GARAGE, id);
}

export function creditLabel(id: string): string {
  return optionLabel(CREDIT_SCORES, id);
}

export type PlateKind = "condo" | "house" | "town" | "suite" | "office" | "retail" | "industrial";

export function plateFor(listing: Listing): PlateKind {
  if (listing.segment === "commercial") {
    if (listing.commercialType === "retail" || listing.commercialType === "restaurant") return "retail";
    if (listing.commercialType === "industrial" || listing.commercialType === "storage") return "industrial";
    return "office";
  }
  if (listing.propertyType === "detached" || listing.propertyType === "semi") return "house";
  if (listing.propertyType === "townhouse" || listing.propertyType === "duplex") return "town";
  if (listing.propertyType === "basement" || listing.propertyType === "room") return "suite";
  return "condo";
}
