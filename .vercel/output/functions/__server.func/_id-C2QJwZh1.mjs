import { i as __toESM } from "./_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { $ as optionLabel, W as RES_AMENITIES, a as Route$4, c as useHub, m as formatLong, p as formatCAD, u as statusFromExpiry, w as COM_EXTRAS } from "./_ssr/router-BHHULtRV.mjs";
import { n as Shell } from "./_ssr/shell-BTEIEBZE.mjs";
import { C as placeLine, c as assess, f as conditionLabel, h as furnishedLabel, i as PropertyPlate, k as termLabel, l as availabilityLine, o as SampleBanner, p as contactLabel, r as Pill, s as areaLine, t as Fact, w as plateFor, x as parkingLabel, y as listingTitle } from "./_ssr/cards-DnE8PdiR.mjs";
import { i as PageHeader } from "./_ssr/fields-CVpWSgfP.mjs";
import { t as OwnerActions } from "./_ssr/owner-actions-BH3lYcgz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-C2QJwZh1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ListingDetail() {
	const { id } = Route$4.useParams();
	const listing = useHub((state) => state.listings.find((item) => item.id === id));
	const requirements = useHub((state) => state.requirements);
	const profile = useHub((state) => state.profile);
	const [photo, setPhoto] = (0, import_react.useState)(0);
	if (!listing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Property not found",
		lede: "It may have been removed from this device."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/search",
		search: {
			segment: "all",
			view: "properties"
		},
		className: "text-sm font-medium text-navy",
		children: "Back to search"
	})] });
	const status = statusFromExpiry(listing.expiresAt);
	const photos = listing.photos;
	const matches = requirements.map((requirement) => ({
		requirement,
		match: assess(requirement, listing)
	})).filter((item) => item.match.ok).sort((a, b) => b.match.score - a.match.score);
	const showContact = listing.owner === "me";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				photos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: photos[Math.min(photo, photos.length - 1)],
					alt: `${listingTitle(listing)} photograph ${photo + 1}`,
					className: "aspect-[3/2] w-full rounded-3xl object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-3xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyPlate, {
						kind: plateFor(listing),
						label: "No photograph"
					})
				}),
				photos.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2 overflow-x-auto",
					children: photos.map((src, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPhoto(index),
						className: "shrink-0 overflow-hidden rounded-xl border border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: "",
							className: "size-16 object-cover"
						})
					}, src.slice(0, 24) + index))
				}) : null,
				!photos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Photographs are optional. This record has none."
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					kicker: listing.segment === "commercial" ? "Commercial property" : "Residential property",
					title: listingTitle(listing),
					lede: `${formatCAD(listing.monthlyRent)} per month · ${placeLine(listing)}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap gap-2",
					children: [listing.sample ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						tone: "brass",
						children: "Sample"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: "Yours" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						tone: status === "active" ? "ok" : "danger",
						children: status === "active" ? "Available" : "Expired · unavailable"
					})]
				}),
				listing.sample ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleBanner, {})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-ink",
					children: listing.address
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-4 text-sm text-muted",
					children: [
						listing.postalCode,
						" · Created ",
						formatLong(listing.createdAt),
						" · Expires ",
						formatLong(listing.expiresAt)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnerActions, {
					kind: "listing",
					id: listing.id,
					mine: listing.owner === "me",
					segment: listing.segment
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Rent",
					value: `${formatCAD(listing.monthlyRent)} / month`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Area",
					value: areaLine(listing)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Term",
					value: termLabel(listing.rentalTerm)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Condition",
					value: conditionLabel(listing.condition)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Parking",
					value: parkingLabel(listing.parking)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Availability",
					value: availabilityLine(listing)
				}),
				listing.segment === "residential" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Furnishing",
						value: furnishedLabel(listing.furnishing)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Bedrooms",
						value: listing.bedrooms
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Washrooms",
						value: listing.washrooms
					})
				] }) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: listing.segment === "commercial" ? "Additional commercial requirements" : "Amenities"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-wrap gap-2",
					children: (listing.segment === "commercial" ? listing.additional : listing.amenities).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-full bg-brass-soft px-3 py-1 text-xs text-brass",
						children: optionLabel(listing.segment === "commercial" ? COM_EXTRAS : RES_AMENITIES, item)
					}, item))
				}),
				(listing.segment === "commercial" ? listing.additional : listing.amenities).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "None listed."
				}) : null,
				listing.segment === "commercial" && listing.additionalNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: listing.additionalNotes
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-3xl border border-line bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-navy",
				children: "Contact"
			}), listing.sample ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Sample landlord. Contact details are withheld because this is not a real listing."
			}) : showContact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Preferred method",
					value: contactLabel(profile.contactMethod, profile.contactTime)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "On your profile",
					value: profile.email || profile.mobile || "No phone or email saved"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "The lister’s preferred contact method is kept off public cards in this preview."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: "Matching tenants"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						matches.length,
						" active ",
						matches.length === 1 ? "requirement matches" : "requirements match",
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: matches.map(({ requirement, match }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/requirements/$id",
						params: { id: requirement.id },
						className: "block rounded-2xl border border-line bg-card px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-navy",
							children: [
								requirement.city,
								" · ",
								requirement.segment
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted",
							children: match.reasons.slice(0, 3).join(" · ")
						})]
					}) }, requirement.id))
				})
			]
		})
	] });
}
//#endregion
export { ListingDetail as component };
