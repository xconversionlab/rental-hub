import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Scale, i as Search, l as House, n as UserRound, p as Building2 } from "../_libs/lucide-react.mjs";
import { c as useHub } from "./router-BHHULtRV.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-BTEIEBZE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Logo({ tone = "navy" }) {
	const inverted = tone === "paper";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2", inverted ? "text-paper" : "text-navy"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("grid size-9 place-items-center rounded-xl", inverted ? "bg-paper text-navy" : "bg-navy text-paper"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 24 24",
				className: "size-5",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M4 11.5 12 5l8 6.5",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M7 10.5V19h10v-8.5",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M11 19v-4h2v4",
						fill: "currentColor"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-xl leading-none",
			children: "Rental Hub"
		})]
	});
}
var links = [
	{
		to: "/home",
		label: "Home",
		icon: House,
		match: ["/home"]
	},
	{
		to: "/search",
		label: "Search",
		icon: Search,
		match: ["/search"]
	},
	{
		to: "/matches",
		label: "Matches",
		icon: Scale,
		match: ["/matches"]
	},
	{
		to: "/saved",
		label: "Mine",
		icon: Building2,
		match: [
			"/requirements",
			"/listings",
			"/saved",
			"/segment"
		]
	},
	{
		to: "/profile",
		label: "Profile",
		icon: UserRound,
		match: ["/profile", "/legal"]
	}
];
function NavList({ vertical }) {
	const path = useRouterState({ select: (state) => state.location.pathname });
	const role = useHub((state) => state.profile.role);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: cn(vertical ? "flex flex-col gap-1" : "grid grid-cols-5"),
		children: links.map((item) => {
			const active = item.match.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
			const target = item.to === "/saved" ? role === "landlord" ? "/listings" : "/requirements" : item.to;
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: target,
				className: cn("flex min-h-11 items-center gap-2 rounded-2xl px-2 py-2 text-xs font-medium", vertical ? "justify-start px-3" : "flex-col justify-center", active ? "bg-navy text-on-navy" : "text-muted hover:bg-card hover:text-navy"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4",
					"aria-hidden": "true"
				}), item.label]
			}) }, item.label);
		})
	});
}
function Shell({ children }) {
	const hydrate = useHub((state) => state.hydrate);
	const storageError = useHub((state) => state.storageError);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink lg:grid lg:grid-cols-[240px_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#content",
				className: "absolute -left-40 top-3 z-50 rounded-full bg-navy px-4 py-2 text-sm text-on-navy focus:left-4",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-screen flex-col gap-8 border-r border-line bg-card px-4 py-6 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/home",
						"aria-label": "Rental Hub home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, { vertical: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-auto text-xs text-pretty text-muted",
						children: "Canadian rentals in CAD. Sample records are not real vacancies."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "sticky top-0 z-20 flex items-center justify-between border-b border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/home",
							"aria-label": "Rental Hub home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						})
					}),
					storageError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "border-b border-line bg-danger-soft px-4 py-2 text-sm text-danger",
						children: storageError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						id: "content",
						className: "mx-auto w-full max-w-6xl px-4 py-6 pb-28 lg:px-8 lg:pb-10",
						children
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "fixed inset-x-0 bottom-0 z-20 border-t border-line bg-card px-2 pt-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] lg:hidden",
						"aria-label": "Primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {})
					})
				]
			})
		]
	});
}
//#endregion
export { Shell as n, cn as r, Logo as t };
