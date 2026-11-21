import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useHub, p as formatCAD } from "./router-BHHULtRV.mjs";
import { n as Shell } from "./shell-BTEIEBZE.mjs";
import { C as placeLine, D as requirementTitle, b as marketplaceCounts, c as assess, o as SampleBanner, y as listingTitle } from "./cards-DnE8PdiR.mjs";
import { i as PageHeader } from "./fields-CVpWSgfP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matches-B7fTcT3V.js
var import_jsx_runtime = require_jsx_runtime();
function MatchesPage() {
	const listings = useHub((state) => state.listings);
	const requirements = useHub((state) => state.requirements);
	const role = useHub((state) => state.profile.role);
	const counts = marketplaceCounts(listings, requirements);
	const pairs = requirements.flatMap((requirement) => listings.map((listing) => ({
		requirement,
		listing,
		match: assess(requirement, listing)
	})).filter((pair) => pair.match.compatible).sort((a, b) => b.match.score - a.match.score));
	const available = pairs.filter((pair) => pair.match.ok);
	const expired = pairs.filter((pair) => !pair.match.ok);
	const mine = available.filter((pair) => role === "landlord" ? pair.listing.owner === "me" : pair.requirement.owner === "me");
	const demo = available.filter((pair) => pair.requirement.sample && pair.listing.sample);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Matches",
			title: "What lines up",
			lede: "A match needs the same kind of rental, province, city, type, budget, timing, and — for homes — enough bedrooms. Expired records are unavailable."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
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
						className: "font-display text-4xl tabular-nums",
						children: counts.availableProperties
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-line bg-card px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm text-muted",
						children: "Total matching properties"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-display text-4xl tabular-nums text-navy",
						children: counts.matchingProperties
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-line bg-card px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm text-muted",
						children: "Total matching tenants"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-display text-4xl tabular-nums text-navy",
						children: counts.matchingTenants
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PairSection, {
			title: role === "landlord" ? "Matches for your listings" : "Matches for your requirements",
			empty: role ? "Nothing of yours matches yet. Post a requirement or listing, or review the demonstration pairs below." : "Choose a role, then post. Demonstration pairs are below.",
			pairs: mine
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PairSection, {
			title: "Demonstration matches",
			empty: "No sample pairs are available.",
			pairs: demo
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-2xl text-navy",
					children: "Expired and unavailable"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: "These pairs still fit the rules, but at least one record is past its 60-day life. They are not offered. A future backend can delete expired marketplace records. Your profile is not part of that deletion."
				}),
				expired.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: expired.slice(0, 4).map((pair) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-line bg-card px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium text-ink",
							children: [
								requirementTitle(pair.requirement),
								" in ",
								pair.requirement.city,
								" · ",
								listingTitle(pair.listing)
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-danger",
							children: "Unavailable"
						})]
					}, `${pair.requirement.id}-${pair.listing.id}`))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No expired pairs in the current records."
				})
			]
		})
	] });
}
function PairSection({ title, empty, pairs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-2xl text-navy",
			children: title
		}), pairs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: pairs.map((pair) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-3xl border border-line bg-card p-4 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/requirements/$id",
							params: { id: pair.requirement.id },
							className: "rounded-2xl bg-paper px-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-brass uppercase",
									children: "Requirement"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl text-navy",
									children: requirementTitle(pair.requirement)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: placeLine(pair.requirement)
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/listings/$id",
							params: { id: pair.listing.id },
							className: "rounded-2xl bg-paper px-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-brass uppercase",
									children: "Property"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl text-navy",
									children: listingTitle(pair.listing)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										placeLine(pair.listing),
										" · ",
										formatCAD(pair.listing.monthlyRent),
										"/mo"
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-wrap gap-2",
						children: pair.match.reasons.slice(0, 4).map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-full bg-ok-soft px-2.5 py-1 text-xs text-ok",
							children: reason
						}, reason))
					}),
					pair.match.gaps.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: ["Check: ", pair.match.gaps.slice(0, 2).join(" · ")]
					}) : null
				]
			}, `${pair.requirement.id}-${pair.listing.id}`))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-3xl border border-dashed border-line px-4 py-6 text-sm text-muted",
			children: empty
		})]
	});
}
//#endregion
export { MatchesPage as component };
