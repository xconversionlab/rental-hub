import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useHub, u as statusFromExpiry } from "./router-BHHULtRV.mjs";
import { n as Shell } from "./shell-BTEIEBZE.mjs";
import { a as RequirementCard, b as marketplaceCounts, n as ListingCard, o as SampleBanner } from "./cards-DnE8PdiR.mjs";
import { i as PageHeader } from "./fields-CVpWSgfP.mjs";
import { n as buttonClasses } from "./button-Zdi7PcXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-B2ab443c.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const profile = useHub((state) => state.profile);
	const listings = useHub((state) => state.listings);
	const requirements = useHub((state) => state.requirements);
	const counts = marketplaceCounts(listings, requirements);
	const role = profile.role;
	const mineListings = listings.filter((item) => item.owner === "me");
	const mineRequirements = requirements.filter((item) => item.owner === "me");
	const expiring = [...mineListings, ...mineRequirements].filter((item) => statusFromExpiry(item.expiresAt) === "active");
	const previewListings = listings.filter((item) => statusFromExpiry(item.expiresAt) === "active").slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: role === "landlord" ? "Landlord desk" : role === "tenant" ? "Tenant desk" : "Desk",
			title: profile.displayName ? `Hello, ${profile.displayName}` : "Rental Hub",
			lede: "Residential and commercial rentals across Canada. Demonstration records are labelled Sample and are not real vacancies."
		}),
		!role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-6 rounded-2xl border border-line bg-card px-4 py-3 text-sm",
			children: [
				"Choose a role to post. You can still browse the sample marketplace.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/role",
					className: "font-medium text-navy underline",
					children: "Choose tenant or landlord"
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleBanner, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mb-6 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-navy px-4 py-4 text-on-navy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm text-paper/80",
						children: "Available properties"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-4xl tabular-nums",
						children: counts.availableProperties
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-line bg-card px-4 py-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm text-muted",
						children: "Total matching properties"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-4xl tabular-nums text-navy",
						children: counts.matchingProperties
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-line bg-card px-4 py-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm text-muted",
						children: "Total matching tenants"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-4xl tabular-nums text-navy",
						children: counts.matchingTenants
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex flex-wrap gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/segment",
					search: { intent: role === "landlord" ? "listing" : "requirement" },
					className: buttonClasses("primary"),
					children: role === "landlord" ? "List a property" : "Post a requirement"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/search",
					search: {
						segment: "all",
						view: "properties"
					},
					className: buttonClasses("secondary"),
					children: "Search the marketplace"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/matches",
					className: buttonClasses("secondary"),
					children: "View matches"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: role === "landlord" ? "Your listings" : "Your requirements"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: role === "landlord" ? "/listings" : "/requirements",
					className: "text-sm font-medium text-navy",
					children: "See all"
				})]
			}), role === "landlord" ? mineListings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: mineListings.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing: item }, item.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-3xl border border-dashed border-line bg-card px-4 py-8 text-sm text-muted",
				children: "You have no listings yet. Sample properties stay in Search until you publish your own."
			}) : mineRequirements.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: mineRequirements.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequirementCard, { requirement: item }, item.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-3xl border border-dashed border-line bg-card px-4 py-8 text-sm text-muted",
				children: [
					"You have no requirements yet. ",
					expiring.length ? "" : "",
					"Post one to see personal matches. Sample requirements are already matched in Matches."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-navy",
				children: "Available properties"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/search",
				search: {
					segment: "all",
					view: "properties"
				},
				className: "text-sm font-medium text-navy",
				children: "Filter"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: previewListings.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing: item }, item.id))
		})] })
	] });
}
//#endregion
export { Home as component };
