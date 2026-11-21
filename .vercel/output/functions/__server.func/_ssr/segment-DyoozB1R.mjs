import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as House, p as Building2 } from "../_libs/lucide-react.mjs";
import { o as Route$7 } from "./router-BHHULtRV.mjs";
import { n as Shell } from "./shell-BTEIEBZE.mjs";
import { i as PageHeader } from "./fields-CVpWSgfP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/segment-DyoozB1R.js
var import_jsx_runtime = require_jsx_runtime();
function SegmentScreen() {
	const { intent } = Route$7.useSearch();
	const copy = intent === "listing" ? {
		kicker: "New listing",
		title: "What are you listing?",
		lede: "Residential and commercial listings use different forms."
	} : intent === "search" ? {
		kicker: "Search",
		title: "What are you looking through?",
		lede: "Start with residential or commercial, then refine."
	} : {
		kicker: "New requirement",
		title: "What do you need?",
		lede: "Residential and commercial requirements are kept separate."
	};
	function href(segment) {
		if (intent === "listing") return {
			to: "/listings/new",
			search: {
				segment,
				edit: void 0
			}
		};
		if (intent === "search") return {
			to: "/search",
			search: {
				segment,
				view: "properties"
			}
		};
		return {
			to: "/requirements/new",
			search: {
				segment,
				edit: void 0
			}
		};
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { ...copy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			...href("residential"),
			className: "rounded-3xl border border-line bg-card p-6 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
					className: "size-5 text-navy",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-3xl text-navy",
					children: "Residential"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-pretty text-muted",
					children: "Homes, condos, suites, and rooms. Bedrooms, furnishing, pets, laundry, and garage."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			...href("commercial"),
			className: "rounded-3xl border border-line bg-card p-6 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
					className: "size-5 text-brass",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-3xl text-navy",
					children: "Commercial"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-pretty text-muted",
					children: "Offices, retail, industrial, and other workplaces. Area, rent, and extra site needs."
				})
			]
		})]
	})] });
}
//#endregion
export { SegmentScreen as component };
