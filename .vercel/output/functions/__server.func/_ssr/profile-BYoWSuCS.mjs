import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CONTACT_TIMES, U as PROVINCES, c as useHub, k as CONTACT_METHODS } from "./router-BHHULtRV.mjs";
import { n as Shell } from "./shell-BTEIEBZE.mjs";
import { i as PageHeader, l as TextInput, n as Field, s as SelectInput } from "./fields-CVpWSgfP.mjs";
import { t as Button } from "./button-Zdi7PcXn.mjs";
import { i as validateProfile } from "./validate-BpUL7CDE.mjs";
import { t as backendStatus } from "./backend-CJ-_Nk6w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BYoWSuCS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const profile = useHub((state) => state.profile);
	const hydrated = useHub((state) => state.hydrated);
	const updateProfile = useHub((state) => state.updateProfile);
	const resetRecords = useHub((state) => state.resetRecords);
	const eraseDevice = useHub((state) => state.eraseDevice);
	const navigate = useNavigate();
	const [draft, setDraft] = (0, import_react.useState)(profile);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [confirmErase, setConfirmErase] = (0, import_react.useState)(false);
	const backend = backendStatus();
	(0, import_react.useEffect)(() => {
		if (hydrated) setDraft(profile);
	}, [hydrated, profile]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Profile and settings",
			title: "Your details on this device",
			lede: "There is no account server. A display name, role, and contact preference are enough to use the desks."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4 rounded-3xl border border-line bg-card p-5 shadow-card",
			onSubmit: (event) => {
				event.preventDefault();
				const next = validateProfile(draft);
				setErrors(next);
				if (Object.keys(next).length) return;
				updateProfile(draft);
				setSaved(true);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Display name",
					error: errors.displayName,
					hint: "Shown on your own records. Not published as a legal name.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: draft.displayName,
						onChange: (event) => setDraft({
							...draft,
							displayName: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Role",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
						value: draft.role,
						onChange: (event) => setDraft({
							...draft,
							role: event.target.value === "landlord" ? "landlord" : event.target.value === "tenant" ? "tenant" : ""
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Not chosen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "tenant",
								children: "Tenant"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "landlord",
								children: "Landlord"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Home province",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						value: draft.province,
						onChange: (event) => setDraft({
							...draft,
							province: event.target.value
						}),
						children: PROVINCES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Preferred contact method",
					error: errors.contactMethod,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						value: draft.contactMethod,
						onChange: (event) => setDraft({
							...draft,
							contactMethod: event.target.value
						}),
						children: CONTACT_METHODS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Preferred contact time",
					error: errors.contactTime,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						value: draft.contactTime,
						onChange: (event) => setDraft({
							...draft,
							contactTime: event.target.value
						}),
						children: CONTACT_TIMES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Mobile",
					error: errors.mobile,
					hint: "Optional. Stored only on this device. Not copied onto listings.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: draft.mobile,
						inputMode: "tel",
						onChange: (event) => setDraft({
							...draft,
							mobile: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					error: errors.email,
					hint: "Optional. Stored only on this device.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: draft.email,
						inputMode: "email",
						onChange: (event) => setDraft({
							...draft,
							email: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Save profile"
				}),
				saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ok",
					children: "Saved on this device."
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-3xl border border-line bg-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: "Connection"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Records"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: backend.provider })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Planned backend"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [backend.planned, ", not connected"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "OTP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Not connected" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Photographs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "On this device, five per listing" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/legal",
					className: "mt-4 inline-flex text-sm font-medium text-navy",
					children: "Privacy, retention, and contact"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					onClick: () => {
						resetRecords();
						setSaved(false);
					},
					children: "Restore sample marketplace data"
				}),
				confirmErase ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "danger",
					onClick: () => {
						eraseDevice();
						navigate({ to: "/welcome" });
					},
					children: "Confirm erase"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "danger",
					onClick: () => setConfirmErase(true),
					children: "Erase everything on this device"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Restoring samples removes requirements, listings, and questions you added. Erasing also clears your role and profile. Neither action deletes a server account, because there is no account."
				})
			]
		})
	] });
}
//#endregion
export { ProfilePage as component };
