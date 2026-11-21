import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as ChevronDown } from "../_libs/lucide-react.mjs";
import { U as PROVINCES, x as CITIES } from "./router-BHHULtRV.mjs";
import { r as cn } from "./shell-BTEIEBZE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fields-CVpWSgfP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var controlClass = "min-h-11 w-full rounded-2xl border border-line bg-card px-3 py-2.5 text-base text-ink outline-none transition-colors focus:border-navy disabled:cursor-not-allowed disabled:opacity-60";
function Field({ label, hint, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		"data-invalid": error ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1.5 block text-sm font-medium text-ink",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1.5 block text-xs text-muted",
				children: hint
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				role: "alert",
				className: "mt-1.5 block text-xs text-danger",
				children: error
			}) : null
		]
	});
}
function TextInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: cn(controlClass, props.className)
	});
}
function TextArea(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		className: cn(controlClass, "min-h-28 resize-y", props.className)
	});
}
function SelectInput({ children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			...props,
			className: cn(controlClass, "appearance-none pr-10", props.className),
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
			className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted",
			"aria-hidden": "true"
		})]
	});
}
function ChipSelect({ label, value, onChange, options, error, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		"data-invalid": error ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "mb-2 text-sm font-medium text-ink",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: options.map((option) => {
					const selected = value === option.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": selected,
						onClick: () => onChange(option.id),
						className: cn("min-h-11 rounded-full border px-3 py-2 text-sm transition-colors", selected ? "border-navy bg-navy text-on-navy" : "border-line bg-card text-ink hover:border-navy"),
						children: option.label
					}, option.id);
				})
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-muted",
				children: hint
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-1.5 text-xs text-danger",
				children: error
			}) : null
		]
	});
}
function MultiCheck({ label, values, onChange, options, hint }) {
	const selected = new Set(values);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
			className: "mb-2 text-sm font-medium text-ink",
			children: label
		}),
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs text-muted",
			children: hint
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: options.map((option) => {
				const on = selected.has(option.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": on,
					onClick: () => {
						const next = new Set(selected);
						if (on) next.delete(option.id);
						else next.add(option.id);
						onChange(options.filter((item) => next.has(item.id)).map((item) => item.id));
					},
					className: cn("min-h-11 rounded-full border px-3 py-2 text-left text-sm transition-colors", on ? "border-navy bg-navy text-on-navy" : "border-line bg-card text-ink hover:border-navy"),
					children: option.label
				}, option.id);
			})
		})
	] });
}
function ToggleRow({ label, checked, onChange, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-h-11 cursor-pointer items-start gap-3 rounded-2xl border border-line bg-paper px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			className: "mt-1 size-4 accent-navy",
			checked,
			onChange: (event) => onChange(event.target.checked)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm font-medium text-ink",
			children: label
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 block text-xs text-muted",
			children: hint
		}) : null] })]
	});
}
function ProvinceCity({ province, city, onProvince, onCity, provinceError, cityError }) {
	const listId = (0, import_react.useId)();
	const cities = CITIES[province] ?? [];
	const known = cities.includes(city);
	const selectValue = !city ? "" : known ? city : "__other";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Province or territory",
			error: provinceError,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
				value: province,
				onChange: (event) => {
					onProvince(event.target.value);
					onCity("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Select"
				}), PROVINCES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: item.id,
					children: item.label
				}, item.id))]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
			label: "City",
			error: cityError,
			hint: "Choose Other if your city is not in the list.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
				value: selectValue,
				disabled: !province,
				onChange: (event) => {
					const next = event.target.value;
					onCity(next === "__other" ? "" : next);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: province ? "Select" : "Choose a province first"
					}),
					cities.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: name,
						children: name
					}, name)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "__other",
						children: "Other city"
					})
				]
			}), selectValue === "__other" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				className: "mt-2",
				"aria-label": "City name",
				list: listId,
				value: city,
				placeholder: "Type the city",
				onChange: (event) => onCity(event.target.value)
			}) : null]
		})]
	});
}
function Section({ kicker, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4 rounded-3xl border border-line bg-card p-4 shadow-card sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium tracking-widest text-brass uppercase",
			children: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl text-balance text-navy",
			children: title
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children
		})]
	});
}
function PageHeader({ kicker, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-6 max-w-2xl",
		children: [
			kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-widest text-brass uppercase",
				children: kicker
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl text-balance text-navy sm:text-4xl",
				children: title
			}),
			lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-pretty text-muted",
				children: lede
			}) : null
		]
	});
}
//#endregion
export { ProvinceCity as a, TextArea as c, PageHeader as i, TextInput as l, Field as n, Section as o, MultiCheck as r, SelectInput as s, ChipSelect as t, ToggleRow as u };
