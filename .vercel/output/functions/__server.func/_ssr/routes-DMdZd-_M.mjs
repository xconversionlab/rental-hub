import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useHub } from "./router-BHHULtRV.mjs";
import { t as Logo } from "./shell-BTEIEBZE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DMdZd-_M.js
var import_jsx_runtime = require_jsx_runtime();
function Splash() {
	const navigate = useNavigate();
	const profile = useHub((state) => state.profile);
	const hydrated = useHub((state) => state.hydrated);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col bg-navy px-6 py-8 text-on-navy",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { tone: "paper" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-brass-soft uppercase",
						children: "Canada · Residential and commercial"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl text-balance text-paper",
						children: "A quieter way to rent, from St. John's to Victoria."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-pretty text-paper/80",
						children: "Tenants post what they need. Landlords list what is free. Prices are in Canadian dollars, across every province and territory."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-8 grid grid-cols-3 gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-paper/25 px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-paper/70",
									children: "Currency"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-medium",
									children: "CAD"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-paper/25 px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-paper/70",
									children: "Active for"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-medium",
									children: "60 days"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-paper/25 px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-paper/70",
									children: "Photos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-medium",
									children: "Up to 5"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-paper px-5 text-sm font-medium text-navy",
					onClick: () => {
						if (hydrated && profile.onboarded && profile.role) {
							navigate({ to: "/home" });
							return;
						}
						navigate({ to: "/welcome" });
					},
					children: "Continue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-xs text-paper/60",
					children: "Sample records in this preview are not real listings."
				})]
			})
		]
	});
}
//#endregion
export { Splash as component };
