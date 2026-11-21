import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useHub, u as statusFromExpiry } from "./router-BHHULtRV.mjs";
import { n as Shell } from "./shell-BTEIEBZE.mjs";
import { a as RequirementCard } from "./cards-DnE8PdiR.mjs";
import { i as PageHeader } from "./fields-CVpWSgfP.mjs";
import { n as buttonClasses } from "./button-Zdi7PcXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requirements-CGFENBoU.js
var import_jsx_runtime = require_jsx_runtime();
function MyRequirements() {
	const mine = useHub((state) => state.requirements).filter((item) => item.owner === "me");
	const active = mine.filter((item) => statusFromExpiry(item.expiresAt) === "active").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Mine",
			title: "My requirements",
			lede: "Each requirement is active for 60 days from the day you save or renew it. Expired requirements stay here as unavailable. They are not deleted automatically."
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
			search: { intent: "requirement" },
			className: buttonClasses("primary", "mb-6"),
			children: "Post a requirement"
		}),
		mine.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: mine.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequirementCard, { requirement: item }, item.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-3xl border border-dashed border-line bg-card px-4 py-8 text-sm text-muted",
			children: "Nothing saved under your role yet. Sample requirements are in Search, not in this list."
		})
	] });
}
//#endregion
export { MyRequirements as component };
