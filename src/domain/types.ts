export type Role = "tenant" | "landlord";
export type Segment = "residential" | "commercial";
export type RecordStatus = "active" | "expired";
export type OwnerKind = "me" | "sample";

export interface BaseRecord {
  id: string;
  createdAt: string;
  expiresAt: string;
  status: RecordStatus;
  sample: boolean;
  owner: OwnerKind;
  ownerLabel: string;
}

export interface ResidentialRequirement extends BaseRecord {
  kind: "requirement";
  segment: "residential";
  province: string;
  city: string;
  propertyType: string;
  condition: string;
  furnished: string;
  bedrooms: string;
  washrooms: string;
  parking: string;
  rentalTerm: string;
  moveInDate: string;
  moveInEnd: string;
  useRange: boolean;
  dateFlexibility: boolean;
  immediately: boolean;
  budget: string;
  tenantCategory: string;
  additional: string[];
  additionalNotes: string;
  employmentLetter: string;
  creditScore: string;
  pets: string;
  laundry: string;
  garage: string;
  strictGarageStorage: boolean;
  contactMethod: string;
  contactTime: string;
}

export interface CommercialRequirement extends BaseRecord {
  kind: "requirement";
  segment: "commercial";
  province: string;
  city: string;
  commercialType: string;
  area: string;
  budget: string;
  rentalTerm: string;
  moveInDate: string;
  additional: string[];
  additionalNotes: string;
  tenantCategory: string;
  contactName: string;
  mobile: string;
  email: string;
  contactMethod: string;
  contactTime: string;
}

export type Requirement = ResidentialRequirement | CommercialRequirement;

export interface ResidentialListing extends BaseRecord {
  kind: "listing";
  segment: "residential";
  province: string;
  city: string;
  address: string;
  postalCode: string;
  propertyType: string;
  condition: string;
  areaSqft: number;
  furnishing: string;
  bedrooms: string;
  washrooms: string;
  parking: string;
  rentalTerm: string;
  monthlyRent: number;
  availableDate: string;
  immediately: boolean;
  amenities: string[];
  photos: string[];
}

export interface CommercialListing extends BaseRecord {
  kind: "listing";
  segment: "commercial";
  province: string;
  city: string;
  address: string;
  postalCode: string;
  commercialType: string;
  condition: string;
  areaSqft: number;
  parking: string;
  rentalTerm: string;
  monthlyRent: number;
  availableDate: string;
  immediately: boolean;
  additional: string[];
  additionalNotes: string;
  photos: string[];
}

export type Listing = ResidentialListing | CommercialListing;

export interface Profile {
  displayName: string;
  role: Role | "";
  onboarded: boolean;
  province: string;
  contactMethod: string;
  contactTime: string;
  mobile: string;
  email: string;
}

export interface Inquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface SearchFilters {
  segment: "all" | Segment;
  province: string;
  city: string;
  propertyType: string;
  commercialType: string;
  condition: string;
  budget: string;
  rentMin: string;
  rentMax: string;
  area: string;
  rentalTerm: string;
  bedrooms: string;
  availableFrom: string;
  availableTo: string;
  immediatelyOnly: boolean;
  additional: string[];
  includeExpired: boolean;
}

export const EMPTY_FILTERS: SearchFilters = {
  segment: "all",
  province: "",
  city: "",
  propertyType: "",
  commercialType: "",
  condition: "",
  budget: "",
  rentMin: "",
  rentMax: "",
  area: "",
  rentalTerm: "",
  bedrooms: "",
  availableFrom: "",
  availableTo: "",
  immediatelyOnly: false,
  additional: [],
  includeExpired: false,
};

export interface MatchAssessment {
  compatible: boolean;
  ok: boolean;
  score: number;
  reasons: string[];
  gaps: string[];
}
