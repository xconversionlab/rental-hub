import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as KeyRound, p as Building2 } from "../_libs/lucide-react.mjs";
import { c as useHub } from "./router-BHHULtRV.mjs";
import { t as Logo } from "./shell-BTEIEBZE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/role-Be1xtF8I.js
var import_jsx_runtime = require_jsx_runtime();
function RoleScreen() {
	const navigate = useNavigate();
	const updateProfile = useHub((state) => state.updateProfile);
	function choose(role) {
		updateProfile({
			role,
			onboarded: true
		});
		navigate({ to: "/home" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-paper px-6 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-10 w-full max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-brass uppercase",
					children: "Role"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl text-balance text-navy",
					children: "Are you looking, or listing?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-pretty text-muted",
					children: "You can switch later in Profile. This only changes your desk. It is not an account, and it does not verify you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => choose("tenant"),
						className: "rounded-3xl border border-line bg-card p-6 text-left shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 place-items-center rounded-2xl bg-navy text-on-navy",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
									className: "size-5",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-5 block font-display text-3xl text-navy",
								children: "Tenant"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block text-sm text-pretty text-muted",
								children: "Post a residential or commercial requirement, then see properties that fit your budget, dates, and city."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => choose("landlord"),
						className: "rounded-3xl border border-line bg-card p-6 text-left shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 place-items-center rounded-2xl bg-brass-soft text-brass",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
									className: "size-5",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-5 block font-display text-3xl text-navy",
								children: "Landlord"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block text-sm text-pretty text-muted",
								children: "List a home or a commercial space, add up to five photographs, and see tenant requirements that match."
							})
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { RoleScreen as component };
