export interface Option {
  id: string;
  label: string;
}

export interface Band extends Option {
  min: number;
  max: number;
}

export const EXPIRY_DAYS = 60;

export const PROVINCES: Option[] = [
  { id: "AB", label: "Alberta" },
  { id: "BC", label: "British Columbia" },
  { id: "MB", label: "Manitoba" },
  { id: "NB", label: "New Brunswick" },
  { id: "NL", label: "Newfoundland and Labrador" },
  { id: "NT", label: "Northwest Territories" },
  { id: "NS", label: "Nova Scotia" },
  { id: "NU", label: "Nunavut" },
  { id: "ON", label: "Ontario" },
  { id: "PE", label: "Prince Edward Island" },
  { id: "QC", label: "Quebec" },
  { id: "SK", label: "Saskatchewan" },
  { id: "YT", label: "Yukon" },
];

export const CITIES: Record<string, string[]> = {
  AB: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat", "Grande Prairie", "Airdrie", "Spruce Grove", "Fort McMurray", "Okotoks", "Chestermere", "Camrose", "Brooks"],
  BC: ["Vancouver", "Surrey", "Burnaby", "Richmond", "Kelowna", "Abbotsford", "Coquitlam", "Victoria", "Langley", "Nanaimo", "Kamloops", "Chilliwack", "Prince George", "Maple Ridge", "New Westminster", "North Vancouver", "West Vancouver", "Port Coquitlam", "Vernon", "Courtenay"],
  MB: ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie", "Winkler", "Selkirk", "Morden", "Dauphin"],
  NB: ["Moncton", "Saint John", "Fredericton", "Dieppe", "Miramichi", "Bathurst", "Edmundston", "Campbellton"],
  NL: ["St. John's", "Mount Pearl", "Conception Bay South", "Corner Brook", "Paradise", "Grand Falls-Windsor", "Gander", "Labrador City"],
  NT: ["Yellowknife", "Hay River", "Inuvik", "Fort Smith", "Behchoko"],
  NS: ["Halifax", "Dartmouth", "Sydney", "Truro", "New Glasgow", "Kentville", "Bridgewater", "Glace Bay", "Wolfville"],
  NU: ["Iqaluit", "Rankin Inlet", "Arviat", "Baker Lake", "Cambridge Bay"],
  ON: ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham", "Vaughan", "Kitchener", "Windsor", "Richmond Hill", "Oakville", "Burlington", "Oshawa", "Barrie", "St. Catharines", "Cambridge", "Kingston", "Guelph", "Thunder Bay", "Waterloo", "Sudbury", "Brantford", "Pickering", "Niagara Falls", "Whitby", "Milton", "Peterborough", "Sarnia", "Belleville"],
  PE: ["Charlottetown", "Summerside", "Stratford", "Cornwall", "Montague"],
  QC: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Levis", "Trois-Rivieres", "Terrebonne", "Saint-Jean-sur-Richelieu", "Repentigny", "Brossard", "Drummondville", "Saint-Jerome", "Granby"],
  SK: ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Swift Current", "Yorkton", "North Battleford", "Estevan", "Warman"],
  YT: ["Whitehorse", "Dawson City", "Watson Lake", "Haines Junction"],
};

export const RES_TYPES: Option[] = [
  { id: "apartment", label: "Apartment" },
  { id: "condo", label: "Condominium" },
  { id: "detached", label: "Detached house" },
  { id: "semi", label: "Semi-detached house" },
  { id: "townhouse", label: "Townhouse" },
  { id: "duplex", label: "Duplex or triplex" },
  { id: "basement", label: "Basement suite" },
  { id: "bachelor", label: "Bachelor or studio" },
  { id: "room", label: "Room in a shared home" },
  { id: "loft", label: "Loft" },
];

export const COM_TYPES: Option[] = [
  { id: "office", label: "Office" },
  { id: "retail", label: "Retail" },
  { id: "restaurant", label: "Restaurant or food service" },
  { id: "medical", label: "Medical or clinic" },
  { id: "industrial", label: "Industrial or warehouse" },
  { id: "showroom", label: "Showroom" },
  { id: "mixed", label: "Mixed-use" },
  { id: "professional", label: "Professional services suite" },
  { id: "storage", label: "Storage" },
  { id: "flex", label: "Flex space" },
];

export const CONDITIONS: Option[] = [
  { id: "new", label: "Brand new" },
  { id: "excellent", label: "Excellent" },
  { id: "good", label: "Good" },
  { id: "fair", label: "Fair" },
  { id: "updates", label: "Needs updates" },
];

export const FURNISHED: Option[] = [
  { id: "full", label: "Fully furnished" },
  { id: "partial", label: "Partially furnished" },
  { id: "none", label: "Unfurnished" },
];

export const FURNISHED_PREF: Option[] = [...FURNISHED, { id: "any", label: "No preference" }];

export const BEDROOMS: Option[] = [
  { id: "bachelor", label: "Bachelor" },
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
  { id: "4", label: "4" },
  { id: "5plus", label: "5+" },
];

