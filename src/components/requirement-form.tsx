import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/button";
import { ChipSelect, Field, MultiCheck, ProvinceCity, Section, SelectInput, TextArea, TextInput, ToggleRow } from "@/components/fields";
import {
  COM_AREAS,
  COM_BUDGETS,
  COM_EXTRAS,
  COM_TENANT_CATEGORIES,
  COM_TYPES,
  CONDITIONS,
  CONTACT_METHODS,
  CONTACT_TIMES,
  CREDIT_SCORES,
  EMPLOYMENT_LETTERS,
  FURNISHED_PREF,
  GARAGE,
  LAUNDRY,
  PARKING,
  PETS,
  RES_AMENITIES,
  RES_BUDGETS,
  RES_TENANT_CATEGORIES,
  RES_TYPES,
  TERMS,
  BEDROOMS,
  WASHROOMS,
} from "@/domain/catalog";
import { expiryFrom } from "@/domain/expiry";
import { validateCommercialRequirement, validateResidentialRequirement, type Errors } from "@/domain/validate";
import type { CommercialRequirement, ResidentialRequirement } from "@/domain/types";
import { useHub } from "@/state/hub";

function ownerLabel(name: string) {
  return name.trim() || "You";
}

export function blankResidential(profileName: string, province: string): ResidentialRequirement {
  const now = new Date();
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
    contactTime: "",
  };
}

export function blankCommercial(profileName: string, province: string): CommercialRequirement {
  const now = new Date();
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
    contactTime: "",
  };
}

function ErrorSummary({ errors }: { errors: Errors }) {
  const count = Object.keys(errors).length;
  if (!count) return null;
  return (
    <p role="alert" className="rounded-2xl bg-danger-soft px-4 py-3 text-sm text-danger">
      Fix {count} highlighted {count === 1 ? "field" : "fields"} before saving.
    </p>
  );
}

