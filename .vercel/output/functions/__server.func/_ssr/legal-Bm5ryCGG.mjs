import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as INQUIRY_TOPICS, c as useHub, m as formatLong } from "./router-BHHULtRV.mjs";
import { n as Shell } from "./shell-BTEIEBZE.mjs";
import { c as TextArea, i as PageHeader, l as TextInput, n as Field, s as SelectInput } from "./fields-CVpWSgfP.mjs";
import { t as Button } from "./button-Zdi7PcXn.mjs";
import { r as validateInquiry } from "./validate-BpUL7CDE.mjs";
import { t as backendStatus } from "./backend-CJ-_Nk6w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-Bm5ryCGG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LegalPage() {
	const addInquiry = useHub((state) => state.addInquiry);
	const inquiries = useHub((state) => state.inquiries);
	const deleteInquiry = useHub((state) => state.deleteInquiry);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [topic, setTopic] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [captcha, setCaptcha] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [otpChannel, setOtpChannel] = (0, import_react.useState)("mobile");
	const [otpTarget, setOtpTarget] = (0, import_react.useState)("");
	const [otpNote, setOtpNote] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)(false);
	const backend = backendStatus();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Trust",
			title: "Contact and privacy",
			lede: "Draft for product review. This is not legal advice, and this preview does not run a live privacy program."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "space-y-4 rounded-3xl border border-line bg-card p-5 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: "Privacy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-pretty text-muted",
					children: [
						"Rental Hub is a Canadian rental marketplace for residential and commercial space, priced in Canadian dollars. In this foundation, records stay in this browser. They are not sent to Supabase, an OTP provider, or a photo host. ",
						backend.provider,
						" is the only store. ",
						backend.planned,
						" is prepared and not connected."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-pretty text-muted",
					children: "Do not put government identity numbers, full credit reports, or banking details into notes. Credit is collected only as a category you choose. Residential requirements store a contact method and time, not a phone number or email. Commercial contact details are optional and shown only on your own requirement."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: "Data retention"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-pretty text-muted",
					children: "Every tenant requirement and landlord listing has a created date and an expiration date. The default life is 60 days. When that date passes, the record is marked expired and treated as unavailable. This foundation does not delete those rows. The data model is ready for a backend job to delete expired marketplace records after you approve that behaviour."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-pretty text-muted",
					children: "Profile details, contact preferences, enquiries, and any future verification information are not on that 60-day clock. They are not deleted automatically. They should not be deleted without an explicit, approved retention policy."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "You can remove your own records, or erase everything on this device, from Profile."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-3xl border border-line bg-card p-5 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: "Verification"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Mobile and email one-time codes are not connected. Requesting a code does not send a message and cannot be checked."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: otpChannel === "mobile" ? tabOn : tabOff,
						onClick: () => setOtpChannel("mobile"),
						children: "Mobile number"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: otpChannel === "email" ? tabOn : tabOff,
						onClick: () => setOtpChannel("email"),
						children: "Email"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-[1fr_auto]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						"aria-label": otpChannel === "mobile" ? "Mobile number" : "Email",
						value: otpTarget,
						onChange: (event) => setOtpTarget(event.target.value),
						placeholder: otpChannel === "mobile" ? "Mobile number" : "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => setOtpNote("No verification service is connected. A code was not sent, and nothing was stored from this field."),
						children: "Send code"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Code",
					hint: "Disabled until a real OTP provider is connected and tested.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						disabled: true,
						placeholder: "------"
					})
				}),
				otpNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: otpNote
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-3xl border border-line bg-card p-5 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-navy",
					children: "Contact"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Questions stay on this device. They are not emailed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 space-y-4",
					onSubmit: (event) => {
						event.preventDefault();
						const next = validateInquiry({
							name,
							email,
							topic,
							message,
							captcha
						});
						setErrors(next);
						if (Object.keys(next).length) return;
						addInquiry({
							id: crypto.randomUUID(),
							createdAt: (/* @__PURE__ */ new Date()).toISOString(),
							name: name.trim(),
							email: email.trim(),
							topic,
							message: message.trim()
						});
						setName("");
						setEmail("");
						setTopic("");
						setMessage("");
						setCaptcha(false);
						setSaved(true);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							error: errors.name,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: name,
								onChange: (event) => setName(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							error: errors.email,
							hint: "Optional. Not required to store the question.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: email,
								onChange: (event) => setEmail(event.target.value),
								inputMode: "email"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Topic",
							error: errors.topic,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: topic,
								onChange: (event) => setTopic(event.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select"
								}), INQUIRY_TOPICS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item.id,
									children: item.label
								}, item.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Message",
							error: errors.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
								value: message,
								onChange: (event) => setMessage(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-start gap-3 rounded-2xl border border-dashed border-line bg-paper px-3 py-3",
							"data-invalid": errors.captcha ? "true" : void 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "mt-1 size-4 accent-navy",
								checked: captcha,
								onChange: (event) => setCaptcha(event.target.checked)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium",
									children: "CAPTCHA placeholder"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-muted",
									children: "This box does not contact a CAPTCHA provider. It only marks that you meant to save the question on this device."
								}),
								errors.captcha ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-xs text-danger",
									children: errors.captcha
								}) : null
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Save question on this device"
						}),
						saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ok",
							children: "Saved on this device. It was not sent anywhere."
						}) : null
					]
				}),
				inquiries.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-3",
					children: inquiries.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-line px-3 py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium text-ink",
								children: [
									item.name,
									" · ",
									formatLong(item.createdAt)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: item.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-2 text-xs font-medium text-danger",
								onClick: () => deleteInquiry(item.id),
								children: "Delete question"
							})
						]
					}, item.id))
				}) : null
			]
		})
	] });
}
var tabOn = "min-h-11 rounded-full bg-navy px-4 text-sm text-on-navy";
var tabOff = "min-h-11 rounded-full border border-line px-4 text-sm text-navy";
//#endregion
export { LegalPage as component };
