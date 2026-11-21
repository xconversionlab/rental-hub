import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Camera, o as RefreshCw, t as X } from "../_libs/lucide-react.mjs";
import { D as COM_TYPES, O as CONDITIONS, P as FURNISHED, W as RES_AMENITIES, X as TERMS, Y as RES_TYPES, Z as WASHROOMS, c as useHub, h as formatPostal, i as Route$3, l as expiryFrom, w as COM_EXTRAS, y as BEDROOMS, z as PARKING } from "./router-BHHULtRV.mjs";
import { n as Shell, r as cn } from "./shell-BTEIEBZE.mjs";
import { a as ProvinceCity, c as TextArea, i as PageHeader, l as TextInput, n as Field, o as Section, r as MultiCheck, s as SelectInput, t as ChipSelect, u as ToggleRow } from "./fields-CVpWSgfP.mjs";
import { t as Button } from "./button-Zdi7PcXn.mjs";
import { a as validateResidentialListing, t as validateCommercialListing } from "./validate-BpUL7CDE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-DgjwWxcc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function compressImage(file) {
	const bitmap = await createImageBitmap(file).catch(() => null);
	if (!bitmap) throw new Error("That image could not be read. Use a JPEG or PNG.");
	const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
	const width = Math.max(1, Math.round(bitmap.width * scale));
	const height = Math.max(1, Math.round(bitmap.height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const context = canvas.getContext("2d");
	if (!context) throw new Error("This browser could not prepare the photograph.");
	context.drawImage(bitmap, 0, 0, width, height);
	bitmap.close?.();
	return canvas.toDataURL("image/jpeg", .72);
}
function PhotoPicker({ photos, onChange, error }) {
	const inputRef = (0, import_react.useRef)(null);
	const replaceRef = (0, import_react.useRef)(null);
	const [replaceAt, setReplaceAt] = (0, import_react.useState)(null);
	const [message, setMessage] = (0, import_react.useState)("");
	async function addFiles(files, index) {
		if (!files || files.length === 0) return;
		setMessage("");
		try {
			if (index !== null) {
				const next = photos.slice();
				next[index] = await compressImage(files[0]);
				onChange(next);
				return;
			}
			const room = 5 - photos.length;
			if (room <= 0) {
				setMessage(`A property can include at most 5 photographs.`);
				return;
			}
			const chosen = Array.from(files).slice(0, room);
			if (files.length > room) setMessage(`Only ${room} more photograph${room === 1 ? "" : "s"} can be added. The limit is 5.`);
			const encoded = [];
			for (const file of chosen) encoded.push(await compressImage(file));
			onChange([...photos, ...encoded]);
		} catch (cause) {
			setMessage(cause instanceof Error ? cause.message : "That image could not be added.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-invalid": error ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-ink",
					children: "Photographs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [
						"Optional until a listing policy says otherwise. Up to ",
						5,
						". They stay with this property on this device."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm tabular-nums text-muted",
					children: [
						photos.length,
						" of ",
						5
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
				children: [photos.map((src, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-2xl border border-line bg-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: `Photograph ${index + 1} of this property`,
						className: "aspect-[3/2] w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 border-t border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex min-h-11 items-center justify-center gap-1 text-xs font-medium text-ink",
							onClick: () => {
								setReplaceAt(index);
								replaceRef.current?.click();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								className: "size-3.5",
								"aria-hidden": "true"
							}), "Replace"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex min-h-11 items-center justify-center gap-1 border-l border-line text-xs font-medium text-danger",
							onClick: () => onChange(photos.filter((_, item) => item !== index)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								className: "size-3.5",
								"aria-hidden": "true"
							}), "Remove"]
						})]
					})]
				}, `${index}-${src.slice(0, 32)}`)), photos.length < 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => inputRef.current?.click(),
					className: cn("flex aspect-[3/2] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-paper text-sm text-navy", "min-h-28"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
						className: "size-5",
						"aria-hidden": "true"
					}), "Add from gallery"]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				className: "sr-only",
				type: "file",
				accept: "image/*",
				multiple: true,
				onChange: (event) => {
					addFiles(event.target.files, null);
					event.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: replaceRef,
				className: "sr-only",
				type: "file",
				accept: "image/*",
				onChange: (event) => {
					addFiles(event.target.files, replaceAt);
					event.target.value = "";
					setReplaceAt(null);
				}
			}),
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-2 text-xs text-danger",
				children: message
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-2 text-xs text-danger",
				children: error
			}) : null
		]
	});
}
function ownerLabel(name) {
	return name.trim() || "You";
}
function blankResidentialListing(profileName, province) {
	const now = /* @__PURE__ */ new Date();
	return {
		kind: "listing",
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
		address: "",
		postalCode: "",
		propertyType: "",
		condition: "",
		areaSqft: 0,
		furnishing: "",
		bedrooms: "",
		washrooms: "",
		parking: "",
		rentalTerm: "",
		monthlyRent: 0,
		availableDate: "",
		immediately: false,
		amenities: [],
		photos: []
	};
}
function blankCommercialListing(profileName, province) {
	const now = /* @__PURE__ */ new Date();
	return {
		kind: "listing",
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
		address: "",
		postalCode: "",
		commercialType: "",
		condition: "",
		areaSqft: 0,
		parking: "",
		rentalTerm: "",
		monthlyRent: 0,
		availableDate: "",
		immediately: false,
		additional: [],
		additionalNotes: "",
		photos: []
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
			" before publishing."
		]
	});
}
function AddressBlock({ draft, patch, errors }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvinceCity, {
			province: draft.province,
			city: draft.city,
			onProvince: (province) => patch({
				province,
				city: ""
			}),
			onCity: (city) => patch({ city }),
			provinceError: errors.province,
			cityError: errors.city
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Property address",
			error: errors.address,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: draft.address,
				onChange: (event) => patch({ address: event.target.value }),
				autoComplete: "street-address"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Canadian postal code",
			error: errors.postalCode,
			hint: "Format A1A 1A1.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: draft.postalCode,
				autoCapitalize: "characters",
				onChange: (event) => patch({ postalCode: formatPostal(event.target.value) }),
				placeholder: "A1A 1A1"
			})
		})
	] });
}
function ResidentialListingForm({ initial }) {
	const profile = useHub((state) => state.profile);
	const save = useHub((state) => state.saveListing);
	const navigate = useNavigate();
	const [draft, setDraft] = (0, import_react.useState)(initial ?? blankResidentialListing(profile.displayName, profile.province));
	const [errors, setErrors] = (0, import_react.useState)({});
	const [areaText, setAreaText] = (0, import_react.useState)(initial && initial.areaSqft ? String(initial.areaSqft) : "");
	const [rentText, setRentText] = (0, import_react.useState)(initial && initial.monthlyRent ? String(initial.monthlyRent) : "");
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
			const next = {
				...draft,
				areaSqft: Number(areaText),
				monthlyRent: Number(rentText),
				ownerLabel: ownerLabel(profile.displayName),
				sample: false,
				owner: "me"
			};
			const nextErrors = validateResidentialListing(next);
			setErrors(nextErrors);
			setDraft(next);
			if (Object.keys(nextErrors).length) {
				document.querySelector("[data-invalid='true']")?.scrollIntoView({ block: "center" });
				return;
			}
			save(next);
			navigate({
				to: "/listings/$id",
				params: { id: next.id }
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorSummary, { errors }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				kicker: "Address",
				title: "Where is the home?",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressBlock, {
					draft,
					patch,
					errors
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "Home",
				title: "Residential details",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Area (square feet)",
						error: errors.areaSqft,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							inputMode: "numeric",
							value: areaText,
							onChange: (event) => setAreaText(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipSelect, {
						label: "Furnishing",
						value: draft.furnishing,
						onChange: (furnishing) => patch({ furnishing }),
						options: FURNISHED,
						error: errors.furnishing
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
						label: "Parking availability",
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
				kicker: "Rent",
				title: "Term, price, and availability",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipSelect, {
						label: "Rental term",
						value: draft.rentalTerm,
						onChange: (rentalTerm) => patch({ rentalTerm }),
						options: TERMS,
						error: errors.rentalTerm
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Monthly rent (CAD)",
						error: errors.monthlyRent,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							inputMode: "decimal",
							value: rentText,
							onChange: (event) => setRentText(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Available immediately",
						checked: draft.immediately,
						onChange: (immediately) => patch({ immediately })
					}),
					draft.immediately ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Property available date",
						error: errors.availableDate,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "date",
							value: draft.availableDate,
							onChange: (event) => patch({ availableDate: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiCheck, {
						label: "Amenities for matching",
						hint: "Optional. Tenants can filter on these. They are not required to publish.",
						values: draft.amenities,
						onChange: (amenities) => patch({ amenities }),
						options: RES_AMENITIES
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				kicker: "Photographs",
				title: "Up to five images",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoPicker, {
					photos: draft.photos,
					onChange: (photos) => patch({ photos }),
					error: errors.photos
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: initial ? "Save listing" : "Publish listing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					onClick: () => void navigate({ to: "/listings" }),
					children: "Cancel"
				})]
			})
		]
	});
}
function CommercialListingForm({ initial }) {
	const profile = useHub((state) => state.profile);
	const save = useHub((state) => state.saveListing);
	const navigate = useNavigate();
	const [draft, setDraft] = (0, import_react.useState)(initial ?? blankCommercialListing(profile.displayName, profile.province));
	const [errors, setErrors] = (0, import_react.useState)({});
	const [areaText, setAreaText] = (0, import_react.useState)(initial && initial.areaSqft ? String(initial.areaSqft) : "");
	const [rentText, setRentText] = (0, import_react.useState)(initial && initial.monthlyRent ? String(initial.monthlyRent) : "");
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
			const next = {
				...draft,
				areaSqft: Number(areaText),
				monthlyRent: Number(rentText),
				ownerLabel: ownerLabel(profile.displayName),
				sample: false,
				owner: "me"
			};
			const nextErrors = validateCommercialListing(next);
			setErrors(nextErrors);
			setDraft(next);
			if (Object.keys(nextErrors).length) {
				document.querySelector("[data-invalid='true']")?.scrollIntoView({ block: "center" });
				return;
			}
			save(next);
			navigate({
				to: "/listings/$id",
				params: { id: next.id }
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorSummary, { errors }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				kicker: "Address",
				title: "Where is the property?",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressBlock, {
					draft,
					patch,
					errors
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "Premises",
				title: "Commercial details",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Commercial property category",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Area (square feet)",
						error: errors.areaSqft,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							inputMode: "numeric",
							value: areaText,
							onChange: (event) => setAreaText(event.target.value)
						})
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
				kicker: "Rent",
				title: "Price and availability",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipSelect, {
						label: "Rental term",
						value: draft.rentalTerm,
						onChange: (rentalTerm) => patch({ rentalTerm }),
						options: TERMS,
						error: errors.rentalTerm
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Monthly rent (CAD)",
						error: errors.monthlyRent,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							inputMode: "decimal",
							value: rentText,
							onChange: (event) => setRentText(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Available immediately",
						checked: draft.immediately,
						onChange: (immediately) => patch({ immediately })
					}),
					draft.immediately ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Available date",
						error: errors.availableDate,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "date",
							value: draft.availableDate,
							onChange: (event) => patch({ availableDate: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiCheck, {
						label: "Additional commercial requirements",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				kicker: "Photographs",
				title: "Up to five images",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoPicker, {
					photos: draft.photos,
					onChange: (photos) => patch({ photos }),
					error: errors.photos
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: initial ? "Save listing" : "Publish listing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					onClick: () => void navigate({ to: "/listings" }),
					children: "Cancel"
				})]
			})
		]
	});
}
function NewListing() {
	const { segment, edit } = Route$3.useSearch();
	const listings = useHub((state) => state.listings);
	const existing = edit ? listings.find((item) => item.id === edit && item.owner === "me") : void 0;
	const resolved = existing?.segment ?? segment;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: resolved === "commercial" ? "Commercial listing" : "Residential listing",
		title: existing ? "Edit listing" : "List a property",
		lede: "Photographs are optional. You can add, replace, or remove up to five, and they stay with this listing."
	}), edit && !existing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-danger",
		children: [
			"That listing is not yours to edit.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/listings",
				className: "underline",
				children: "Back to your listings"
			})
		]
	}) : resolved === "commercial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommercialListingForm, { initial: existing?.segment === "commercial" ? existing : void 0 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResidentialListingForm, { initial: existing?.segment === "residential" ? existing : void 0 })] });
}
//#endregion
export { NewListing as component };