export const BED_RANK: Record<string, number> = {
  bachelor: 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5plus": 5,
};

export const WASHROOMS: Option[] = [
  { id: "1", label: "1" },
  { id: "1.5", label: "1.5" },
  { id: "2", label: "2" },
  { id: "2.5", label: "2.5" },
  { id: "3", label: "3" },
  { id: "3.5", label: "3.5" },
  { id: "4plus", label: "4+" },
];

export const PARKING: Option[] = [
  { id: "none", label: "None" },
  { id: "one", label: "1 space" },
  { id: "two", label: "2 spaces" },
  { id: "threeplus", label: "3 or more spaces" },
  { id: "street", label: "Street permit" },
  { id: "underground", label: "Underground" },
  { id: "driveway", label: "Private driveway" },
  { id: "garage", label: "Garage" },
];

export const TERMS: Option[] = [
  { id: "mtm", label: "Month-to-month" },
  { id: "m6", label: "6 months" },
  { id: "m12", label: "12 months" },
  { id: "m24", label: "24 months" },
  { id: "flex", label: "Flexible" },
];

export const RES_BUDGETS: Band[] = [
  { id: "u1000", label: "Under $1,000", min: 0, max: 999 },
  { id: "1000-1499", label: "$1,000 – $1,499", min: 1000, max: 1499 },
  { id: "1500-1999", label: "$1,500 – $1,999", min: 1500, max: 1999 },
  { id: "2000-2499", label: "$2,000 – $2,499", min: 2000, max: 2499 },
  { id: "2500-2999", label: "$2,500 – $2,999", min: 2500, max: 2999 },
  { id: "3000-3999", label: "$3,000 – $3,999", min: 3000, max: 3999 },
  { id: "4000-5499", label: "$4,000 – $5,499", min: 4000, max: 5499 },
  { id: "5500p", label: "$5,500 and above", min: 5500, max: Number.POSITIVE_INFINITY },
];

export const COM_BUDGETS: Band[] = [
  { id: "u2000", label: "Under $2,000", min: 0, max: 1999 },
  { id: "2000-3999", label: "$2,000 – $3,999", min: 2000, max: 3999 },
  { id: "4000-6999", label: "$4,000 – $6,999", min: 4000, max: 6999 },
  { id: "7000-11999", label: "$7,000 – $11,999", min: 7000, max: 11999 },
  { id: "12000-19999", label: "$12,000 – $19,999", min: 12000, max: 19999 },
  { id: "20000p", label: "$20,000 and above", min: 20000, max: Number.POSITIVE_INFINITY },
];

export const RES_AREAS: Band[] = [
  { id: "u600", label: "Under 600 sq ft", min: 0, max: 599 },
  { id: "600-899", label: "600 – 899 sq ft", min: 600, max: 899 },
  { id: "900-1199", label: "900 – 1,199 sq ft", min: 900, max: 1199 },
  { id: "1200-1799", label: "1,200 – 1,799 sq ft", min: 1200, max: 1799 },
  { id: "1800-2499", label: "1,800 – 2,499 sq ft", min: 1800, max: 2499 },
  { id: "2500p", label: "2,500 sq ft and above", min: 2500, max: Number.POSITIVE_INFINITY },
];

export const COM_AREAS: Band[] = [
  { id: "u500", label: "Under 500 sq ft", min: 0, max: 499 },
  { id: "500-999", label: "500 – 999 sq ft", min: 500, max: 999 },
  { id: "1000-2499", label: "1,000 – 2,499 sq ft", min: 1000, max: 2499 },
  { id: "2500-4999", label: "2,500 – 4,999 sq ft", min: 2500, max: 4999 },
  { id: "5000-9999", label: "5,000 – 9,999 sq ft", min: 5000, max: 9999 },
  { id: "10000p", label: "10,000 sq ft and above", min: 10000, max: Number.POSITIVE_INFINITY },
];

export const RES_TENANT_CATEGORIES: Option[] = [
  { id: "individual", label: "Individual" },
  { id: "couple", label: "Couple" },
  { id: "family", label: "Family with children" },
  { id: "students", label: "Students" },
  { id: "roommates", label: "Roommates" },
  { id: "professional", label: "Working professional" },
  { id: "senior", label: "Senior" },
  { id: "newcomer", label: "Newcomer to Canada" },
];

export const COM_TENANT_CATEGORIES: Option[] = [
  { id: "sole", label: "Sole proprietor" },
  { id: "small", label: "Small business" },
  { id: "incorporated", label: "Incorporated company" },
  { id: "franchise", label: "Franchisee" },
  { id: "nonprofit", label: "Non-profit" },
  { id: "practice", label: "Professional practice" },
  { id: "startup", label: "Startup" },
];

