import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as cn } from "./shell-BTEIEBZE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-Zdi7PcXn.js
var import_jsx_runtime = require_jsx_runtime();
var variants = {
	primary: "bg-navy text-on-navy hover:bg-navy-deep",
	secondary: "border border-line bg-card text-navy hover:border-navy",
	ghost: "text-navy hover:bg-card",
	danger: "border border-danger bg-danger-soft text-danger",
	brass: "bg-brass text-paper hover:opacity-90"
};
function buttonClasses(variant = "primary", className) {
	return cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50", variants[variant], className);
}
function Button({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		className: buttonClasses(variant, className)
	});
}
//#endregion
export { buttonClasses as n, Button as t };