export function ResidentialRequirementForm({ initial }: { initial?: ResidentialRequirement }) {
  const profile = useHub((state) => state.profile);
  const save = useHub((state) => state.saveRequirement);
  const navigate = useNavigate();
  const [draft, setDraft] = useState<ResidentialRequirement>(
    initial ?? blankResidential(profile.displayName, profile.province),
  );
  const [errors, setErrors] = useState<Errors>({});

  function patch(partial: Partial<ResidentialRequirement>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const nextErrors = validateResidentialRequirement(draft);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) {
          document.querySelector("[data-invalid='true']")?.scrollIntoView({ block: "center" });
          return;
        }
        const record = { ...draft, ownerLabel: ownerLabel(profile.displayName), sample: false, owner: "me" as const };
        save(record);
        void navigate({ to: "/requirements/$id", params: { id: record.id } });
      }}
    >
      <ErrorSummary errors={errors} />
      <Section kicker="Location" title="Where do you want to live?">
        <ProvinceCity
          province={draft.province}
          city={draft.city}
          onProvince={(province) => patch({ province, city: "" })}
          onCity={(city) => patch({ city })}
          provinceError={errors.province}
          cityError={errors.city}
        />
      </Section>
      <Section kicker="Home" title="The residential property">
        <Field label="Property type" error={errors.propertyType}>
          <SelectInput value={draft.propertyType} onChange={(event) => patch({ propertyType: event.target.value })}>
            <option value="">Select</option>
            {RES_TYPES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Property condition" error={errors.condition}>
          <SelectInput value={draft.condition} onChange={(event) => patch({ condition: event.target.value })}>
            <option value="">Select</option>
            {CONDITIONS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <ChipSelect label="Furnished preference" value={draft.furnished} onChange={(furnished) => patch({ furnished })} options={FURNISHED_PREF} error={errors.furnished} />
        <ChipSelect label="Bedrooms" value={draft.bedrooms} onChange={(bedrooms) => patch({ bedrooms })} options={BEDROOMS} error={errors.bedrooms} />
        <ChipSelect label="Washrooms" value={draft.washrooms} onChange={(washrooms) => patch({ washrooms })} options={WASHROOMS} error={errors.washrooms} />
        <Field label="Parking" error={errors.parking}>
          <SelectInput value={draft.parking} onChange={(event) => patch({ parking: event.target.value })}>
            <option value="">Select</option>
            {PARKING.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
      </Section>
      <Section kicker="Term and timing" title="When you want to move">
        <ChipSelect label="Rental term" value={draft.rentalTerm} onChange={(rentalTerm) => patch({ rentalTerm })} options={TERMS} error={errors.rentalTerm} />
        <ToggleRow
          label="I can move immediately"
          checked={draft.immediately}
          onChange={(immediately) => patch({ immediately })}
        />
        {draft.immediately ? null : (
          <>
            <ToggleRow
              label="Choose a calendar date range"
              checked={draft.useRange}
              onChange={(useRange) => patch({ useRange })}
              hint="Use this when any day inside a window works."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={draft.useRange ? "Range start" : "Preferred move-in date"} error={errors.moveInDate}>
                <TextInput type="date" value={draft.moveInDate} onChange={(event) => patch({ moveInDate: event.target.value })} />
              </Field>
              {draft.useRange ? (
                <Field label="Range end" error={errors.moveInEnd}>
                  <TextInput type="date" value={draft.moveInEnd} onChange={(event) => patch({ moveInEnd: event.target.value })} />
                </Field>
              ) : null}
            </div>
            <ToggleRow
              label="Date flexibility of ±15 days"
              checked={draft.dateFlexibility}
              onChange={(dateFlexibility) => patch({ dateFlexibility })}
              hint="Matches include properties free up to 15 days after your latest date. Homes already vacant are included."
            />
          </>
        )}
      </Section>
      <Section kicker="Budget and household" title="What you can pay, and who is moving">
        <Field label="Monthly budget (CAD)" error={errors.budget}>
          <SelectInput value={draft.budget} onChange={(event) => patch({ budget: event.target.value })}>
            <option value="">Select</option>
            {RES_BUDGETS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Tenant category" error={errors.tenantCategory}>
          <SelectInput value={draft.tenantCategory} onChange={(event) => patch({ tenantCategory: event.target.value })}>
            <option value="">Select</option>
            {RES_TENANT_CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Employment letter" error={errors.employmentLetter}>
          <SelectInput value={draft.employmentLetter} onChange={(event) => patch({ employmentLetter: event.target.value })}>
            <option value="">Select</option>
            {EMPLOYMENT_LETTERS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Credit score category" error={errors.creditScore} hint="Canadian score bands, about 300 to 900. This is a category, not a credit check.">
          <SelectInput value={draft.creditScore} onChange={(event) => patch({ creditScore: event.target.value })}>
            <option value="">Select</option>
            {CREDIT_SCORES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
      </Section>
      <Section kicker="Practical needs" title="Pets, laundry, and storage">
        <Field label="Pets" error={errors.pets}>
          <SelectInput value={draft.pets} onChange={(event) => patch({ pets: event.target.value })}>
            <option value="">Select</option>
            {PETS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Laundry preference" error={errors.laundry}>
          <SelectInput value={draft.laundry} onChange={(event) => patch({ laundry: event.target.value })}>
            <option value="">Select</option>
            {LAUNDRY.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Garage availability" error={errors.garage}>
          <SelectInput value={draft.garage} onChange={(event) => patch({ garage: event.target.value })}>
            <option value="">Select</option>
            {GARAGE.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <ToggleRow
          label="Strict garage storage requirement"
          checked={draft.strictGarageStorage}
          onChange={(strictGarageStorage) => patch({ strictGarageStorage })}
          hint="The garage must be usable for storage, not only as a parking space you might decline."
        />
        <MultiCheck
          label="Additional requirements"
          values={draft.additional}
          onChange={(additional) => patch({ additional })}
          options={RES_AMENITIES}
        />
        <Field label="Notes" hint="Optional. Do not include account numbers or government IDs.">
          <TextArea value={draft.additionalNotes} onChange={(event) => patch({ additionalNotes: event.target.value })} />
        </Field>
      </Section>
      <Section kicker="Contact preference" title="How a landlord may reach you">
        <p className="text-sm text-muted">
          Phone numbers and email addresses are not stored on a residential requirement. Set them in Profile if you want them kept on this device. Marketplace cards show only the method and time.
        </p>
        <Field label="Preferred contact method" error={errors.contactMethod}>
          <SelectInput value={draft.contactMethod} onChange={(event) => patch({ contactMethod: event.target.value })}>
            <option value="">Select</option>
            {CONTACT_METHODS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Preferred contact time" error={errors.contactTime}>
          <SelectInput value={draft.contactTime} onChange={(event) => patch({ contactTime: event.target.value })}>
            <option value="">Select</option>
            {CONTACT_TIMES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
      </Section>
      <div className="flex flex-wrap gap-3">
        <Button type="submit">{initial ? "Save changes" : "Save requirement"}</Button>
        <Button type="button" variant="secondary" onClick={() => void navigate({ to: "/requirements" })}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export function CommercialRequirementForm({ initial }: { initial?: CommercialRequirement }) {
  const profile = useHub((state) => state.profile);
  const save = useHub((state) => state.saveRequirement);
  const navigate = useNavigate();
  const [draft, setDraft] = useState<CommercialRequirement>(
    initial ?? blankCommercial(profile.displayName, profile.province),
  );
  const [errors, setErrors] = useState<Errors>({});

  function patch(partial: Partial<CommercialRequirement>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const nextErrors = validateCommercialRequirement(draft);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) {
          document.querySelector("[data-invalid='true']")?.scrollIntoView({ block: "center" });
          return;
        }
        const record = { ...draft, ownerLabel: ownerLabel(profile.displayName), sample: false, owner: "me" as const };
        save(record);
        void navigate({ to: "/requirements/$id", params: { id: record.id } });
      }}
    >
      <ErrorSummary errors={errors} />
      <Section kicker="Location" title="Where do you need space?">
        <ProvinceCity
          province={draft.province}
          city={draft.city}
          onProvince={(province) => patch({ province, city: "" })}
          onCity={(city) => patch({ city })}
          provinceError={errors.province}
          cityError={errors.city}
        />
      </Section>
      <Section kicker="Premises" title="The commercial requirement">
        <Field label="Commercial property type" error={errors.commercialType}>
          <SelectInput value={draft.commercialType} onChange={(event) => patch({ commercialType: event.target.value })}>
            <option value="">Select</option>
            {COM_TYPES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Required area" error={errors.area}>
          <SelectInput value={draft.area} onChange={(event) => patch({ area: event.target.value })}>
            <option value="">Select</option>
            {COM_AREAS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Monthly budget (CAD)" error={errors.budget}>
          <SelectInput value={draft.budget} onChange={(event) => patch({ budget: event.target.value })}>
            <option value="">Select</option>
            {COM_BUDGETS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <ChipSelect label="Rental term" value={draft.rentalTerm} onChange={(rentalTerm) => patch({ rentalTerm })} options={TERMS} error={errors.rentalTerm} />
        <Field label="Preferred move-in date" error={errors.moveInDate}>
          <TextInput type="date" value={draft.moveInDate} onChange={(event) => patch({ moveInDate: event.target.value })} />
        </Field>
        <Field label="Tenant category" error={errors.tenantCategory}>
          <SelectInput value={draft.tenantCategory} onChange={(event) => patch({ tenantCategory: event.target.value })}>
            <option value="">Select</option>
            {COM_TENANT_CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <MultiCheck
          label="Additional requirements"
          values={draft.additional}
          onChange={(additional) => patch({ additional })}
          options={COM_EXTRAS}
        />
        <Field label="Notes">
          <TextArea value={draft.additionalNotes} onChange={(event) => patch({ additionalNotes: event.target.value })} />
        </Field>
      </Section>
      <Section kicker="Contact information" title="How a landlord may reach you">
        <p className="text-sm text-muted">
          Name, mobile, and email are optional. If you enter them, they stay on this device with the requirement and are hidden on marketplace cards. Nothing is sent to a server.
        </p>
        <Field label="Contact name">
          <TextInput value={draft.contactName} onChange={(event) => patch({ contactName: event.target.value })} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Mobile number" error={errors.mobile}>
            <TextInput inputMode="tel" autoComplete="tel" value={draft.mobile} onChange={(event) => patch({ mobile: event.target.value })} placeholder="Optional" />
          </Field>
          <Field label="Email" error={errors.email}>
            <TextInput inputMode="email" autoComplete="email" value={draft.email} onChange={(event) => patch({ email: event.target.value })} placeholder="Optional" />
          </Field>
        </div>
        <Field label="Preferred contact method" error={errors.contactMethod}>
          <SelectInput value={draft.contactMethod} onChange={(event) => patch({ contactMethod: event.target.value })}>
            <option value="">Select</option>
            {CONTACT_METHODS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Preferred contact time" error={errors.contactTime}>
          <SelectInput value={draft.contactTime} onChange={(event) => patch({ contactTime: event.target.value })}>
            <option value="">Select</option>
            {CONTACT_TIMES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
      </Section>
      <div className="flex flex-wrap gap-3">
        <Button type="submit">{initial ? "Save changes" : "Save requirement"}</Button>
        <Button type="button" variant="secondary" onClick={() => void navigate({ to: "/requirements" })}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
