import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as COM_BUDGETS, D as COM_TYPES, K as RES_AREAS, O as CONDITIONS, S as COM_AREAS, U as PROVINCES, W as RES_AMENITIES, X as TERMS, Y as RES_TYPES, c as useHub, q as RES_BUDGETS, s as Route$8, u as statusFromExpiry, w as COM_EXTRAS, x as CITIES, y as BEDROOMS } from "./router-BHHULtRV.mjs";
import { n as Shell } from "./shell-BTEIEBZE.mjs";
import { E as requirementMatchesFilters, a as RequirementCard, n as ListingCard, o as SampleBanner, v as listingMatchesFilters } from "./cards-DnE8PdiR.mjs";
import { i as PageHeader, l as TextInput, n as Field, r as MultiCheck, s as SelectInput, t as ChipSelect, u as ToggleRow } from "./fields-CVpWSgfP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-DDTksxkw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_FILTERS = {
	segment: "all",
	province: "",
	city: "",
	propertyType: "",
	commercialType: "",
	condition: "",
	budget: "",
	rentMin: "",
	rentMax: "",
	area: "",
	rentalTerm: "",
	bedrooms: "",
	availableFrom: "",
	availableTo: "",
	immediatelyOnly: false,
	additional: [],
	includeExpired: false
};
function SearchPage() {
	const incoming = Route$8.useSearch();
	const listings = useHub((state) => state.listings);
	const requirements = useHub((state) => state.requirements);
	const [view, setView] = (0, import_react.useState)(incoming.view === "tenants" ? "tenants" : "properties");
	const [filters, setFilters] = (0, import_react.useState)({
		...EMPTY_FILTERS,
		segment: incoming.segment === "residential" || incoming.segment === "commercial" ? incoming.segment : "all"
	});
	const [more, setMore] = (0, import_react.useState)(false);
	const cities = filters.province ? CITIES[filters.province] ?? [] : [];
	const matchedListings = (0, import_react.useMemo)(() => listings.filter((item) => listingMatchesFilters(item, filters)), [listings, filters]);
	const matchedRequirements = (0, import_react.useMemo)(() => requirements.filter((item) => requirementMatchesFilters(item, filters)), [requirements, filters]);
	const propertyPool = (0, import_react.useMemo)(() => listings.filter((item) => listingMatchesFilters(item, {
		...filters,
		includeExpired: true
	})), [listings, filters]);
	const tenantPool = (0, import_react.useMemo)(() => requirements.filter((item) => requirementMatchesFilters(item, {
		...filters,
		includeExpired: true
	})), [requirements, filters]);
	const availableCount = propertyPool.filter((item) => statusFromExpiry(item.expiresAt) === "active").length;
	function patch(partial) {
		setFilters((current) => ({
			...current,
			...partial
		}));
	}
	const budgetOptions = filters.segment === "commercial" ? COM_BUDGETS : RES_BUDGETS;
	const areaOptions = filters.segment === "commercial" ? COM_AREAS : RES_AREAS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Search",
			title: "Find properties and tenants",
			lede: "Filters run on the records stored on this device, including labelled sample data."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleBanner, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total matching properties",
					value: propertyPool.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total matching tenants",
					value: tenantPool.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Available properties",
					value: availableCount
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: tabClass(view === "properties"),
				onClick: () => setView("properties"),
				children: "Properties"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: tabClass(view === "tenants"),
				onClick: () => setView("tenants"),
				children: "Tenant requirements"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 space-y-4 rounded-3xl border border-line bg-card p-4 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipSelect, {
					label: "Kind",
					value: filters.segment,
					onChange: (segment) => patch({
						segment,
						propertyType: "",
						commercialType: "",
						budget: "",
						area: "",
						additional: []
					}),
					options: [
						{
							id: "all",
							label: "All"
						},
						{
							id: "residential",
							label: "Residential"
						},
						{
							id: "commercial",
							label: "Commercial"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Province or territory",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: filters.province,
							onChange: (event) => patch({
								province: event.target.value,
								city: ""
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "All provinces"
							}), PROVINCES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "City",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: filters.city,
							onChange: (event) => patch({ city: event.target.value }),
							disabled: !filters.province,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "All cities"
							}), cities.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: city,
								children: city
							}, city))]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-sm font-medium text-navy",
					onClick: () => setMore((value) => !value),
					children: more ? "Hide extra filters" : "Budget, type, area, dates, and requirements"
				}),
				more ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						filters.segment !== "commercial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Residential property type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: filters.propertyType,
								onChange: (event) => patch({ propertyType: event.target.value }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Any"
								}), RES_TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item.id,
									children: item.label
								}, item.id))]
							})
						}) : null,
						filters.segment !== "residential" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Commercial category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: filters.commercialType,
								onChange: (event) => patch({ commercialType: event.target.value }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Any"
								}), COM_TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item.id,
									children: item.label
								}, item.id))]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Budget band",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
									value: filters.budget,
									onChange: (event) => patch({ budget: event.target.value }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Any budget"
									}), budgetOptions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.id,
										children: item.label
									}, item.id))]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Area",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
									value: filters.area,
									onChange: (event) => patch({ area: event.target.value }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Any area"
									}), areaOptions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.id,
										children: item.label
									}, item.id))]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Minimum rent (CAD)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									inputMode: "numeric",
									value: filters.rentMin,
									onChange: (event) => patch({ rentMin: event.target.value })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Maximum rent (CAD)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									inputMode: "numeric",
									value: filters.rentMax,
									onChange: (event) => patch({ rentMax: event.target.value })
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Rental term",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: filters.rentalTerm,
								onChange: (event) => patch({ rentalTerm: event.target.value }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Any term"
								}), TERMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item.id,
									children: item.label
								}, item.id))]
							})
						}),
						filters.segment !== "commercial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Bedrooms (at least)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: filters.bedrooms,
								onChange: (event) => patch({ bedrooms: event.target.value }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Any"
								}), BEDROOMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item.id,
									children: item.label
								}, item.id))]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Condition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: filters.condition,
								onChange: (event) => patch({ condition: event.target.value }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Any condition"
								}), CONDITIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item.id,
									children: item.label
								}, item.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Available from",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "date",
									value: filters.availableFrom,
									onChange: (event) => patch({ availableFrom: event.target.value })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Available to",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "date",
									value: filters.availableTo,
									onChange: (event) => patch({ availableTo: event.target.value })
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Immediately available only",
							checked: filters.immediatelyOnly,
							onChange: (immediatelyOnly) => patch({ immediatelyOnly })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Include expired records",
							checked: filters.includeExpired,
							onChange: (includeExpired) => patch({ includeExpired }),
							hint: "Expired records stay visible as unavailable. They are not deleted."
						}),
						filters.segment !== "commercial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiCheck, {
							label: "Additional residential requirements",
							values: filters.additional.filter((id) => RES_AMENITIES.some((item) => item.id === id)),
							onChange: (residential) => patch({ additional: [...residential, ...filters.additional.filter((id) => COM_EXTRAS.some((item) => item.id === id))] }),
							options: RES_AMENITIES
						}) : null,
						filters.segment !== "residential" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiCheck, {
							label: "Additional commercial requirements",
							values: filters.additional.filter((id) => COM_EXTRAS.some((item) => item.id === id)),
							onChange: (commercial) => patch({ additional: [...filters.additional.filter((id) => RES_AMENITIES.some((item) => item.id === id)), ...commercial] }),
							options: COM_EXTRAS
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm font-medium text-navy",
							onClick: () => setFilters({ ...EMPTY_FILTERS }),
							children: "Clear filters"
						})
					]
				}) : null
			]
		}),
		view === "properties" ? matchedListings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: matchedListings.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing: item }, item.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-3xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted",
			children: "No properties match these filters."
		}) : matchedRequirements.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: matchedRequirements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequirementCard, { requirement: item }, item.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-3xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted",
			children: "No tenant requirements match these filters."
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-card px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl tabular-nums text-navy",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		})]
	});
}
function tabClass(active) {
	return active ? "min-h-11 rounded-full bg-navy px-4 text-sm font-medium text-on-navy" : "min-h-11 rounded-full border border-line bg-card px-4 text-sm font-medium text-navy";
}
//#endregion
export { SearchPage as component };
