import { H as POSTAL_CODE, M as EMAIL, V as PHONE } from "./router-BHHULtRV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/validate-BpUL7CDE.js
function required(errors, key, value, label) {
	if (!value.trim()) errors[key] = `Enter ${label}.`;
}
function validateResidentialRequirement(draft) {
	const errors = {};
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
			if (draft.moveInDate && draft.moveInEnd && draft.moveInEnd < draft.moveInDate) errors.moveInEnd = "The end date must be on or after the start date.";
		} else required(errors, "moveInDate", draft.moveInDate, "a preferred move-in date");
	}
	return errors;
}
function validateCommercialRequirement(draft) {
	const errors = {};
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
	if (draft.mobile.trim() && !PHONE.test(draft.mobile.trim())) errors.mobile = "Enter a 10-digit phone number, or leave it blank.";
	return errors;
}
function validateListingCore(errors, draft) {
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
	if (draft.photos.length > 5) errors.photos = `A property can include at most 5 photographs.`;
}
function validateResidentialListing(draft) {
	const errors = {};
	validateListingCore(errors, draft);
	required(errors, "propertyType", draft.propertyType, "a property type");
	required(errors, "furnishing", draft.furnishing, "the furnishing");
	required(errors, "bedrooms", draft.bedrooms, "the number of bedrooms");
	required(errors, "washrooms", draft.washrooms, "the number of washrooms");
	required(errors, "parking", draft.parking, "the parking");
	return errors;
}
function validateCommercialListing(draft) {
	const errors = {};
	validateListingCore(errors, draft);
	required(errors, "commercialType", draft.commercialType, "a commercial category");
	required(errors, "parking", draft.parking, "the parking");
	return errors;
}
function validateInquiry(input) {
	const errors = {};
	required(errors, "name", input.name, "your name");
	if (input.email.trim() && !EMAIL.test(input.email.trim())) errors.email = "Enter a valid email, or leave it blank.";
	required(errors, "topic", input.topic, "a topic");
	if (input.message.trim().length < 12) errors.message = "Write at least a short question.";
	if (!input.captcha) errors.captcha = "Use the placeholder check before sending. It does not contact a CAPTCHA service.";
	return errors;
}
function validateProfile(input) {
	const errors = {};
	if (input.email.trim() && !EMAIL.test(input.email.trim())) errors.email = "Enter a valid email, or leave it blank.";
	if (input.mobile.trim() && !PHONE.test(input.mobile.trim())) errors.mobile = "Enter a 10-digit phone number, or leave it blank.";
	required(errors, "contactMethod", input.contactMethod, "a contact method");
	required(errors, "contactTime", input.contactTime, "a preferred contact time");
	if (input.displayName.trim().length > 60) errors.displayName = "Use 60 characters or fewer.";
	return errors;
}
//#endregion
export { validateResidentialListing as a, validateProfile as i, validateCommercialRequirement as n, validateResidentialRequirement as o, validateInquiry as r, validateCommercialListing as t };
