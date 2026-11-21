import { C as require_jsx_runtime, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { $ as optionLabel, N as EMPLOYMENT_LETTERS, W as RES_AMENITIES, c as useHub, m as formatLong, r as Route$1, u as statusFromExpiry, w as COM_EXTRAS } from "./_ssr/router-BHHULtRV.mjs";
import { n as Shell } from "./_ssr/shell-BTEIEBZE.mjs";
import { C as placeLine, D as requirementTitle, O as statusLabel, S as petsLabel, T as requirementArea, _ as laundryLabel, c as assess, d as categoryLabel, f as conditionLabel, g as garageLabel, h as furnishedLabel, k as termLabel, m as creditLabel, o as SampleBanner, p as contactLabel, r as Pill, t as Fact, u as budgetLine, x as parkingLabel } from "./_ssr/cards-DnE8PdiR.mjs";
import { i as PageHeader } from "./_ssr/fields-CVpWSgfP.mjs";
import { t as OwnerActions } from "./_ssr/owner-actions-BH3lYcgz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-C0W0rkwH.js
var import_jsx_runtime = require_jsx_runtime();
function RequirementDetail() {
	const { id } = Route$1.useParams();
	const requirement = useHub((state) => state.requirements.find((item) => item.id === id));
	const listings = useHub((state) => state.listings);
	if (!requirement) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Requirement not found",
		lede: "It may have been removed from this device."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/requirements",
		className: "text-sm font-medium text-navy",
		children: "Back to requirements"
	})] });
	const status = statusFromExpiry(requirement.expiresAt);
	const matches = listings.map((listing) => ({
		listing,
		match: assess(requirement, listing)
	})).filter((item) => item.match.ok).sort((a, b) => b.match.score - a.match.score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: requirement.segment === "commercial" ? "Commercial requirement" : "Residential requirement",
			title: requirementTitle(requirement),
			lede: placeLine(requirement)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [requirement.sample ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				tone: "brass",
				children: "Sample"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: "Yours" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				tone: status === "active" ? "ok" : "danger",
				children: status === "active" ? "Active" : "Expired · unavailable"
			})]
		}),
		requirement.sample ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleBanner, {})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-sm text-muted",
			children: [
				"Created ",
				formatLong(requirement.createdAt),
				" · Expires ",
				formatLong(requirement.expiresAt),
				" · ",
				statusLabel(requirement.expiresAt)
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnerActions, {
				kind: "requirement",
				id: requirement.id,
				mine: requirement.owner === "me",
				segment: requirement.segment
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Budget",
					value: budgetLine(requirement)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Term",
					value: termLabel(requirement.rentalTerm)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Tenant",
					value: categoryLabel(requirement)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Area",
					value: requirementArea(requirement)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Contact",
					value: contactLabel(requirement.contactMethod, requirement.contactTime)
				}),
				requirement.segment === "residential" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Bedrooms",
						value: requirement.bedrooms === "bachelor" ? "Bachelor" : requirement.bedrooms === "5plus" ? "5+" : requirement.bedrooms
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Washrooms",
						value: requirement.washrooms === "4plus" ? "4+" : requirement.washrooms
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Parking",
						value: parkingLabel(requirement.parking)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Condition",
						value: conditionLabel(requirement.condition)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Furnished",
						value: furnishedLabel(requirement.furnished)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Move-in",
						value: requirement.immediately ? "Immediately" : requirement.useRange ? `${formatLong(requirement.moveInDate)} – ${formatLong(requirement.moveInEnd)}` : formatLong(requirement.moveInDate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "±15 days",
						value: requirement.dateFlexibility ? "Yes" : "No"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Employment letter",
						value: optionLabel(EMPLOYMENT_LETTERS, requirement.employmentLetter)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Credit category",
						value: creditLabel(requirement.creditScore)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Pets",
						value: petsLabel(requirement.pets)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Laundry",
						value: laundryLabel(requirement.laundry)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Garage",
						value: garageLabel(requirement.garage)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Strict garage storage",
						value: requirement.strictGarageStorage ? "Required" : "No"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Move-in",
					value: requirement.moveInDate ? formatLong(requirement.moveInDate) : "Not set"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: "Additional requirements"
				}),
				requirement.additional.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-wrap gap-2",
					children: requirement.additional.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-full bg-brass-soft px-3 py-1 text-xs text-brass",
						children: optionLabel(requirement.segment === "residential" ? RES_AMENITIES : COM_EXTRAS, item)
					}, item))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "None selected."
				}),
				requirement.additionalNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-ink",
					children: requirement.additionalNotes
				}) : null
			]
		}),
		requirement.segment === "commercial" && requirement.owner === "me" && (requirement.contactName || requirement.mobile || requirement.email) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-3xl border border-line bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: "Contact on this device"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Visible only because this requirement is yours. It is not shown on marketplace cards."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Name",
							value: requirement.contactName || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Mobile",
							value: requirement.mobile || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Email",
							value: requirement.email || "—"
						})
					]
				})
			]
		}) : null,
		requirement.sample ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: "Contact details are withheld. This sample is not a real person."
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: "Matching properties"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						matches.length,
						" available ",
						matches.length === 1 ? "property matches" : "properties match",
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: matches.map(({ listing, match }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/listings/$id",
						params: { id: listing.id },
						className: "block rounded-2xl border border-line bg-card px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-navy",
							children: listing.address
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted",
							children: match.reasons.slice(0, 3).join(" · ")
						})]
					}) }, listing.id))
				}),
				matches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "No available property matches this requirement."
				}) : null
			]
		})
	] });
}
//#endregion
export { RequirementDetail as component };