export const CREDIT_SCORES: Option[] = [
  { id: "excellent", label: "Excellent (760–900)" },
  { id: "very-good", label: "Very good (725–759)" },
  { id: "good", label: "Good (660–724)" },
  { id: "fair", label: "Fair (560–659)" },
  { id: "building", label: "Building (300–559)" },
  { id: "none", label: "No Canadian credit history" },
  { id: "undisclosed", label: "Prefer not to disclose" },
];

export const EMPLOYMENT_LETTERS: Option[] = [
  { id: "will-include", label: "Will include an employment letter" },
  { id: "on-request", label: "Available on request" },
  { id: "self-employed", label: "Self-employed — other proof" },
  { id: "not-available", label: "Not available" },
];

export const PETS: Option[] = [
  { id: "none", label: "No pets" },
  { id: "cat", label: "Cat only" },
  { id: "dog", label: "Dog only" },
  { id: "both", label: "Cat and dog" },
  { id: "small", label: "Small caged pets" },
  { id: "negotiable", label: "Negotiable with the landlord" },
];

export const LAUNDRY: Option[] = [
  { id: "insuite", label: "In-suite washer and dryer" },
  { id: "inbuilding", label: "In-building laundry" },
  { id: "shared", label: "Shared laundry" },
  { id: "hookups", label: "Hookups only" },
  { id: "any", label: "No preference" },
];

export const GARAGE: Option[] = [
  { id: "not-needed", label: "Not needed" },
  { id: "preferred", label: "Preferred" },
  { id: "required", label: "Required" },
];

export const CONTACT_METHODS: Option[] = [
  { id: "phone", label: "Phone call" },
  { id: "text", label: "Text message" },
  { id: "email", label: "Email" },
  { id: "in-app", label: "In-app only" },
];

export const CONTACT_TIMES: Option[] = [
  { id: "morning", label: "Morning (8:00–12:00)" },
  { id: "afternoon", label: "Afternoon (12:00–17:00)" },
  { id: "evening", label: "Evening (17:00–20:00)" },
  { id: "weekdays", label: "Weekdays only" },
  { id: "weekends", label: "Weekends only" },
  { id: "anytime", label: "Anytime" },
];

export const RES_AMENITIES: Option[] = [
  { id: "utilities", label: "Utilities included" },
  { id: "heat", label: "Heat included" },
  { id: "hydro", label: "Hydro included" },
  { id: "internet", label: "Internet included" },
  { id: "pets", label: "Pet-friendly" },
  { id: "smokefree", label: "Smoke-free building" },
  { id: "accessible", label: "Barrier-free access" },
  { id: "transit", label: "Near public transit" },
  { id: "schools", label: "Near schools" },
  { id: "laundry", label: "In-suite laundry" },
  { id: "outdoor", label: "Balcony or private outdoor space" },
  { id: "ac", label: "Air conditioning" },
  { id: "elevator", label: "Elevator" },
  { id: "locker", label: "Storage locker" },
  { id: "quiet", label: "Quiet building" },
];

export const COM_EXTRAS: Option[] = [
  { id: "frontage", label: "Street frontage" },
  { id: "loading", label: "Loading dock" },
  { id: "grade", label: "Grade-level door" },
  { id: "ceilings", label: "High ceilings (12 ft or more)" },
  { id: "hvac", label: "HVAC included" },
  { id: "washroom", label: "Washroom in the unit" },
  { id: "reception", label: "Reception or waiting area" },
  { id: "zoning", label: "Zoning suitable for the stated use" },
  { id: "signage", label: "Exterior signage rights" },
  { id: "afterhours", label: "After-hours access" },
  { id: "accessible", label: "Wheelchair accessible" },
  { id: "customerparking", label: "Customer parking" },
  { id: "freight", label: "Freight elevator" },
  { id: "fibre", label: "Fibre internet available" },
  { id: "grease", label: "Grease trap for food use" },
];

export const RES_AMENITY_IDS = new Set(RES_AMENITIES.map((item) => item.id));
export const COM_EXTRA_IDS = new Set(COM_EXTRAS.map((item) => item.id));

export const INQUIRY_TOPICS: Option[] = [
  { id: "listing", label: "A property listing" },
  { id: "requirement", label: "A tenant requirement" },
  { id: "privacy", label: "Privacy or retention" },
  { id: "verification", label: "Verification" },
  { id: "other", label: "Something else" },
];

export const POSTAL_CODE = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

export const PHONE = /^(\+1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function optionLabel(list: Option[], id: string): string {
  return list.find((item) => item.id === id)?.label ?? id;
}

export function provinceName(id: string): string {
  return optionLabel(PROVINCES, id);
}

export function bandById(list: Band[], id: string): Band | undefined {
  return list.find((item) => item.id === id);
}

export function rentInBand(rent: number, bandId: string, bands: Band[]): boolean {
  const band = bandById(bands, bandId);
  if (!band) return false;
  return rent >= band.min && rent <= band.max;
}

export function valueInBand(value: number, band: Band): boolean {
  return value >= band.min && value <= band.max;
}

export const MAX_PHOTOS = 5;
