import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useHub, u as statusFromExpiry } from "./router-BHHULtRV.mjs";
import { n as Shell } from "./shell-BTEIEBZE.mjs";
import { n as ListingCard } from "./cards-DnE8PdiR.mjs";
import { i as PageHeader } from "./fields-CVpWSgfP.mjs";
import { n as buttonClasses } from "./button-Zdi7PcXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listings-dhAtnww2.js
var import_jsx_runtime = require_jsx_runtime();
function MyListings() {
	const mine = useHub((state) => state.listings).filter((item) => item.owner === "me");
	const active = mine.filter((item) => statusFromExpiry(item.expiresAt) === "active").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Mine",
			title: "My property listings",
			lede: "Each listing is active for 60 days. Photographs stay attached to that listing, up to five. Expired listings are marked unavailable and are not deleted here."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-sm text-muted",
			children: [
				active,
				" active · ",
				mine.length - active,
				" expired"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/segment",
			search: { intent: "listing" },
			className: buttonClasses("primary", "mb-6"),
			children: "List a property"
		}),
		mine.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: mine.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing: item }, item.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-3xl border border-dashed border-line bg-card px-4 py-8 text-sm text-muted",
			children: "You have not published a listing. Sample properties are in Search and are not yours."
		})
	] });
}
//#endregion
export { MyListings as component };
