import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Car, h as Bath, m as BedDouble, s as MapPin } from "../_libs/lucide-react.mjs";
import { $ as optionLabel, A as CONTACT_TIMES, B as PETS, C as COM_BUDGETS, D as COM_TYPES, E as COM_TENANT_CATEGORIES, G as RES_AMENITY_IDS, I as GARAGE, J as RES_TENANT_CATEGORIES, K as RES_AREAS, O as CONDITIONS, P as FURNISHED, Q as bandById, R as LAUNDRY, S as COM_AREAS, T as COM_EXTRA_IDS, W as RES_AMENITIES, X as TERMS, Y as RES_TYPES, Z as WASHROOMS, _ as plusDays, b as BED_RANK, d as cityKey, et as provinceName, f as endOfDay, g as parseISODate, j as CREDIT_SCORES, k as CONTACT_METHODS, m as formatLong, nt as valueInBand, p as formatCAD, q as RES_BUDGETS, tt as rentInBand, u as statusFromExpiry, v as startOfToday, w as COM_EXTRAS, y as BEDROOMS, z as PARKING } from "./router-BHHULtRV.mjs";
import { r as cn } from "./shell-BTEIEBZE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cards-DnE8PdiR.js
var import_jsx_runtime = require_jsx_runtime();
function formatCount(value) {
	return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function live(row) {
	const status = statusFromExpiry(row.expiresAt);
	return row.status === status ? row : {
		...row,
		status
	};
}
function liveListing(row) {
	return live(row);
}
function liveRequirement(row) {
	return live(row);
}
function termFits(a, b) {
	return a === b || a === "flex" || b === "flex";
}
function readyDay(listing) {
	if (listing.immediately) return startOfToday();
	return listing.availableDate ? parseISODate(listing.availableDate) : null;
}
function latestResidential(req) {
	if (req.immediately) return endOfDay(startOfToday());
	const raw = req.useRange && req.moveInEnd ? req.moveInEnd : req.moveInDate;
	const parsed = raw ? parseISODate(raw) : null;
	if (!parsed) return null;
	const shifted = req.dateFlexibility ? plusDays(parsed, 15) : parsed;
	return endOfDay(shifted);
}
function dateVerdict(ready, latest) {
	if (!ready) return {
		ok: false,
		message: "No availability date is set"
	};
	if (!latest) return {
		ok: true,
		message: "Move-in date is open"
	};
	if (ready.getTime() <= latest.getTime()) return {
		ok: true,
		message: "Available in time for the move-in"
	};
	return {
		ok: false,
		message: "Available after the latest move-in date"
	};
}
function assessResidential(req, listing) {
	const reasons = [];
	const gaps = [];
	const blockers = [];
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
	if ((BED_RANK[listing.bedrooms] ?? 0) < (BED_RANK[req.bedrooms] ?? 0)) blockers.push("Fewer bedrooms than requested");
	else {
		const bedroomReason = BEDROOMS.find((item) => item.id === listing.bedrooms)?.label;
		reasons.push(listing.bedrooms === "bachelor" ? "Bachelor layout" : `${bedroomReason} bedrooms`);
		score += 10;
	}
	if (!rentInBand(listing.monthlyRent, req.budget, RES_BUDGETS)) blockers.push("Rent is outside the budget");
	else {
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
	const conditionOrder = [
		"updates",
		"fair",
		"good",
		"excellent",
		"new"
	];
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
	if (miss.length) gaps.push(`Not listed: ${miss.slice(0, 3).map((id) => optionLabel(RES_AMENITIES, id)).join(", ")}`);
	if (req.pets !== "none" && req.pets !== "negotiable" && !have.has("pets")) gaps.push("Pet-friendly is not confirmed");
	if ((req.laundry === "insuite" || req.laundry === "hookups") && !have.has("laundry")) gaps.push("In-suite laundry is not listed");
	if (req.garage === "required" && listing.parking !== "garage") gaps.push("A garage is required but not offered");
	if (req.strictGarageStorage && listing.parking !== "garage") gaps.push("Strict garage storage is not met");
	return finish(score, reasons, gaps, blockers, req, listing);
}
function assessCommercial(req, listing) {
	const reasons = [];
	const gaps = [];
	const blockers = [];
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
	if (miss.length) gaps.push(`Not listed: ${miss.slice(0, 3).map((id) => optionLabel(COM_EXTRAS, id)).join(", ")}`);
	return finish(score, reasons, gaps, blockers, req, listing);
}
function finish(score, reasons, gaps, blockers, req, listing) {
	const reqStatus = statusFromExpiry(req.expiresAt);
	const listingStatus = statusFromExpiry(listing.expiresAt);
	const compatible = blockers.length === 0;
	const ok = compatible && reqStatus === "active" && listingStatus === "active";
	if (reqStatus === "expired" || listingStatus === "expired") gaps.unshift("Expired records stay visible but are unavailable");
	return {
		compatible,
		ok,
		score: ok ? score : compatible ? Math.max(score - 30, 1) : 0,
		reasons,
		gaps: [...blockers, ...gaps]
	};
}
function assess(req, listing) {
	if (req.segment !== listing.segment) return {
		compatible: false,
		ok: false,
		score: 0,
		reasons: [],
		gaps: ["Residential and commercial records are matched separately"]
	};
	if (req.segment === "residential" && listing.segment === "residential") return assessResidential(req, listing);
	if (req.segment === "commercial" && listing.segment === "commercial") return assessCommercial(req, listing);
	return {
		compatible: false,
		ok: false,
		score: 0,
		reasons: [],
		gaps: ["Record kind does not match"]
	};
}
function marketplaceCounts(listings, requirements) {
	const activeListings = listings.filter((item) => statusFromExpiry(item.expiresAt) === "active");
	const activeRequirements = requirements.filter((item) => statusFromExpiry(item.expiresAt) === "active");
	return {
		matchingProperties: activeListings.filter((listing) => activeRequirements.some((req) => assess(req, listing).ok)).length,
		matchingTenants: activeRequirements.filter((req) => activeListings.some((listing) => assess(req, listing).ok)).length,
		availableProperties: activeListings.length
	};
}
function numberOrNull(value) {
	if (!value.trim()) return null;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : null;
}
function inDateWindow(day, from, to) {
	if (!from && !to) return true;
	if (!day) return false;
	const start = from ? parseISODate(from) : null;
	const end = to ? endOfDay(parseISODate(to) ?? day) : null;
	if (start && day < start) return false;
	if (end && day > end) return false;
	return true;
}
function listingMatchesFilters(listing, filters) {
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
		if (filters.additional.filter((id) => RES_AMENITY_IDS.has(id)).some((id) => !listing.amenities.includes(id))) return false;
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
	if (filters.additional.filter((id) => COM_EXTRA_IDS.has(id)).some((id) => !listing.additional.includes(id))) return false;
	return true;
}
function requirementMatchesFilters(req, filters) {
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
		if ((filters.availableFrom || filters.availableTo) && !inDateWindow(move, filters.availableFrom, filters.availableTo)) return false;
		if (filters.additional.filter((id) => RES_AMENITY_IDS.has(id)).some((id) => !req.additional.includes(id))) return false;
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
	if ((filters.availableFrom || filters.availableTo) && !inDateWindow(move, filters.availableFrom, filters.availableTo)) return false;
	if (filters.additional.filter((id) => COM_EXTRA_IDS.has(id)).some((id) => !req.additional.includes(id))) return false;
	return true;
}
function listingTitle(listing) {
	if (listing.segment === "commercial") return optionLabel(COM_TYPES, listing.commercialType);
	if (listing.propertyType === "bachelor" || listing.bedrooms === "bachelor") return optionLabel(RES_TYPES, listing.propertyType);
	return `${optionLabel(BEDROOMS, listing.bedrooms)}-bedroom ${optionLabel(RES_TYPES, listing.propertyType).toLowerCase()}`;
}
function requirementTitle(requirement) {
	if (requirement.segment === "commercial") return optionLabel(COM_TYPES, requirement.commercialType);
	return optionLabel(RES_TYPES, requirement.propertyType);
}
function placeLine(row) {
	return `${row.city}, ${provinceName(row.province)}`;
}
function moneyLine(listing) {
	return `${formatCAD(listing.monthlyRent)}/mo`;
}
function budgetLine(requirement) {
	const bands = requirement.segment === "residential" ? RES_BUDGETS : COM_BUDGETS;
	return optionLabel(bands, requirement.budget);
}
function areaLine(listing) {
	return `${listing.areaSqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} sq ft`;
}
function requirementArea(requirement) {
	if (requirement.segment === "residential") return "Any area";
	return optionLabel(COM_AREAS, requirement.area);
}
function statusLabel(expiresAt) {
	return statusFromExpiry(expiresAt) === "active" ? "Active" : "Expired";
}
function availabilityLine(row) {
	if (row.immediately) return "Available now";
	if (row.availableDate) return `Available ${formatLong(row.availableDate)}`;
	if (row.moveInDate) return `Move-in ${formatLong(row.moveInDate)}`;
	return "Date not set";
}
function termLabel(id) {
	return optionLabel(TERMS, id);
}
function conditionLabel(id) {
	return optionLabel(CONDITIONS, id);
}
function parkingLabel(id) {
	return optionLabel(PARKING, id);
}
function contactLabel(method, time) {
	return `${optionLabel(CONTACT_METHODS, method)} · ${optionLabel(CONTACT_TIMES, time)}`;
}
function categoryLabel(requirement) {
	return requirement.segment === "residential" ? optionLabel(RES_TENANT_CATEGORIES, requirement.tenantCategory) : optionLabel(COM_TENANT_CATEGORIES, requirement.tenantCategory);
}
function furnishedLabel(id) {
	return optionLabel(FURNISHED, id);
}
function petsLabel(id) {
	return optionLabel(PETS, id);
}
function laundryLabel(id) {
	return optionLabel(LAUNDRY, id);
}
function garageLabel(id) {
	return optionLabel(GARAGE, id);
}
function creditLabel(id) {
	return optionLabel(CREDIT_SCORES, id);
}
function plateFor(listing) {
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
function PropertyPlate({ kind, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[3/2] overflow-hidden bg-navy text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 360 240",
			className: "absolute inset-0 h-full w-full",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "360",
					height: "240",
					fill: "currentColor",
					className: "text-navy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "0",
					y: "168",
					width: "360",
					height: "72",
					className: "text-navy-deep",
					fill: "currentColor"
				}),
				kind === "condo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Condo, {}) : null,
				kind === "house" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {}) : null,
				kind === "town" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Town, {}) : null,
				kind === "suite" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Suite, {}) : null,
				kind === "office" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Office, {}) : null,
				kind === "retail" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Retail, {}) : null,
				kind === "industrial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Industrial, {}) : null
			]
		}), label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "absolute right-3 bottom-3 left-3 text-xs tracking-widest text-paper/80 uppercase",
			children: label
		}) : null]
	});
}
function windowGrid(x, y, cols, rows, w = 10, h = 14, gap = 6) {
	const cells = [];
	for (let row = 0; row < rows; row += 1) for (let col = 0; col < cols; col += 1) cells.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: x + col * (w + gap),
		y: y + row * (h + gap),
		width: w,
		height: h,
		fill: "currentColor",
		className: "text-brass-soft",
		opacity: .85
	}, `${x}-${y}-${row}-${col}`));
	return cells;
}
function Condo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "78",
			y: "46",
			width: "70",
			height: "150",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.12"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "158",
			y: "24",
			width: "86",
			height: "172",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.18"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "254",
			y: "70",
			width: "54",
			height: "126",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.1"
		}),
		windowGrid(172, 40, 3, 6),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "188",
			y: "168",
			width: "26",
			height: "28",
			fill: "currentColor",
			className: "text-brass"
		})
	] });
}
function House() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "70,150 180,58 290,150",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.16"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "104",
			y: "148",
			width: "152",
			height: "72",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.14"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "166",
			y: "176",
			width: "28",
			height: "44",
			fill: "currentColor",
			className: "text-brass"
		}),
		windowGrid(118, 164, 1, 1, 22, 22, 0),
		windowGrid(214, 164, 1, 1, 22, 22, 0),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "286",
			cy: "150",
			r: "22",
			fill: "currentColor",
			className: "text-brass",
			opacity: "0.8"
		})
	] });
}
function Town() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: [
		0,
		1,
		2
	].map((index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: `${48 + index * 96},132 ${96 + index * 96},78 ${144 + index * 96},132`,
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.16"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: 58 + index * 96,
			y: 132,
			width: 76,
			height: 72,
			fill: "currentColor",
			className: "text-paper",
			opacity: .1 + index * .04
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: 84 + index * 96,
			y: 168,
			width: 22,
			height: 36,
			fill: "currentColor",
			className: "text-brass"
		})
	] }, index)) });
}
function Suite() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "70",
			y: "54",
			width: "220",
			height: "150",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.08"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "70",
			y: "132",
			width: "220",
			height: "72",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.16"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "92",
			y: "150",
			width: "86",
			height: "36",
			fill: "currentColor",
			className: "text-brass-soft",
			opacity: "0.9"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "196",
			y: "158",
			width: "64",
			height: "28",
			fill: "currentColor",
			className: "text-brass"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "70",
			y1: "132",
			x2: "290",
			y2: "132",
			stroke: "currentColor",
			className: "text-brass",
			strokeWidth: "2"
		})
	] });
}
function Office() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "48",
			y: "48",
			width: "264",
			height: "140",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.12"
		}),
		[
			0,
			1,
			2,
			3
		].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "64",
			y: 64 + row * 28,
			width: "232",
			height: "10",
			fill: "currentColor",
			className: "text-brass-soft",
			opacity: "0.75"
		}, row)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "168",
			y: "156",
			width: "40",
			height: "32",
			fill: "currentColor",
			className: "text-brass"
		})
	] });
}
function Retail() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "54",
			y: "78",
			width: "252",
			height: "22",
			fill: "currentColor",
			className: "text-brass"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "64",
			y: "110",
			width: "232",
			height: "78",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.14"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "154",
			y: "124",
			width: "52",
			height: "64",
			fill: "currentColor",
			className: "text-brass-soft"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "82",
			y: "124",
			width: "52",
			height: "40",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "226",
			y: "124",
			width: "52",
			height: "40",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.2"
		})
	] });
}
function Industrial() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "36,168 120,96 330,96 330,168",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.12"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "36",
			y: "168",
			width: "294",
			height: "28",
			fill: "currentColor",
			className: "text-paper",
			opacity: "0.08"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "70",
			y: "124",
			width: "78",
			height: "72",
			fill: "currentColor",
			className: "text-brass"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "176",
			y: "112",
			width: "120",
			height: "16",
			fill: "currentColor",
			className: "text-brass-soft",
			opacity: "0.8"
		})
	] });
}
function Pill({ children, tone = "navy" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex min-h-6 items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tone === "navy" && "bg-navy text-on-navy", tone === "brass" && "bg-brass-soft text-brass", tone === "ok" && "bg-ok-soft text-ok", tone === "danger" && "bg-danger-soft text-danger", tone === "paper" && "bg-paper text-navy"),
		children
	});
}
function SampleBanner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "rounded-2xl border border-line bg-brass-soft px-4 py-3 text-sm text-pretty text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: "Demonstration data."
		}), " Sample listings and requirements are fictional. They are not homes or commercial spaces you can rent or lease."]
	});
}
function ListingCard({ listing }) {
	const row = liveListing(listing);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/listings/$id",
		params: { id: row.id },
		className: "flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-card transition-transform duration-200 hover:-translate-y-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [row.photos[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: row.photos[0],
				alt: "",
				className: "aspect-[3/2] w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyPlate, { kind: plateFor(row) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-3 left-3 flex flex-wrap gap-2",
				children: [row.sample ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					tone: "brass",
					children: "Sample"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					tone: row.status === "active" ? "ok" : "danger",
					children: row.status === "active" ? "Available" : "Unavailable"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl text-balance text-navy",
						children: listingTitle(row)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shrink-0 text-sm font-semibold tabular-nums text-brass",
						children: moneyLine(row)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-1.5 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), placeLine(row)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-auto flex flex-wrap gap-3 text-xs text-muted",
					children: [
						row.segment === "residential" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BedDouble, {
								className: "size-3.5",
								"aria-hidden": "true"
							}), optionLabel(BEDROOMS, row.bedrooms)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bath, {
								className: "size-3.5",
								"aria-hidden": "true"
							}), optionLabel(WASHROOMS, row.washrooms)]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: areaLine(row) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, {
								className: "size-3.5",
								"aria-hidden": "true"
							}), optionLabel(PARKING, row.parking)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: availabilityLine(row) })
					]
				})
			]
		})]
	});
}
function RequirementCard({ requirement }) {
	const row = liveRequirement(requirement);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/requirements/$id",
		params: { id: row.id },
		className: "flex h-full flex-col gap-3 rounded-3xl border border-line bg-card p-4 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					row.sample ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						tone: "brass",
						children: "Sample"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						tone: "paper",
						children: "Yours"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						tone: row.status === "active" ? "ok" : "danger",
						children: statusLabel(row.expiresAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: row.segment === "residential" ? "Residential" : "Commercial" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl text-balance text-navy",
				children: requirementTitle(row)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: placeLine(row)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tabular-nums text-brass",
				children: budgetLine(row)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-auto space-y-1 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: categoryLabel(row) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: row.segment === "commercial" ? requirementArea(row) : `${optionLabel(BEDROOMS, row.bedrooms)} bedroom` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						termLabel(row.rentalTerm),
						" · ",
						row.segment === "residential" && row.immediately ? "Move-in now" : `Move-in ${row.moveInDate ? formatLong(row.moveInDate) : "open"}`
					] })
				]
			})
		]
	});
}
function Fact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-paper px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm font-medium text-ink",
			children: value || "—"
		})]
	});
}
//#endregion
export { placeLine as C, requirementTitle as D, requirementMatchesFilters as E, statusLabel as O, petsLabel as S, requirementArea as T, laundryLabel as _, RequirementCard as a, marketplaceCounts as b, assess as c, categoryLabel as d, conditionLabel as f, garageLabel as g, furnishedLabel as h, PropertyPlate as i, termLabel as k, availabilityLine as l, creditLabel as m, ListingCard as n, SampleBanner as o, contactLabel as p, Pill as r, areaLine as s, Fact as t, budgetLine as u, listingMatchesFilters as v, plateFor as w, parkingLabel as x, listingTitle as y };
