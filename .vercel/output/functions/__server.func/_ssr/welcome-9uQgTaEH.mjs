import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Logo } from "./shell-BTEIEBZE.mjs";
import { n as buttonClasses } from "./button-Zdi7PcXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/welcome-9uQgTaEH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var slides = [
	{
		kicker: "01",
		title: "One desk for a home or a workplace.",
		body: "Residential and commercial rentals live in the same marketplace, with separate forms so a condo search never mixes with a warehouse."
	},
	{
		kicker: "02",
		title: "Every province. Canadian dollars.",
		body: "Filter by province and city, budget or rent, property type, area, term, and the date a place is free."
	},
	{
		kicker: "03",
		title: "Requirements and listings last 60 days.",
		body: "After that they are marked unavailable. They are not deleted here. Profiles and verification notes are kept until you remove them."
	}
];
function Welcome() {
	const [index, setIndex] = (0, import_react.useState)(0);
	const slide = slides[index];
	const last = index === slides.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col bg-paper px-6 py-8 text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium tracking-widest text-brass uppercase",
						children: [slide.kicker, " / 03"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl text-balance text-navy",
						children: slide.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-pretty text-muted",
						children: slide.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex gap-2",
						"aria-hidden": "true",
						children: slides.map((item, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: itemIndex === index ? "h-1.5 w-8 rounded-full bg-navy" : "h-1.5 w-4 rounded-full bg-line" }, item.kicker))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-lg gap-3",
				children: [index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: buttonClasses("secondary", "flex-1"),
					onClick: () => setIndex((value) => value - 1),
					children: "Back"
				}) : null, last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/role",
					className: buttonClasses("primary", "flex-1"),
					children: "Choose a role"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: buttonClasses("primary", "flex-1"),
					onClick: () => setIndex((value) => value + 1),
					children: "Next"
				})]
			})
		]
	});
}
//#endregion
export { Welcome as component };
