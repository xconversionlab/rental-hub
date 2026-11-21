import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useHub } from "./router-BHHULtRV.mjs";
import { t as Button } from "./button-Zdi7PcXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner-actions-BH3lYcgz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OwnerActions({ kind, id, mine, segment }) {
	const navigate = useNavigate();
	const renewListing = useHub((state) => state.renewListing);
	const deleteListing = useHub((state) => state.deleteListing);
	const renewRequirement = useHub((state) => state.renewRequirement);
	const deleteRequirement = useHub((state) => state.deleteRequirement);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	if (!mine) return null;
	const edit = kind === "listing" ? {
		to: "/listings/new",
		search: {
			segment,
			edit: id
		}
	} : {
		to: "/requirements/new",
		search: {
			segment,
			edit: id
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: edit.to,
				search: edit.search,
				className: "inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-sm font-medium text-navy",
				children: "Edit"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				onClick: () => {
					if (kind === "listing") renewListing(id);
					else renewRequirement(id);
				},
				children: "Renew 60 days"
			}),
			confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "danger",
				onClick: () => {
					if (kind === "listing") {
						deleteListing(id);
						navigate({ to: "/listings" });
					} else {
						deleteRequirement(id);
						navigate({ to: "/requirements" });
					}
				},
				children: "Confirm remove"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "danger",
				onClick: () => setConfirm(true),
				children: "Remove"
			})
		]
	});
}
//#endregion
export { OwnerActions as t };
