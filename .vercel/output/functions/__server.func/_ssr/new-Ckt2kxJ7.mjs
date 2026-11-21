import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CONTACT_TIMES, B as PETS, C as COM_BUDGETS, D as COM_TYPES, E as COM_TENANT_CATEGORIES, F as FURNISHED_PREF, I as GARAGE, J as RES_TENANT_CATEGORIES, N as EMPLOYMENT_LETTERS, O as CONDITIONS, R as LAUNDRY, S as COM_AREAS, W as RES_AMENITIES, X as TERMS, Y as RES_TYPES, Z as WASHROOMS, c as useHub, j as CREDIT_SCORES, k as CONTACT_METHODS, l as expiryFrom, n as Route, q as RES_BUDGETS, w as COM_EXTRAS, y as BEDROOMS, z as PARKING } from "./router-BHHULtRV.mjs";
import { n as Shell } from "./shell-BTEIEBZE.mjs";
import { a as ProvinceCity, c as TextArea, i as PageHeader, l as TextInput, n as Field, o as Section, r as MultiCheck, s as SelectInput, t as ChipSelect, u as ToggleRow } from "./fields-CVpWSgfP.mjs";
import { t as Button } from "./button-Zdi7PcXn.mjs";
import { n as validateCommercialRequirement, o as validateResidentialRequirement } from "./validate-BpUL7CDE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-Ckt2kxJ7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ownerLabel(name) {
	return name.trim() || "You";
}
function blankResidential(profileName, province) {
	const now = /* @__PURE__ */ new Date();
	return {
		kind: "requirement",
		segment: "residential",
		id: crypto.randomUUID(),
		createdAt: now.toISOString(),
		expiresAt: expiryFrom(now),
		status: "active",
		sample: false,
		owner: "me",
		ownerLabel: ownerLabel(profileName),
		province,
		city: "",
		propertyType: "",
		condition: "",
		furnished: "",
		bedrooms: "",
		washrooms: "",
		parking: "",
		rentalTerm: "",
		moveInDate: "",
		moveInEnd: "",
		useRange: false,
		dateFlexibility: true,
		immediately: false,
		budget: "",
		tenantCategory: "",
		additional: [],
		additionalNotes: "",
		employmentLetter: "",
		creditScore: "",
		pets: "",
		laundry: "",
		garage: "",
		strictGarageStorage: false,
		contactMethod: "",
		contactTime: ""
	};
}
function blankCommercial(profileName, province) {
	const now = /* @__PURE__ */ new Date();
	return {
		kind: "requirement",
		segment: "commercial",
		id: crypto.randomUUID(),
		createdAt: now.toISOString(),
		expiresAt: expiryFrom(now),
		status: "active",
		sample: false,
		owner: "me",
		ownerLabel: ownerLabel(profileName),
		province,
		city: "",
		commercialType: "",
		area: "",
		budget: "",
		rentalTerm: "",
		moveInDate: "",
		additional: [],
		additionalNotes: "",
		tenantCategory: "",
		contactName: "",
		mobile: "",
		email: "",
		contactMethod: "",
		contactTime: ""
	};
}
function ErrorSummary({ errors }) {
	const count = Object.keys(errors).length;
	if (!count) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		role: "alert",
		className: "rounded-2xl bg-danger-soft px-4 py-3 text-sm text-danger",
		children: [
			"Fix ",
			count,
			" highlighted ",
			count === 1 ? "field" : "fields",
			" before saving."
		]
	});
}
function ResidentialRequirementForm({ initial }) {
	const profile = useHub((state) => state.profile);
	const save = useHub((state) => state.saveRequirement);
	const navigate = useNavigate();
	const [draft, setDraft] = (0, import_react.useState)(initial ?? blankResidential(profile.displayName, profile.province));
	const [errors, setErrors] = (0, import_react.useState)({});
	function patch(partial) {
		setDraft((current) => ({
			...current,
			...partial
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (event) => {
			event.preventDefault();
			const nextErrors = validateResidentialRequirement(draft);
			setErrors(nextErrors);
			if (Object.keys(nextErrors).length) {
				document.querySelector("[data-invalid='true']")?.scrollIntoView({ block: "center" });
				return;
			}
			const record = {
				...draft,
				ownerLabel: ownerLabel(profile.displayName),
				sample: false,
				owner: "me"
			};
			save(record);
			navigate({
				to: "/requirements/$id",
				params: { id: record.id }
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorSummary, { errors }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				kicker: "Location",
				title: "Where do you want to live?",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvinceCity, {
					province: draft.province,
					city: draft.city,
					onProvince: (province) => patch({
						province,
						city: ""
					}),
					onCity: (city) => patch({ city }),
					provinceError: errors.province,
					cityError: errors.city
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "Home",
				title: "The residential property",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Property type",
						error: errors.propertyType,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.propertyType,
							onChange: (event) => patch({ propertyType: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), RES_TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Property condition",
						error: errors.condition,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.condition,
							onChange: (event) => patch({ condition: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), CONDITIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipSelect, {
						label: "Furnished preference",
						value: draft.furnished,
						onChange: (furnished) => patch({ furnished }),
						options: FURNISHED_PREF,
						error: errors.furnished
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipSelect, {
						label: "Bedrooms",
						value: draft.bedrooms,
						onChange: (bedrooms) => patch({ bedrooms }),
						options: BEDROOMS,
						error: errors.bedrooms
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipSelect, {
						label: "Washrooms",
						value: draft.washrooms,
						onChange: (washrooms) => patch({ washrooms }),
						options: WASHROOMS,
						error: errors.washrooms
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Parking",
						error: errors.parking,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.parking,
							onChange: (event) => patch({ parking: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), PARKING.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "Term and timing",
				title: "When you want to move",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipSelect, {
						label: "Rental term",
						value: draft.rentalTerm,
						onChange: (rentalTerm) => patch({ rentalTerm }),
						options: TERMS,
						error: errors.rentalTerm
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "I can move immediately",
						checked: draft.immediately,
						onChange: (immediately) => patch({ immediately })
					}),
					draft.immediately ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Choose a calendar date range",
							checked: draft.useRange,
							onChange: (useRange) => patch({ useRange }),
							hint: "Use this when any day inside a window works."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: draft.useRange ? "Range start" : "Preferred move-in date",
								error: errors.moveInDate,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "date",
									value: draft.moveInDate,
									onChange: (event) => patch({ moveInDate: event.target.value })
								})
							}), draft.useRange ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Range end",
								error: errors.moveInEnd,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "date",
									value: draft.moveInEnd,
									onChange: (event) => patch({ moveInEnd: event.target.value })
								})
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Date flexibility of ±15 days",
							checked: draft.dateFlexibility,
							onChange: (dateFlexibility) => patch({ dateFlexibility }),
							hint: "Matches include properties free up to 15 days after your latest date. Homes already vacant are included."
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "Budget and household",
				title: "What you can pay, and who is moving",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Monthly budget (CAD)",
						error: errors.budget,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.budget,
							onChange: (event) => patch({ budget: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), RES_BUDGETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tenant category",
						error: errors.tenantCategory,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.tenantCategory,
							onChange: (event) => patch({ tenantCategory: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), RES_TENANT_CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Employment letter",
						error: errors.employmentLetter,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.employmentLetter,
							onChange: (event) => patch({ employmentLetter: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), EMPLOYMENT_LETTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Credit score category",
						error: errors.creditScore,
						hint: "Canadian score bands, about 300 to 900. This is a category, not a credit check.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.creditScore,
							onChange: (event) => patch({ creditScore: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), CREDIT_SCORES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "Practical needs",
				title: "Pets, laundry, and storage",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Pets",
						error: errors.pets,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.pets,
							onChange: (event) => patch({ pets: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), PETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Laundry preference",
						error: errors.laundry,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.laundry,
							onChange: (event) => patch({ laundry: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), LAUNDRY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Garage availability",
						error: errors.garage,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.garage,
							onChange: (event) => patch({ garage: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), GARAGE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Strict garage storage requirement",
						checked: draft.strictGarageStorage,
						onChange: (strictGarageStorage) => patch({ strictGarageStorage }),
						hint: "The garage must be usable for storage, not only as a parking space you might decline."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiCheck, {
						label: "Additional requirements",
						values: draft.additional,
						onChange: (additional) => patch({ additional }),
						options: RES_AMENITIES
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notes",
						hint: "Optional. Do not include account numbers or government IDs.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: draft.additionalNotes,
							onChange: (event) => patch({ additionalNotes: event.target.value })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "Contact preference",
				title: "How a landlord may reach you",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Phone numbers and email addresses are not stored on a residential requirement. Set them in Profile if you want them kept on this device. Marketplace cards show only the method and time."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preferred contact method",
						error: errors.contactMethod,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.contactMethod,
							onChange: (event) => patch({ contactMethod: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), CONTACT_METHODS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preferred contact time",
						error: errors.contactTime,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.contactTime,
							onChange: (event) => patch({ contactTime: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), CONTACT_TIMES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: initial ? "Save changes" : "Save requirement"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					onClick: () => void navigate({ to: "/requirements" }),
					children: "Cancel"
				})]
			})
		]
	});
}
function CommercialRequirementForm({ initial }) {
	const profile = useHub((state) => state.profile);
	const save = useHub((state) => state.saveRequirement);
	const navigate = useNavigate();
	const [draft, setDraft] = (0, import_react.useState)(initial ?? blankCommercial(profile.displayName, profile.province));
	const [errors, setErrors] = (0, import_react.useState)({});
	function patch(partial) {
		setDraft((current) => ({
			...current,
			...partial
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (event) => {
			event.preventDefault();
			const nextErrors = validateCommercialRequirement(draft);
			setErrors(nextErrors);
			if (Object.keys(nextErrors).length) {
				document.querySelector("[data-invalid='true']")?.scrollIntoView({ block: "center" });
				return;
			}
			const record = {
				...draft,
				ownerLabel: ownerLabel(profile.displayName),
				sample: false,
				owner: "me"
			};
			save(record);
			navigate({
				to: "/requirements/$id",
				params: { id: record.id }
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorSummary, { errors }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				kicker: "Location",
				title: "Where do you need space?",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvinceCity, {
					province: draft.province,
					city: draft.city,
					onProvince: (province) => patch({
						province,
						city: ""
					}),
					onCity: (city) => patch({ city }),
					provinceError: errors.province,
					cityError: errors.city
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "Premises",
				title: "The commercial requirement",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Commercial property type",
						error: errors.commercialType,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.commercialType,
							onChange: (event) => patch({ commercialType: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), COM_TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Required area",
						error: errors.area,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.area,
							onChange: (event) => patch({ area: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), COM_AREAS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Monthly budget (CAD)",
						error: errors.budget,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.budget,
							onChange: (event) => patch({ budget: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), COM_BUDGETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipSelect, {
						label: "Rental term",
						value: draft.rentalTerm,
						onChange: (rentalTerm) => patch({ rentalTerm }),
						options: TERMS,
						error: errors.rentalTerm
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preferred move-in date",
						error: errors.moveInDate,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "date",
							value: draft.moveInDate,
							onChange: (event) => patch({ moveInDate: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tenant category",
						error: errors.tenantCategory,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.tenantCategory,
							onChange: (event) => patch({ tenantCategory: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), COM_TENANT_CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiCheck, {
						label: "Additional requirements",
						values: draft.additional,
						onChange: (additional) => patch({ additional }),
						options: COM_EXTRAS
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: draft.additionalNotes,
							onChange: (event) => patch({ additionalNotes: event.target.value })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "Contact information",
				title: "How a landlord may reach you",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Name, mobile, and email are optional. If you enter them, they stay on this device with the requirement and are hidden on marketplace cards. Nothing is sent to a server."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Contact name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: draft.contactName,
							onChange: (event) => patch({ contactName: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Mobile number",
							error: errors.mobile,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								inputMode: "tel",
								autoComplete: "tel",
								value: draft.mobile,
								onChange: (event) => patch({ mobile: event.target.value }),
								placeholder: "Optional"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							error: errors.email,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								inputMode: "email",
								autoComplete: "email",
								value: draft.email,
								onChange: (event) => patch({ email: event.target.value }),
								placeholder: "Optional"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preferred contact method",
						error: errors.contactMethod,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.contactMethod,
							onChange: (event) => patch({ contactMethod: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), CONTACT_METHODS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preferred contact time",
						error: errors.contactTime,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: draft.contactTime,
							onChange: (event) => patch({ contactTime: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), CONTACT_TIMES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: initial ? "Save changes" : "Save requirement"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					onClick: () => void navigate({ to: "/requirements" }),
					children: "Cancel"
				})]
			})
		]
	});
}
function NewRequirement() {
	const { segment, edit } = Route.useSearch();
	const requirements = useHub((state) => state.requirements);
	const existing = edit ? requirements.find((item) => item.id === edit && item.owner === "me") : void 0;
	const resolved = existing?.segment ?? segment;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: resolved === "commercial" ? "Commercial requirement" : "Residential requirement",
		title: existing ? "Edit requirement" : "Post what you need",
		lede: "Active for 60 days. Phone and email are optional, stored only on this device, and kept off marketplace cards."
	}), edit && !existing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-danger",
		children: [
			"That requirement is not yours to edit.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/requirements",
				className: "underline",
				children: "Back to your requirements"
			})
		]
	}) : resolved === "commercial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommercialRequirementForm, { initial: existing?.segment === "commercial" ? existing : void 0 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResidentialRequirementForm, { initial: existing?.segment === "residential" ? existing : void 0 })] });
}
//#endregion
export { NewRequirement as component };
