import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, S as useRouter, Y as require_react, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BHHULtRV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var PROVINCES = [
	{
		id: "AB",
		label: "Alberta"
	},
	{
		id: "BC",
		label: "British Columbia"
	},
	{
		id: "MB",
		label: "Manitoba"
	},
	{
		id: "NB",
		label: "New Brunswick"
	},
	{
		id: "NL",
		label: "Newfoundland and Labrador"
	},
	{
		id: "NT",
		label: "Northwest Territories"
	},
	{
		id: "NS",
		label: "Nova Scotia"
	},
	{
		id: "NU",
		label: "Nunavut"
	},
	{
		id: "ON",
		label: "Ontario"
	},
	{
		id: "PE",
		label: "Prince Edward Island"
	},
	{
		id: "QC",
		label: "Quebec"
	},
	{
		id: "SK",
		label: "Saskatchewan"
	},
	{
		id: "YT",
		label: "Yukon"
	}
];
var CITIES = {
	AB: [
		"Calgary",
		"Edmonton",
		"Red Deer",
		"Lethbridge",
		"St. Albert",
		"Medicine Hat",
		"Grande Prairie",
		"Airdrie",
		"Spruce Grove",
		"Fort McMurray",
		"Okotoks",
		"Chestermere",
		"Camrose",
		"Brooks"
	],
	BC: [
		"Vancouver",
		"Surrey",
		"Burnaby",
		"Richmond",
		"Kelowna",
		"Abbotsford",
		"Coquitlam",
		"Victoria",
		"Langley",
		"Nanaimo",
		"Kamloops",
		"Chilliwack",
		"Prince George",
		"Maple Ridge",
		"New Westminster",
		"North Vancouver",
		"West Vancouver",
		"Port Coquitlam",
		"Vernon",
		"Courtenay"
	],
	MB: [
		"Winnipeg",
		"Brandon",
		"Steinbach",
		"Thompson",
		"Portage la Prairie",
		"Winkler",
		"Selkirk",
		"Morden",
		"Dauphin"
	],
	NB: [
		"Moncton",
		"Saint John",
		"Fredericton",
		"Dieppe",
		"Miramichi",
		"Bathurst",
		"Edmundston",
		"Campbellton"
	],
	NL: [
		"St. John's",
		"Mount Pearl",
		"Conception Bay South",
		"Corner Brook",
		"Paradise",
		"Grand Falls-Windsor",
		"Gander",
		"Labrador City"
	],
	NT: [
		"Yellowknife",
		"Hay River",
		"Inuvik",
		"Fort Smith",
		"Behchoko"
	],
	NS: [
		"Halifax",
		"Dartmouth",
		"Sydney",
		"Truro",
		"New Glasgow",
		"Kentville",
		"Bridgewater",
		"Glace Bay",
		"Wolfville"
	],
	NU: [
		"Iqaluit",
		"Rankin Inlet",
		"Arviat",
		"Baker Lake",
		"Cambridge Bay"
	],
	ON: [
		"Toronto",
		"Ottawa",
		"Mississauga",
		"Brampton",
		"Hamilton",
		"London",
		"Markham",
		"Vaughan",
		"Kitchener",
		"Windsor",
		"Richmond Hill",
		"Oakville",
		"Burlington",
		"Oshawa",
		"Barrie",
		"St. Catharines",
		"Cambridge",
		"Kingston",
		"Guelph",
		"Thunder Bay",
		"Waterloo",
		"Sudbury",
		"Brantford",
		"Pickering",
		"Niagara Falls",
		"Whitby",
		"Milton",
		"Peterborough",
		"Sarnia",
		"Belleville"
	],
	PE: [
		"Charlottetown",
		"Summerside",
		"Stratford",
		"Cornwall",
		"Montague"
	],
	QC: [
		"Montreal",
		"Quebec City",
		"Laval",
		"Gatineau",
		"Longueuil",
		"Sherbrooke",
		"Saguenay",
		"Levis",
		"Trois-Rivieres",
		"Terrebonne",
		"Saint-Jean-sur-Richelieu",
		"Repentigny",
		"Brossard",
		"Drummondville",
		"Saint-Jerome",
		"Granby"
	],
	SK: [
		"Saskatoon",
		"Regina",
		"Prince Albert",
		"Moose Jaw",
		"Swift Current",
		"Yorkton",
		"North Battleford",
		"Estevan",
		"Warman"
	],
	YT: [
		"Whitehorse",
		"Dawson City",
		"Watson Lake",
		"Haines Junction"
	]
};
var RES_TYPES = [
	{
		id: "apartment",
		label: "Apartment"
	},
	{
		id: "condo",
		label: "Condominium"
	},
	{
		id: "detached",
		label: "Detached house"
	},
	{
		id: "semi",
		label: "Semi-detached house"
	},
	{
		id: "townhouse",
		label: "Townhouse"
	},
	{
		id: "duplex",
		label: "Duplex or triplex"
	},
	{
		id: "basement",
		label: "Basement suite"
	},
	{
		id: "bachelor",
		label: "Bachelor or studio"
	},
	{
		id: "room",
		label: "Room in a shared home"
	},
	{
		id: "loft",
		label: "Loft"
	}
];
var COM_TYPES = [
	{
		id: "office",
		label: "Office"
	},
	{
		id: "retail",
		label: "Retail"
	},
	{
		id: "restaurant",
		label: "Restaurant or food service"
	},
	{
		id: "medical",
		label: "Medical or clinic"
	},
	{
		id: "industrial",
		label: "Industrial or warehouse"
	},
	{
		id: "showroom",
		label: "Showroom"
	},
	{
		id: "mixed",
		label: "Mixed-use"
	},
	{
		id: "professional",
		label: "Professional services suite"
	},
	{
		id: "storage",
		label: "Storage"
	},
	{
		id: "flex",
		label: "Flex space"
	}
];
var CONDITIONS = [
	{
		id: "new",
		label: "Brand new"
	},
	{
		id: "excellent",
		label: "Excellent"
	},
	{
		id: "good",
		label: "Good"
	},
	{
		id: "fair",
		label: "Fair"
	},
	{
		id: "updates",
		label: "Needs updates"
	}
];
var FURNISHED = [
	{
		id: "full",
		label: "Fully furnished"
	},
	{
		id: "partial",
		label: "Partially furnished"
	},
	{
		id: "none",
		label: "Unfurnished"
	}
];
var FURNISHED_PREF = [...FURNISHED, {
	id: "any",
	label: "No preference"
}];
var BEDROOMS = [
	{
		id: "bachelor",
		label: "Bachelor"
	},
	{
		id: "1",
		label: "1"
	},
	{
		id: "2",
		label: "2"
	},
	{
		id: "3",
		label: "3"
	},
	{
		id: "4",
		label: "4"
	},
	{
		id: "5plus",
		label: "5+"
	}
];
var BED_RANK = {
	bachelor: 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5plus": 5
};
var WASHROOMS = [
	{
		id: "1",
		label: "1"
	},
	{
		id: "1.5",
		label: "1.5"
	},
	{
		id: "2",
		label: "2"
	},
	{
		id: "2.5",
		label: "2.5"
	},
	{
		id: "3",
		label: "3"
	},
	{
		id: "3.5",
		label: "3.5"
	},
	{
		id: "4plus",
		label: "4+"
	}
];
var PARKING = [
	{
		id: "none",
		label: "None"
	},
	{
		id: "one",
		label: "1 space"
	},
	{
		id: "two",
		label: "2 spaces"
	},
	{
		id: "threeplus",
		label: "3 or more spaces"
	},
	{
		id: "street",
		label: "Street permit"
	},
	{
		id: "underground",
		label: "Underground"
	},
	{
		id: "driveway",
		label: "Private driveway"
	},
	{
		id: "garage",
		label: "Garage"
	}
];
var TERMS = [
	{
		id: "mtm",
		label: "Month-to-month"
	},
	{
		id: "m6",
		label: "6 months"
	},
	{
		id: "m12",
		label: "12 months"
	},
	{
		id: "m24",
		label: "24 months"
	},
	{
		id: "flex",
		label: "Flexible"
	}
];
var RES_BUDGETS = [
	{
		id: "u1000",
		label: "Under $1,000",
		min: 0,
		max: 999
	},
	{
		id: "1000-1499",
		label: "$1,000 – $1,499",
		min: 1e3,
		max: 1499
	},
	{
		id: "1500-1999",
		label: "$1,500 – $1,999",
		min: 1500,
		max: 1999
	},
	{
		id: "2000-2499",
		label: "$2,000 – $2,499",
		min: 2e3,
		max: 2499
	},
	{
		id: "2500-2999",
		label: "$2,500 – $2,999",
		min: 2500,
		max: 2999
	},
	{
		id: "3000-3999",
		label: "$3,000 – $3,999",
		min: 3e3,
		max: 3999
	},
	{
		id: "4000-5499",
		label: "$4,000 – $5,499",
		min: 4e3,
		max: 5499
	},
	{
		id: "5500p",
		label: "$5,500 and above",
		min: 5500,
		max: Number.POSITIVE_INFINITY
	}
];
var COM_BUDGETS = [
	{
		id: "u2000",
		label: "Under $2,000",
		min: 0,
		max: 1999
	},
	{
		id: "2000-3999",
		label: "$2,000 – $3,999",
		min: 2e3,
		max: 3999
	},
	{
		id: "4000-6999",
		label: "$4,000 – $6,999",
		min: 4e3,
		max: 6999
	},
	{
		id: "7000-11999",
		label: "$7,000 – $11,999",
		min: 7e3,
		max: 11999
	},
	{
		id: "12000-19999",
		label: "$12,000 – $19,999",
		min: 12e3,
		max: 19999
	},
	{
		id: "20000p",
		label: "$20,000 and above",
		min: 2e4,
		max: Number.POSITIVE_INFINITY
	}
];
var RES_AREAS = [
	{
		id: "u600",
		label: "Under 600 sq ft",
		min: 0,
		max: 599
	},
	{
		id: "600-899",
		label: "600 – 899 sq ft",
		min: 600,
		max: 899
	},
	{
		id: "900-1199",
		label: "900 – 1,199 sq ft",
		min: 900,
		max: 1199
	},
	{
		id: "1200-1799",
		label: "1,200 – 1,799 sq ft",
		min: 1200,
		max: 1799
	},
	{
		id: "1800-2499",
		label: "1,800 – 2,499 sq ft",
		min: 1800,
		max: 2499
	},
	{
		id: "2500p",
		label: "2,500 sq ft and above",
		min: 2500,
		max: Number.POSITIVE_INFINITY
	}
];
var COM_AREAS = [
	{
		id: "u500",
		label: "Under 500 sq ft",
		min: 0,
		max: 499
	},
	{
		id: "500-999",
		label: "500 – 999 sq ft",
		min: 500,
		max: 999
	},
	{
		id: "1000-2499",
		label: "1,000 – 2,499 sq ft",
		min: 1e3,
		max: 2499
	},
	{
		id: "2500-4999",
		label: "2,500 – 4,999 sq ft",
		min: 2500,
		max: 4999
	},
	{
		id: "5000-9999",
		label: "5,000 – 9,999 sq ft",
		min: 5e3,
		max: 9999
	},
	{
		id: "10000p",
		label: "10,000 sq ft and above",
		min: 1e4,
		max: Number.POSITIVE_INFINITY
	}
];
var RES_TENANT_CATEGORIES = [
	{
		id: "individual",
		label: "Individual"
	},
	{
		id: "couple",
		label: "Couple"
	},
	{
		id: "family",
		label: "Family with children"
	},
	{
		id: "students",
		label: "Students"
	},
	{
		id: "roommates",
		label: "Roommates"
	},
	{
		id: "professional",
		label: "Working professional"
	},
	{
		id: "senior",
		label: "Senior"
	},
	{
		id: "newcomer",
		label: "Newcomer to Canada"
	}
];
var COM_TENANT_CATEGORIES = [
	{
		id: "sole",
		label: "Sole proprietor"
	},
	{
		id: "small",
		label: "Small business"
	},
	{
		id: "incorporated",
		label: "Incorporated company"
	},
	{
		id: "franchise",
		label: "Franchisee"
	},
	{
		id: "nonprofit",
		label: "Non-profit"
	},
	{
		id: "practice",
		label: "Professional practice"
	},
	{
		id: "startup",
		label: "Startup"
	}
];
var CREDIT_SCORES = [
	{
		id: "excellent",
		label: "Excellent (760–900)"
	},
	{
		id: "very-good",
		label: "Very good (725–759)"
	},
	{
		id: "good",
		label: "Good (660–724)"
	},
	{
		id: "fair",
		label: "Fair (560–659)"
	},
	{
		id: "building",
		label: "Building (300–559)"
	},
	{
		id: "none",
		label: "No Canadian credit history"
	},
	{
		id: "undisclosed",
		label: "Prefer not to disclose"
	}
];
var EMPLOYMENT_LETTERS = [
	{
		id: "will-include",
		label: "Will include an employment letter"
	},
	{
		id: "on-request",
		label: "Available on request"
	},
	{
		id: "self-employed",
		label: "Self-employed — other proof"
	},
	{
		id: "not-available",
		label: "Not available"
	}
];
var PETS = [
	{
		id: "none",
		label: "No pets"
	},
	{
		id: "cat",
		label: "Cat only"
	},
	{
		id: "dog",
		label: "Dog only"
	},
	{
		id: "both",
		label: "Cat and dog"
	},
	{
		id: "small",
		label: "Small caged pets"
	},
	{
		id: "negotiable",
		label: "Negotiable with the landlord"
	}
];
var LAUNDRY = [
	{
		id: "insuite",
		label: "In-suite washer and dryer"
	},
	{
		id: "inbuilding",
		label: "In-building laundry"
	},
	{
		id: "shared",
		label: "Shared laundry"
	},
	{
		id: "hookups",
		label: "Hookups only"
	},
	{
		id: "any",
		label: "No preference"
	}
];
var GARAGE = [
	{
		id: "not-needed",
		label: "Not needed"
	},
	{
		id: "preferred",
		label: "Preferred"
	},
	{
		id: "required",
		label: "Required"
	}
];
var CONTACT_METHODS = [
	{
		id: "phone",
		label: "Phone call"
	},
	{
		id: "text",
		label: "Text message"
	},
	{
		id: "email",
		label: "Email"
	},
	{
		id: "in-app",
		label: "In-app only"
	}
];
var CONTACT_TIMES = [
	{
		id: "morning",
		label: "Morning (8:00–12:00)"
	},
	{
		id: "afternoon",
		label: "Afternoon (12:00–17:00)"
	},
	{
		id: "evening",
		label: "Evening (17:00–20:00)"
	},
	{
		id: "weekdays",
		label: "Weekdays only"
	},
	{
		id: "weekends",
		label: "Weekends only"
	},
	{
		id: "anytime",
		label: "Anytime"
	}
];
var RES_AMENITIES = [
	{
		id: "utilities",
		label: "Utilities included"
	},
	{
		id: "heat",
		label: "Heat included"
	},
	{
		id: "hydro",
		label: "Hydro included"
	},
	{
		id: "internet",
		label: "Internet included"
	},
	{
		id: "pets",
		label: "Pet-friendly"
	},
	{
		id: "smokefree",
		label: "Smoke-free building"
	},
	{
		id: "accessible",
		label: "Barrier-free access"
	},
	{
		id: "transit",
		label: "Near public transit"
	},
	{
		id: "schools",
		label: "Near schools"
	},
	{
		id: "laundry",
		label: "In-suite laundry"
	},
	{
		id: "outdoor",
		label: "Balcony or private outdoor space"
	},
	{
		id: "ac",
		label: "Air conditioning"
	},
	{
		id: "elevator",
		label: "Elevator"
	},
	{
		id: "locker",
		label: "Storage locker"
	},
	{
		id: "quiet",
		label: "Quiet building"
	}
];
var COM_EXTRAS = [
	{
		id: "frontage",
		label: "Street frontage"
	},
	{
		id: "loading",
		label: "Loading dock"
	},
	{
		id: "grade",
		label: "Grade-level door"
	},
	{
		id: "ceilings",
		label: "High ceilings (12 ft or more)"
	},
	{
		id: "hvac",
		label: "HVAC included"
	},
	{
		id: "washroom",
		label: "Washroom in the unit"
	},
	{
		id: "reception",
		label: "Reception or waiting area"
	},
	{
		id: "zoning",
		label: "Zoning suitable for the stated use"
	},
	{
		id: "signage",
		label: "Exterior signage rights"
	},
	{
		id: "afterhours",
		label: "After-hours access"
	},
	{
		id: "accessible",
		label: "Wheelchair accessible"
	},
	{
		id: "customerparking",
		label: "Customer parking"
	},
	{
		id: "freight",
		label: "Freight elevator"
	},
	{
		id: "fibre",
		label: "Fibre internet available"
	},
	{
		id: "grease",
		label: "Grease trap for food use"
	}
];
var RES_AMENITY_IDS = new Set(RES_AMENITIES.map((item) => item.id));
var COM_EXTRA_IDS = new Set(COM_EXTRAS.map((item) => item.id));
var INQUIRY_TOPICS = [
	{
		id: "listing",
		label: "A property listing"
	},
	{
		id: "requirement",
		label: "A tenant requirement"
	},
	{
		id: "privacy",
		label: "Privacy or retention"
	},
	{
		id: "verification",
		label: "Verification"
	},
	{
		id: "other",
		label: "Something else"
	}
];
var POSTAL_CODE = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
var PHONE = /^(\+1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function optionLabel(list, id) {
	return list.find((item) => item.id === id)?.label ?? id;
}
function provinceName(id) {
	return optionLabel(PROVINCES, id);
}
function bandById(list, id) {
	return list.find((item) => item.id === id);
}
function rentInBand(rent, bandId, bands) {
	const band = bandById(bands, bandId);
	if (!band) return false;
	return rent >= band.min && rent <= band.max;
}
function valueInBand(value, band) {
	return value >= band.min && value <= band.max;
}
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function parseISODate(value) {
	const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
	if (!match) return null;
	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);
	if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
	return new Date(year, month - 1, day);
}
function formatLong(iso) {
	const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
	if (!match) return iso;
	return `${Number(match[3])} ${MONTHS[Number(match[2]) - 1]} ${match[1]}`;
}
function formatCAD(amount) {
	const rounded = Math.round(amount);
	return `${rounded < 0 ? "-" : ""}$${Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
function formatPostal(value) {
	const compact = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
	if (compact.length <= 3) return compact;
	return `${compact.slice(0, 3)} ${compact.slice(3, 6)}`;
}
function startOfToday(now = /* @__PURE__ */ new Date()) {
	return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
function endOfDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}
function plusDays(date, days) {
	const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	next.setDate(next.getDate() + days);
	return next;
}
function cityKey(value) {
	return value.trim().toLocaleLowerCase("en-CA");
}
/**
* Marketplace listings and tenant requirements expire 60 days after they are
* created. This foundation marks them unavailable. It does not delete them.
* A production backend can delete expired marketplace rows on a schedule.
* Profiles, verification records, and enquiries are outside this rule and are
* never removed without an approved retention policy.
*/
function statusFromExpiry(expiresAt, now = Date.now()) {
	const time = new Date(expiresAt).getTime();
	if (Number.isNaN(time)) return "expired";
	return time < now ? "expired" : "active";
}
function expiryFrom(created, days = 60) {
	const expires = plusDays(created, days);
	expires.setHours(12, 0, 0, 0);
	return expires.toISOString();
}
function status(expiresAt) {
	return statusFromExpiry(expiresAt);
}
var sampleOwner = {
	sample: true,
	owner: "sample",
	ownerLabel: "Sample record — not a real person"
};
var sampleListings = [
	{
		kind: "listing",
		segment: "residential",
		id: "lst-tor-condo",
		createdAt: "2026-11-02T15:00:00.000Z",
		expiresAt: "2027-01-01T15:00:00.000Z",
		status: status("2027-01-01T15:00:00.000Z"),
		...sampleOwner,
		province: "ON",
		city: "Toronto",
		address: "100 Sample Harbour Street",
		postalCode: "M5V 1A1",
		propertyType: "condo",
		condition: "excellent",
		areaSqft: 860,
		furnishing: "none",
		bedrooms: "2",
		washrooms: "1",
		parking: "underground",
		rentalTerm: "m12",
		monthlyRent: 2780,
		availableDate: "2026-11-20",
		immediately: false,
		amenities: [
			"transit",
			"ac",
			"smokefree",
			"elevator",
			"locker"
		],
		photos: []
	},
	{
		kind: "listing",
		segment: "residential",
		id: "lst-van-house",
		createdAt: "2026-10-20T15:00:00.000Z",
		expiresAt: "2026-12-19T15:00:00.000Z",
		status: status("2026-12-19T15:00:00.000Z"),
		...sampleOwner,
		province: "BC",
		city: "Vancouver",
		address: "18 Sample Cedar Lane",
		postalCode: "V6B 1A1",
		propertyType: "detached",
		condition: "good",
		areaSqft: 1680,
		furnishing: "none",
		bedrooms: "3",
		washrooms: "2",
		parking: "driveway",
		rentalTerm: "m12",
		monthlyRent: 4200,
		availableDate: "2026-12-01",
		immediately: false,
		amenities: [
			"outdoor",
			"laundry",
			"quiet",
			"schools"
		],
		photos: []
	},
	{
		kind: "listing",
		segment: "residential",
		id: "lst-cal-town",
		createdAt: "2026-11-08T15:00:00.000Z",
		expiresAt: "2027-01-07T15:00:00.000Z",
		status: status("2027-01-07T15:00:00.000Z"),
		...sampleOwner,
		province: "AB",
		city: "Calgary",
		address: "42 Sample Prairie Gate",
		postalCode: "T2P 1A1",
		propertyType: "townhouse",
		condition: "excellent",
		areaSqft: 1420,
		furnishing: "none",
		bedrooms: "3",
		washrooms: "2.5",
		parking: "garage",
		rentalTerm: "m12",
		monthlyRent: 2350,
		availableDate: "",
		immediately: true,
		amenities: [
			"laundry",
			"outdoor",
			"ac",
			"quiet"
		],
		photos: []
	},
	{
		kind: "listing",
		segment: "residential",
		id: "lst-mtl-apt",
		createdAt: "2026-11-04T15:00:00.000Z",
		expiresAt: "2027-01-03T15:00:00.000Z",
		status: status("2027-01-03T15:00:00.000Z"),
		...sampleOwner,
		province: "QC",
		city: "Montreal",
		address: "410 Sample Rue Saint-Paul",
		postalCode: "H2Y 1A1",
		propertyType: "apartment",
		condition: "good",
		areaSqft: 640,
		furnishing: "none",
		bedrooms: "1",
		washrooms: "1",
		parking: "none",
		rentalTerm: "m12",
		monthlyRent: 1750,
		availableDate: "2026-12-01",
		immediately: false,
		amenities: [
			"heat",
			"transit",
			"smokefree"
		],
		photos: []
	},
	{
		kind: "listing",
		segment: "residential",
		id: "lst-hal-apt",
		createdAt: "2026-10-28T15:00:00.000Z",
		expiresAt: "2026-12-27T15:00:00.000Z",
		status: status("2026-12-27T15:00:00.000Z"),
		...sampleOwner,
		province: "NS",
		city: "Halifax",
		address: "9 Sample Harbourview Court",
		postalCode: "B3J 1A1",
		propertyType: "apartment",
		condition: "excellent",
		areaSqft: 910,
		furnishing: "partial",
		bedrooms: "2",
		washrooms: "1",
		parking: "one",
		rentalTerm: "m12",
		monthlyRent: 2100,
		availableDate: "2026-12-10",
		immediately: false,
		amenities: [
			"laundry",
			"transit",
			"outdoor",
			"heat"
		],
		photos: []
	},
	{
		kind: "listing",
		segment: "residential",
		id: "lst-ott-semi",
		createdAt: "2026-11-11T15:00:00.000Z",
		expiresAt: "2027-01-10T15:00:00.000Z",
		status: status("2027-01-10T15:00:00.000Z"),
		...sampleOwner,
		province: "ON",
		city: "Ottawa",
		address: "77 Sample Glebe Avenue",
		postalCode: "K1P 1A1",
		propertyType: "semi",
		condition: "good",
		areaSqft: 1540,
		furnishing: "none",
		bedrooms: "3",
		washrooms: "2",
		parking: "driveway",
		rentalTerm: "m12",
		monthlyRent: 2600,
		availableDate: "2027-01-05",
		immediately: false,
		amenities: [
			"laundry",
			"schools",
			"outdoor",
			"quiet"
		],
		photos: []
	},
	{
		kind: "listing",
		segment: "residential",
		id: "lst-edm-suite",
		createdAt: "2026-11-06T15:00:00.000Z",
		expiresAt: "2027-01-05T15:00:00.000Z",
		status: status("2027-01-05T15:00:00.000Z"),
		...sampleOwner,
		province: "AB",
		city: "Edmonton",
		address: "15 Sample Jasper Close",
		postalCode: "T5J 1A1",
		propertyType: "basement",
		condition: "good",
		areaSqft: 580,
		furnishing: "full",
		bedrooms: "1",
		washrooms: "1",
		parking: "one",
		rentalTerm: "mtm",
		monthlyRent: 1250,
		availableDate: "",
		immediately: true,
		amenities: [
			"utilities",
			"laundry",
			"quiet"
		],
		photos: []
	},
	{
		kind: "listing",
		segment: "residential",
		id: "lst-wpg-room",
		createdAt: "2026-07-20T15:00:00.000Z",
		expiresAt: "2026-09-18T15:00:00.000Z",
		status: status("2026-09-18T15:00:00.000Z"),
		...sampleOwner,
		province: "MB",
		city: "Winnipeg",
		address: "6 Sample Exchange Alley",
		postalCode: "R3C 1A1",
		propertyType: "room",
		condition: "fair",
		areaSqft: 180,
		furnishing: "full",
		bedrooms: "1",
		washrooms: "1",
		parking: "street",
		rentalTerm: "mtm",
		monthlyRent: 800,
		availableDate: "2026-08-01",
		immediately: false,
		amenities: ["utilities", "transit"],
		photos: []
	},
	{
		kind: "listing",
		segment: "commercial",
		id: "lst-mtl-office",
		createdAt: "2026-11-03T15:00:00.000Z",
		expiresAt: "2027-01-02T15:00:00.000Z",
		status: status("2027-01-02T15:00:00.000Z"),
		...sampleOwner,
		province: "QC",
		city: "Montreal",
		address: "200 Sample Boulevard Robert-Bourassa",
		postalCode: "H2Y 1A1",
		commercialType: "office",
		condition: "excellent",
		areaSqft: 1800,
		parking: "underground",
		rentalTerm: "m12",
		monthlyRent: 6200,
		availableDate: "2026-11-18",
		immediately: false,
		additional: [
			"hvac",
			"washroom",
			"fibre",
			"accessible",
			"afterhours",
			"reception"
		],
		additionalNotes: "Sample office suite. Not a real vacancy.",
		photos: []
	},
	{
		kind: "listing",
		segment: "commercial",
		id: "lst-tor-retail",
		createdAt: "2026-10-30T15:00:00.000Z",
		expiresAt: "2026-12-29T15:00:00.000Z",
		status: status("2026-12-29T15:00:00.000Z"),
		...sampleOwner,
		province: "ON",
		city: "Toronto",
		address: "55 Sample Queen Street West",
		postalCode: "M5V 1A1",
		commercialType: "retail",
		condition: "good",
		areaSqft: 1200,
		parking: "none",
		rentalTerm: "m24",
		monthlyRent: 8500,
		availableDate: "",
		immediately: true,
		additional: [
			"frontage",
			"signage",
			"washroom",
			"zoning",
			"customerparking"
		],
		additionalNotes: "Sample storefront. Not available to lease.",
		photos: []
	},
	{
		kind: "listing",
		segment: "commercial",
		id: "lst-cal-industrial",
		createdAt: "2026-11-09T15:00:00.000Z",
		expiresAt: "2027-01-08T15:00:00.000Z",
		status: status("2027-01-08T15:00:00.000Z"),
		...sampleOwner,
		province: "AB",
		city: "Calgary",
		address: "900 Sample Barlow Trail",
		postalCode: "T2P 1A1",
		commercialType: "industrial",
		condition: "good",
		areaSqft: 3200,
		parking: "threeplus",
		rentalTerm: "m24",
		monthlyRent: 4500,
		availableDate: "2026-12-15",
		immediately: false,
		additional: [
			"loading",
			"grade",
			"ceilings",
			"washroom",
			"zoning"
		],
		additionalNotes: "Sample warehouse bay. Not a real unit.",
		photos: []
	},
	{
		kind: "listing",
		segment: "commercial",
		id: "lst-van-office",
		createdAt: "2026-08-10T15:00:00.000Z",
		expiresAt: "2026-10-09T15:00:00.000Z",
		status: status("2026-10-09T15:00:00.000Z"),
		...sampleOwner,
		province: "BC",
		city: "Vancouver",
		address: "333 Sample Hastings Street",
		postalCode: "V6B 1A1",
		commercialType: "office",
		condition: "fair",
		areaSqft: 2100,
		parking: "one",
		rentalTerm: "m12",
		monthlyRent: 9100,
		availableDate: "2026-09-01",
		immediately: false,
		additional: [
			"hvac",
			"washroom",
			"fibre"
		],
		additionalNotes: "Expired sample. Unavailable.",
		photos: []
	}
];
var sampleRequirements = [
	{
		kind: "requirement",
		segment: "residential",
		id: "req-tor-condo",
		createdAt: "2026-11-05T15:00:00.000Z",
		expiresAt: "2027-01-04T15:00:00.000Z",
		status: status("2027-01-04T15:00:00.000Z"),
		...sampleOwner,
		province: "ON",
		city: "Toronto",
		propertyType: "condo",
		condition: "good",
		furnished: "none",
		bedrooms: "2",
		washrooms: "1",
		parking: "one",
		rentalTerm: "m12",
		moveInDate: "2026-12-05",
		moveInEnd: "",
		useRange: false,
		dateFlexibility: true,
		immediately: false,
		budget: "2500-2999",
		tenantCategory: "professional",
		additional: [
			"transit",
			"ac",
			"smokefree"
		],
		additionalNotes: "Sample tenant. Not a real applicant.",
		employmentLetter: "on-request",
		creditScore: "good",
		pets: "none",
		laundry: "any",
		garage: "not-needed",
		strictGarageStorage: false,
		contactMethod: "email",
		contactTime: "evening"
	},
	{
		kind: "requirement",
		segment: "residential",
		id: "req-cal-town",
		createdAt: "2026-11-07T15:00:00.000Z",
		expiresAt: "2027-01-06T15:00:00.000Z",
		status: status("2027-01-06T15:00:00.000Z"),
		...sampleOwner,
		province: "AB",
		city: "Calgary",
		propertyType: "townhouse",
		condition: "good",
		furnished: "none",
		bedrooms: "3",
		washrooms: "2",
		parking: "garage",
		rentalTerm: "m12",
		moveInDate: "",
		moveInEnd: "",
		useRange: false,
		dateFlexibility: true,
		immediately: true,
		budget: "2000-2499",
		tenantCategory: "family",
		additional: [
			"laundry",
			"outdoor",
			"quiet"
		],
		additionalNotes: "Sample family requirement.",
		employmentLetter: "will-include",
		creditScore: "very-good",
		pets: "cat",
		laundry: "insuite",
		garage: "required",
		strictGarageStorage: true,
		contactMethod: "phone",
		contactTime: "afternoon"
	},
	{
		kind: "requirement",
		segment: "residential",
		id: "req-van-house",
		createdAt: "2026-10-22T15:00:00.000Z",
		expiresAt: "2026-12-21T15:00:00.000Z",
		status: status("2026-12-21T15:00:00.000Z"),
		...sampleOwner,
		province: "BC",
		city: "Vancouver",
		propertyType: "detached",
		condition: "good",
		furnished: "any",
		bedrooms: "3",
		washrooms: "2",
		parking: "driveway",
		rentalTerm: "m12",
		moveInDate: "2026-12-01",
		moveInEnd: "2026-12-20",
		useRange: true,
		dateFlexibility: true,
		immediately: false,
		budget: "4000-5499",
		tenantCategory: "family",
		additional: ["outdoor", "schools"],
		additionalNotes: "Sample requirement with a move-in range.",
		employmentLetter: "will-include",
		creditScore: "excellent",
		pets: "dog",
		laundry: "insuite",
		garage: "preferred",
		strictGarageStorage: false,
		contactMethod: "email",
		contactTime: "weekdays"
	},
	{
		kind: "requirement",
		segment: "residential",
		id: "req-hal-apt",
		createdAt: "2026-11-01T15:00:00.000Z",
		expiresAt: "2026-12-31T15:00:00.000Z",
		status: status("2026-12-31T15:00:00.000Z"),
		...sampleOwner,
		province: "NS",
		city: "Halifax",
		propertyType: "apartment",
		condition: "good",
		furnished: "any",
		bedrooms: "2",
		washrooms: "1",
		parking: "one",
		rentalTerm: "m12",
		moveInDate: "2026-12-15",
		moveInEnd: "",
		useRange: false,
		dateFlexibility: true,
		immediately: false,
		budget: "2000-2499",
		tenantCategory: "couple",
		additional: ["laundry", "transit"],
		additionalNotes: "Sample couple looking in Halifax.",
		employmentLetter: "on-request",
		creditScore: "good",
		pets: "none",
		laundry: "insuite",
		garage: "not-needed",
		strictGarageStorage: false,
		contactMethod: "text",
		contactTime: "evening"
	},
	{
		kind: "requirement",
		segment: "residential",
		id: "req-mtl-apt",
		createdAt: "2026-11-06T15:00:00.000Z",
		expiresAt: "2027-01-05T15:00:00.000Z",
		status: status("2027-01-05T15:00:00.000Z"),
		...sampleOwner,
		province: "QC",
		city: "Montreal",
		propertyType: "apartment",
		condition: "fair",
		furnished: "none",
		bedrooms: "1",
		washrooms: "1",
		parking: "none",
		rentalTerm: "flex",
		moveInDate: "2026-12-01",
		moveInEnd: "",
		useRange: false,
		dateFlexibility: false,
		immediately: false,
		budget: "1500-1999",
		tenantCategory: "newcomer",
		additional: ["heat", "transit"],
		additionalNotes: "Sample newcomer requirement.",
		employmentLetter: "not-available",
		creditScore: "none",
		pets: "none",
		laundry: "any",
		garage: "not-needed",
		strictGarageStorage: false,
		contactMethod: "email",
		contactTime: "anytime"
	},
	{
		kind: "requirement",
		segment: "residential",
		id: "req-sask-house",
		createdAt: "2026-11-12T15:00:00.000Z",
		expiresAt: "2027-01-11T15:00:00.000Z",
		status: status("2027-01-11T15:00:00.000Z"),
		...sampleOwner,
		province: "SK",
		city: "Saskatoon",
		propertyType: "detached",
		condition: "good",
		furnished: "none",
		bedrooms: "3",
		washrooms: "2",
		parking: "driveway",
		rentalTerm: "m12",
		moveInDate: "2027-01-01",
		moveInEnd: "",
		useRange: false,
		dateFlexibility: true,
		immediately: false,
		budget: "1500-1999",
		tenantCategory: "family",
		additional: ["schools", "outdoor"],
		additionalNotes: "Sample requirement with no matching property in the set.",
		employmentLetter: "will-include",
		creditScore: "fair",
		pets: "dog",
		laundry: "insuite",
		garage: "preferred",
		strictGarageStorage: false,
		contactMethod: "phone",
		contactTime: "morning"
	},
	{
		kind: "requirement",
		segment: "residential",
		id: "req-expired-tor",
		createdAt: "2026-08-01T15:00:00.000Z",
		expiresAt: "2026-09-30T15:00:00.000Z",
		status: status("2026-09-30T15:00:00.000Z"),
		...sampleOwner,
		province: "ON",
		city: "Toronto",
		propertyType: "condo",
		condition: "good",
		furnished: "none",
		bedrooms: "2",
		washrooms: "1",
		parking: "one",
		rentalTerm: "m12",
		moveInDate: "2026-12-15",
		moveInEnd: "",
		useRange: false,
		dateFlexibility: true,
		immediately: false,
		budget: "2500-2999",
		tenantCategory: "professional",
		additional: ["transit"],
		additionalNotes: "Expired sample requirement. Unavailable.",
		employmentLetter: "on-request",
		creditScore: "good",
		pets: "none",
		laundry: "any",
		garage: "not-needed",
		strictGarageStorage: false,
		contactMethod: "in-app",
		contactTime: "anytime"
	},
	{
		kind: "requirement",
		segment: "commercial",
		id: "req-mtl-office",
		createdAt: "2026-11-04T15:00:00.000Z",
		expiresAt: "2027-01-03T15:00:00.000Z",
		status: status("2027-01-03T15:00:00.000Z"),
		...sampleOwner,
		province: "QC",
		city: "Montreal",
		commercialType: "office",
		area: "1000-2499",
		budget: "4000-6999",
		rentalTerm: "m12",
		moveInDate: "2026-12-01",
		additional: [
			"hvac",
			"washroom",
			"fibre"
		],
		additionalNotes: "Sample professional practice. Not a real tenant.",
		tenantCategory: "practice",
		contactName: "",
		mobile: "",
		email: "",
		contactMethod: "email",
		contactTime: "weekdays"
	},
	{
		kind: "requirement",
		segment: "commercial",
		id: "req-tor-retail",
		createdAt: "2026-11-02T15:00:00.000Z",
		expiresAt: "2027-01-01T15:00:00.000Z",
		status: status("2027-01-01T15:00:00.000Z"),
		...sampleOwner,
		province: "ON",
		city: "Toronto",
		commercialType: "retail",
		area: "1000-2499",
		budget: "7000-11999",
		rentalTerm: "m24",
		moveInDate: "2026-12-01",
		additional: [
			"frontage",
			"signage",
			"washroom"
		],
		additionalNotes: "Sample retailer. Contact details are withheld.",
		tenantCategory: "small",
		contactName: "",
		mobile: "",
		email: "",
		contactMethod: "phone",
		contactTime: "afternoon"
	}
];
var defaultProfile = {
	displayName: "",
	role: "",
	onboarded: false,
	province: "ON",
	contactMethod: "email",
	contactTime: "anytime",
	mobile: "",
	email: ""
};
var STORAGE_KEY = "rental-hub.v1";
function seed() {
	return {
		profile: { ...defaultProfile },
		requirements: sampleRequirements.map((item) => ({
			...item,
			additional: [...item.additional]
		})),
		listings: sampleListings.map((item) => ({
			...item,
			photos: [...item.photos]
		})),
		inquiries: []
	};
}
function upsert(rows, row) {
	const index = rows.findIndex((item) => item.id === row.id);
	if (index === -1) return [row, ...rows];
	const next = rows.slice();
	next[index] = row;
	return next;
}
function persist(data) {
	if (typeof window === "undefined") return "";
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		return "";
	} catch {
		return "This device is out of space. Remove a photograph and try again.";
	}
}
function snapshot(state) {
	return {
		profile: state.profile,
		requirements: state.requirements,
		listings: state.listings,
		inquiries: state.inquiries
	};
}
var useHub = create((set, get) => ({
	...seed(),
	hydrated: false,
	storageError: "",
	hydrate: () => {
		if (get().hydrated || typeof window === "undefined") return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) {
				set({ hydrated: true });
				return;
			}
			const parsed = JSON.parse(raw);
			if (!parsed || !Array.isArray(parsed.listings) || !Array.isArray(parsed.requirements) || !parsed.profile) {
				set({ hydrated: true });
				return;
			}
			set({
				profile: {
					...defaultProfile,
					...parsed.profile
				},
				requirements: parsed.requirements,
				listings: parsed.listings,
				inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [],
				hydrated: true,
				storageError: ""
			});
		} catch {
			set({
				hydrated: true,
				storageError: "Saved data could not be read. Demonstration records are showing."
			});
		}
	},
	updateProfile: (patch) => {
		const profile = {
			...get().profile,
			...patch
		};
		set({
			profile,
			storageError: persist({
				...snapshot(get()),
				profile
			})
		});
	},
	saveRequirement: (requirement) => {
		const requirements = upsert(get().requirements, requirement);
		set({
			requirements,
			storageError: persist({
				...snapshot(get()),
				requirements
			})
		});
	},
	deleteRequirement: (id) => {
		const requirements = get().requirements.filter((item) => item.id !== id);
		set({
			requirements,
			storageError: persist({
				...snapshot(get()),
				requirements
			})
		});
	},
	renewRequirement: (id) => {
		const current = get().requirements.find((item) => item.id === id);
		if (!current || current.owner !== "me") return;
		const now = /* @__PURE__ */ new Date();
		const expires = new Date(now);
		expires.setDate(expires.getDate() + 60);
		const requirements = upsert(get().requirements, {
			...current,
			createdAt: now.toISOString(),
			expiresAt: expires.toISOString(),
			status: "active"
		});
		set({
			requirements,
			storageError: persist({
				...snapshot(get()),
				requirements
			})
		});
	},
	saveListing: (listing) => {
		const listings = upsert(get().listings, listing);
		set({
			listings,
			storageError: persist({
				...snapshot(get()),
				listings
			})
		});
	},
	deleteListing: (id) => {
		const listings = get().listings.filter((item) => item.id !== id);
		set({
			listings,
			storageError: persist({
				...snapshot(get()),
				listings
			})
		});
	},
	renewListing: (id) => {
		const current = get().listings.find((item) => item.id === id);
		if (!current || current.owner !== "me") return;
		const now = /* @__PURE__ */ new Date();
		const expires = new Date(now);
		expires.setDate(expires.getDate() + 60);
		const listings = upsert(get().listings, {
			...current,
			createdAt: now.toISOString(),
			expiresAt: expires.toISOString(),
			status: "active"
		});
		set({
			listings,
			storageError: persist({
				...snapshot(get()),
				listings
			})
		});
	},
	addInquiry: (inquiry) => {
		const inquiries = [inquiry, ...get().inquiries];
		set({
			inquiries,
			storageError: persist({
				...snapshot(get()),
				inquiries
			})
		});
	},
	deleteInquiry: (id) => {
		const inquiries = get().inquiries.filter((item) => item.id !== id);
		set({
			inquiries,
			storageError: persist({
				...snapshot(get()),
				inquiries
			})
		});
	},
	resetRecords: () => {
		const next = {
			...snapshot(get()),
			requirements: seed().requirements,
			listings: seed().listings,
			inquiries: []
		};
		const error = persist(next);
		set({
			...next,
			storageError: error
		});
	},
	eraseDevice: () => {
		const next = seed();
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
		set({
			...next,
			hydrated: true,
			storageError: ""
		});
	}
}));
var styles_default = "/assets/styles-CMrP1yj8.css";
var APP_NAME = "Rental Hub";
function Hydrator() {
	const hydrate = useHub((state) => state.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	return null;
}
var Route$15 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Rental Hub is a Canadian marketplace for residential and commercial rentals, in Canadian dollars."
			},
			{
				name: "theme-color",
				content: "#0c2340"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600&family=Outfit:wght@400;500;600&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hydrator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$14 = () => import("./routes-DMdZd-_M.mjs");
var Route$14 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./home-B2ab443c.mjs");
var Route$13 = createFileRoute("/home")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./legal-Bm5ryCGG.mjs");
var Route$12 = createFileRoute("/legal")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./matches-B7fTcT3V.mjs");
var Route$11 = createFileRoute("/matches")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./profile-BYoWSuCS.mjs");
var Route$10 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./role-Be1xtF8I.mjs");
var Route$9 = createFileRoute("/role")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./search-DDTksxkw.mjs");
var Route$8 = createFileRoute("/search")({
	validateSearch: (search) => ({
		segment: search.segment === "residential" || search.segment === "commercial" ? search.segment : "all",
		view: search.view === "tenants" ? "tenants" : "properties"
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./segment-DyoozB1R.mjs");
var Route$7 = createFileRoute("/segment")({
	validateSearch: (search) => ({ intent: search.intent === "listing" || search.intent === "search" ? search.intent : "requirement" }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./welcome-9uQgTaEH.mjs");
var Route$6 = createFileRoute("/welcome")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./listings-dhAtnww2.mjs");
var Route$5 = createFileRoute("/listings/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("../_id-C2QJwZh1.mjs");
var Route$4 = createFileRoute("/listings/$id")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./new-DgjwWxcc.mjs");
var Route$3 = createFileRoute("/listings/new")({
	validateSearch: (search) => ({
		segment: search.segment === "commercial" ? "commercial" : "residential",
		edit: typeof search.edit === "string" ? search.edit : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./requirements-CGFENBoU.mjs");
var Route$2 = createFileRoute("/requirements/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_id-C0W0rkwH.mjs");
var Route$1 = createFileRoute("/requirements/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./new-Ckt2kxJ7.mjs");
var Route = createFileRoute("/requirements/new")({
	validateSearch: (search) => ({
		segment: search.segment === "commercial" ? "commercial" : "residential",
		edit: typeof search.edit === "string" ? search.edit : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var HomeRoute = Route$13.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => Route$15
});
var LegalRoute = Route$12.update({
	id: "/legal",
	path: "/legal",
	getParentRoute: () => Route$15
});
var MatchesRoute = Route$11.update({
	id: "/matches",
	path: "/matches",
	getParentRoute: () => Route$15
});
var ProfileRoute = Route$10.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$15
});
var RoleRoute = Route$9.update({
	id: "/role",
	path: "/role",
	getParentRoute: () => Route$15
});
var SearchRoute = Route$8.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$15
});
var SegmentRoute = Route$7.update({
	id: "/segment",
	path: "/segment",
	getParentRoute: () => Route$15
});
var WelcomeRoute = Route$6.update({
	id: "/welcome",
	path: "/welcome",
	getParentRoute: () => Route$15
});
var ListingsIndexRoute = Route$5.update({
	id: "/listings/",
	path: "/listings/",
	getParentRoute: () => Route$15
});
var ListingsIdRoute = Route$4.update({
	id: "/listings/$id",
	path: "/listings/$id",
	getParentRoute: () => Route$15
});
var ListingsNewRoute = Route$3.update({
	id: "/listings/new",
	path: "/listings/new",
	getParentRoute: () => Route$15
});
var RequirementsIndexRoute = Route$2.update({
	id: "/requirements/",
	path: "/requirements/",
	getParentRoute: () => Route$15
});
var rootRouteChildren = {
	IndexRoute,
	HomeRoute,
	LegalRoute,
	MatchesRoute,
	ProfileRoute,
	RoleRoute,
	SearchRoute,
	SegmentRoute,
	WelcomeRoute,
	ListingsIdRoute,
	ListingsNewRoute,
	RequirementsIdRoute: Route$1.update({
		id: "/requirements/$id",
		path: "/requirements/$id",
		getParentRoute: () => Route$15
	}),
	RequirementsNewRoute: Route.update({
		id: "/requirements/new",
		path: "/requirements/new",
		getParentRoute: () => Route$15
	}),
	ListingsIndexRoute,
	RequirementsIndexRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { optionLabel as $, CONTACT_TIMES as A, PETS as B, COM_BUDGETS as C, COM_TYPES as D, COM_TENANT_CATEGORIES as E, FURNISHED_PREF as F, RES_AMENITY_IDS as G, POSTAL_CODE as H, GARAGE as I, RES_TENANT_CATEGORIES as J, RES_AREAS as K, INQUIRY_TOPICS as L, EMAIL as M, EMPLOYMENT_LETTERS as N, CONDITIONS as O, FURNISHED as P, bandById as Q, LAUNDRY as R, COM_AREAS as S, COM_EXTRA_IDS as T, PROVINCES as U, PHONE as V, RES_AMENITIES as W, TERMS as X, RES_TYPES as Y, WASHROOMS as Z, plusDays as _, Route$4 as a, BED_RANK as b, useHub as c, cityKey as d, provinceName as et, endOfDay as f, parseISODate as g, formatPostal as h, Route$3 as i, CREDIT_SCORES as j, CONTACT_METHODS as k, expiryFrom as l, formatLong as m, Route as n, valueInBand as nt, Route$7 as o, formatCAD as p, RES_BUDGETS as q, Route$1 as r, Route$8 as s, router_exports as t, rentInBand as tt, statusFromExpiry as u, startOfToday as v, COM_EXTRAS as w, CITIES as x, BEDROOMS as y, PARKING as z };
