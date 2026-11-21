import { EMAIL, MAX_PHOTOS, PHONE, POSTAL_CODE } from "@/domain/catalog";
import type { CommercialListing, CommercialRequirement, ResidentialListing, ResidentialRequirement } from "@/domain/types";

export type Errors = Record<string, string>;

function required(errors: Errors, key: string, value: string, label: string) {
  if (!value.trim()) errors[key] = `Enter ${label}.`;
}

export function validateResidentialRequirement(draft: ResidentialRequirement): Errors {
  const errors: Errors = {};
  required(errors, "province", draft.province, "a province or territory");
  required(errors, "city", draft.city, "a city");
  required(errors, "propertyType", draft.propertyType, "a property type");
  required(errors, "condition", draft.condition, "a condition");
  required(errors, "furnished", draft.furnished, "a furnishing preference");
  required(errors, "bedrooms", draft.bedrooms, "the number of bedrooms");
  required(errors, "washrooms", draft.washrooms, "the number of washrooms");
  required(errors, "parking", draft.parking, "a parking preference");
  required(errors, "rentalTerm", draft.rentalTerm, "a rental term");
  required(errors, "budget", draft.budget, "a budget");
  required(errors, "tenantCategory", draft.tenantCategory, "a tenant category");
  required(errors, "employmentLetter", draft.employmentLetter, "an employment-letter preference");
  required(errors, "creditScore", draft.creditScore, "a credit score category");
  required(errors, "pets", draft.pets, "a pet preference");
  required(errors, "laundry", draft.laundry, "a laundry preference");
  required(errors, "garage", draft.garage, "a garage preference");
  required(errors, "contactMethod", draft.contactMethod, "a contact method");
  required(errors, "contactTime", draft.contactTime, "a preferred contact time");
  if (!draft.immediately) {
    if (draft.useRange) {
      required(errors, "moveInDate", draft.moveInDate, "a range start");
      required(errors, "moveInEnd", draft.moveInEnd, "a range end");
      if (draft.moveInDate && draft.moveInEnd && draft.moveInEnd < draft.moveInDate) {
        errors.moveInEnd = "The end date must be on or after the start date.";
      }
    } else {
      required(errors, "moveInDate", draft.moveInDate, "a preferred move-in date");
    }
  }
  return errors;
}

export function validateCommercialRequirement(draft: CommercialRequirement): Errors {
  const errors: Errors = {};
  required(errors, "province", draft.province, "a province or territory");
  required(errors, "city", draft.city, "a city");
  required(errors, "commercialType", draft.commercialType, "a commercial property type");
  required(errors, "area", draft.area, "a required area");
  required(errors, "budget", draft.budget, "a budget");
  required(errors, "rentalTerm", draft.rentalTerm, "a rental term");
  required(errors, "moveInDate", draft.moveInDate, "a preferred move-in date");
  required(errors, "tenantCategory", draft.tenantCategory, "a tenant category");
  required(errors, "contactMethod", draft.contactMethod, "a contact method");
  required(errors, "contactTime", draft.contactTime, "a preferred contact time");
  if (draft.email.trim() && !EMAIL.test(draft.email.trim())) errors.email = "Enter a valid email, or leave it blank.";
  if (draft.mobile.trim() && !PHONE.test(draft.mobile.trim())) {
    errors.mobile = "Enter a 10-digit phone number, or leave it blank.";
  }
  return errors;
}

function validateListingCore(errors: Errors, draft: { province: string; city: string; address: string; postalCode: string; condition: string; areaSqft: number; rentalTerm: string; monthlyRent: number; availableDate: string; immediately: boolean; photos: string[] }) {
  required(errors, "province", draft.province, "a province or territory");
  required(errors, "city", draft.city, "a city");
  required(errors, "address", draft.address, "the property address");
  if (draft.address.trim() && draft.address.trim().length < 5) errors.address = "Enter a fuller street address.";
  if (!draft.postalCode.trim()) errors.postalCode = "Enter a Canadian postal code.";
  else if (!POSTAL_CODE.test(draft.postalCode.trim())) errors.postalCode = "Use the format A1A 1A1.";
  required(errors, "condition", draft.condition, "the property condition");
  if (!Number.isFinite(draft.areaSqft) || draft.areaSqft < 50) errors.areaSqft = "Enter the floor area in square feet.";
  required(errors, "rentalTerm", draft.rentalTerm, "a rental term");
  if (!Number.isFinite(draft.monthlyRent) || draft.monthlyRent < 1) errors.monthlyRent = "Enter the monthly rent in Canadian dollars.";
  if (!draft.immediately && !draft.availableDate) errors.availableDate = "Enter an available date, or mark it available now.";
  if (draft.photos.length > MAX_PHOTOS) errors.photos = `A property can include at most ${MAX_PHOTOS} photographs.`;
}

export function validateResidentialListing(draft: ResidentialListing): Errors {
  const errors: Errors = {};
  validateListingCore(errors, draft);
  required(errors, "propertyType", draft.propertyType, "a property type");
  required(errors, "furnishing", draft.furnishing, "the furnishing");
  required(errors, "bedrooms", draft.bedrooms, "the number of bedrooms");
  required(errors, "washrooms", draft.washrooms, "the number of washrooms");
  required(errors, "parking", draft.parking, "the parking");
  return errors;
}

export function validateCommercialListing(draft: CommercialListing): Errors {
  const errors: Errors = {};
  validateListingCore(errors, draft);
  required(errors, "commercialType", draft.commercialType, "a commercial category");
  required(errors, "parking", draft.parking, "the parking");
  return errors;
}

export function validateInquiry(input: { name: string; email: string; topic: string; message: string; captcha: boolean }): Errors {
  const errors: Errors = {};
  required(errors, "name", input.name, "your name");
  if (input.email.trim() && !EMAIL.test(input.email.trim())) errors.email = "Enter a valid email, or leave it blank.";
  required(errors, "topic", input.topic, "a topic");
  if (input.message.trim().length < 12) errors.message = "Write at least a short question.";
  if (!input.captcha) errors.captcha = "Use the placeholder check before sending. It does not contact a CAPTCHA service.";
  return errors;
}

export function validateProfile(input: { displayName: string; mobile: string; email: string; contactMethod: string; contactTime: string }): Errors {
  const errors: Errors = {};
  if (input.email.trim() && !EMAIL.test(input.email.trim())) errors.email = "Enter a valid email, or leave it blank.";
  if (input.mobile.trim() && !PHONE.test(input.mobile.trim())) errors.mobile = "Enter a 10-digit phone number, or leave it blank.";
  required(errors, "contactMethod", input.contactMethod, "a contact method");
  required(errors, "contactTime", input.contactTime, "a preferred contact time");
  if (input.displayName.trim().length > 60) errors.displayName = "Use 60 characters or fewer.";
  return errors;
}
