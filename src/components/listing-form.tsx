import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/button";
import { ChipSelect, Field, MultiCheck, ProvinceCity, Section, SelectInput, TextArea, TextInput, ToggleRow } from "@/components/fields";
import { PhotoPicker } from "@/components/photo-picker";
import {
  BEDROOMS,
  COM_EXTRAS,
  COM_TYPES,
  CONDITIONS,
  FURNISHED,
  PARKING,
  RES_AMENITIES,
  RES_TYPES,
  TERMS,
  WASHROOMS,
} from "@/domain/catalog";
import { expiryFrom } from "@/domain/expiry";
import { formatPostal } from "@/domain/format";
import { validateCommercialListing, validateResidentialListing, type Errors } from "@/domain/validate";
import type { CommercialListing, ResidentialListing } from "@/domain/types";
import { useHub } from "@/state/hub";

function ownerLabel(name: string) {
  return name.trim() || "You";
}

export function blankResidentialListing(profileName: string, province: string): ResidentialListing {
  const now = new Date();
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
    photos: [],
  };
}

export function blankCommercialListing(profileName: string, province: string): CommercialListing {
  const now = new Date();
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
    photos: [],
  };
}

function ErrorSummary({ errors }: { errors: Errors }) {
  const count = Object.keys(errors).length;
  if (!count) return null;
  return (
    <p role="alert" className="rounded-2xl bg-danger-soft px-4 py-3 text-sm text-danger">
      Fix {count} highlighted {count === 1 ? "field" : "fields"} before publishing.
    </p>
  );
}

function AddressBlock({
  draft,
  patch,
  errors,
}: {
  draft: { province: string; city: string; address: string; postalCode: string };
  patch: (partial: { province?: string; city?: string; address?: string; postalCode?: string }) => void;
  errors: Errors;
}) {
  return (
    <>
      <ProvinceCity
        province={draft.province}
        city={draft.city}
        onProvince={(province) => patch({ province, city: "" })}
        onCity={(city) => patch({ city })}
        provinceError={errors.province}
        cityError={errors.city}
      />
      <Field label="Property address" error={errors.address}>
        <TextInput value={draft.address} onChange={(event) => patch({ address: event.target.value })} autoComplete="street-address" />
      </Field>
      <Field label="Canadian postal code" error={errors.postalCode} hint="Format A1A 1A1.">
        <TextInput
          value={draft.postalCode}
          autoCapitalize="characters"
          onChange={(event) => patch({ postalCode: formatPostal(event.target.value) })}
          placeholder="A1A 1A1"
        />
      </Field>
    </>
  );
}

export function ResidentialListingForm({ initial }: { initial?: ResidentialListing }) {
  const profile = useHub((state) => state.profile);
  const save = useHub((state) => state.saveListing);
  const navigate = useNavigate();
  const [draft, setDraft] = useState<ResidentialListing>(
    initial ?? blankResidentialListing(profile.displayName, profile.province),
  );
  const [errors, setErrors] = useState<Errors>({});
  const [areaText, setAreaText] = useState(initial && initial.areaSqft ? String(initial.areaSqft) : "");
  const [rentText, setRentText] = useState(initial && initial.monthlyRent ? String(initial.monthlyRent) : "");

  function patch(partial: Partial<ResidentialListing>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const next = {
          ...draft,
          areaSqft: Number(areaText),
          monthlyRent: Number(rentText),
          ownerLabel: ownerLabel(profile.displayName),
          sample: false,
          owner: "me" as const,
        };
        const nextErrors = validateResidentialListing(next);
        setErrors(nextErrors);
        setDraft(next);
        if (Object.keys(nextErrors).length) {
          document.querySelector("[data-invalid='true']")?.scrollIntoView({ block: "center" });
          return;
        }
        save(next);
        void navigate({ to: "/listings/$id", params: { id: next.id } });
      }}
    >
      <ErrorSummary errors={errors} />
      <Section kicker="Address" title="Where is the home?">
        <AddressBlock draft={draft} patch={patch} errors={errors} />
      </Section>
      <Section kicker="Home" title="Residential details">
        <Field label="Property type" error={errors.propertyType}>
          <SelectInput value={draft.propertyType} onChange={(event) => patch({ propertyType: event.target.value })}>
            <option value="">Select</option>
            {RES_TYPES.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Property condition" error={errors.condition}>
          <SelectInput value={draft.condition} onChange={(event) => patch({ condition: event.target.value })}>
            <option value="">Select</option>
            {CONDITIONS.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Area (square feet)" error={errors.areaSqft}>
          <TextInput inputMode="numeric" value={areaText} onChange={(event) => setAreaText(event.target.value)} />
        </Field>
        <ChipSelect label="Furnishing" value={draft.furnishing} onChange={(furnishing) => patch({ furnishing })} options={FURNISHED} error={errors.furnishing} />
        <ChipSelect label="Bedrooms" value={draft.bedrooms} onChange={(bedrooms) => patch({ bedrooms })} options={BEDROOMS} error={errors.bedrooms} />
        <ChipSelect label="Washrooms" value={draft.washrooms} onChange={(washrooms) => patch({ washrooms })} options={WASHROOMS} error={errors.washrooms} />
        <Field label="Parking availability" error={errors.parking}>
          <SelectInput value={draft.parking} onChange={(event) => patch({ parking: event.target.value })}>
            <option value="">Select</option>
            {PARKING.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </SelectInput>
        </Field>
      </Section>
      <Section kicker="Rent" title="Term, price, and availability">
        <ChipSelect label="Rental term" value={draft.rentalTerm} onChange={(rentalTerm) => patch({ rentalTerm })} options={TERMS} error={errors.rentalTerm} />
        <Field label="Monthly rent (CAD)" error={errors.monthlyRent}>
          <TextInput inputMode="decimal" value={rentText} onChange={(event) => setRentText(event.target.value)} />
        </Field>
        <ToggleRow label="Available immediately" checked={draft.immediately} onChange={(immediately) => patch({ immediately })} />
        {draft.immediately ? null : (
          <Field label="Property available date" error={errors.availableDate}>
            <TextInput type="date" value={draft.availableDate} onChange={(event) => patch({ availableDate: event.target.value })} />
          </Field>
        )}
        <MultiCheck
          label="Amenities for matching"
          hint="Optional. Tenants can filter on these. They are not required to publish."
          values={draft.amenities}
          onChange={(amenities) => patch({ amenities })}
          options={RES_AMENITIES}
        />
      </Section>
      <Section kicker="Photographs" title="Up to five images">
        <PhotoPicker photos={draft.photos} onChange={(photos) => patch({ photos })} error={errors.photos} />
      </Section>
      <div className="flex flex-wrap gap-3">
        <Button type="submit">{initial ? "Save listing" : "Publish listing"}</Button>
        <Button type="button" variant="secondary" onClick={() => void navigate({ to: "/listings" })}>Cancel</Button>
      </div>
    </form>
  );
}

export function CommercialListingForm({ initial }: { initial?: CommercialListing }) {
  const profile = useHub((state) => state.profile);
  const save = useHub((state) => state.saveListing);
  const navigate = useNavigate();
  const [draft, setDraft] = useState<CommercialListing>(
    initial ?? blankCommercialListing(profile.displayName, profile.province),
  );
  const [errors, setErrors] = useState<Errors>({});
  const [areaText, setAreaText] = useState(initial && initial.areaSqft ? String(initial.areaSqft) : "");
  const [rentText, setRentText] = useState(initial && initial.monthlyRent ? String(initial.monthlyRent) : "");

  function patch(partial: Partial<CommercialListing>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const next = {
          ...draft,
          areaSqft: Number(areaText),
          monthlyRent: Number(rentText),
          ownerLabel: ownerLabel(profile.displayName),
          sample: false,
          owner: "me" as const,
        };
        const nextErrors = validateCommercialListing(next);
        setErrors(nextErrors);
        setDraft(next);
        if (Object.keys(nextErrors).length) {
          document.querySelector("[data-invalid='true']")?.scrollIntoView({ block: "center" });
          return;
        }
        save(next);
        void navigate({ to: "/listings/$id", params: { id: next.id } });
      }}
    >
      <ErrorSummary errors={errors} />
      <Section kicker="Address" title="Where is the property?">
        <AddressBlock draft={draft} patch={patch} errors={errors} />
      </Section>
      <Section kicker="Premises" title="Commercial details">
        <Field label="Commercial property category" error={errors.commercialType}>
          <SelectInput value={draft.commercialType} onChange={(event) => patch({ commercialType: event.target.value })}>
            <option value="">Select</option>
            {COM_TYPES.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Property condition" error={errors.condition}>
          <SelectInput value={draft.condition} onChange={(event) => patch({ condition: event.target.value })}>
            <option value="">Select</option>
            {CONDITIONS.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Area (square feet)" error={errors.areaSqft}>
          <TextInput inputMode="numeric" value={areaText} onChange={(event) => setAreaText(event.target.value)} />
        </Field>
        <Field label="Parking" error={errors.parking}>
          <SelectInput value={draft.parking} onChange={(event) => patch({ parking: event.target.value })}>
            <option value="">Select</option>
            {PARKING.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </SelectInput>
        </Field>
      </Section>
      <Section kicker="Rent" title="Price and availability">
        <ChipSelect label="Rental term" value={draft.rentalTerm} onChange={(rentalTerm) => patch({ rentalTerm })} options={TERMS} error={errors.rentalTerm} />
        <Field label="Monthly rent (CAD)" error={errors.monthlyRent}>
          <TextInput inputMode="decimal" value={rentText} onChange={(event) => setRentText(event.target.value)} />
        </Field>
        <ToggleRow label="Available immediately" checked={draft.immediately} onChange={(immediately) => patch({ immediately })} />
        {draft.immediately ? null : (
          <Field label="Available date" error={errors.availableDate}>
            <TextInput type="date" value={draft.availableDate} onChange={(event) => patch({ availableDate: event.target.value })} />
          </Field>
        )}
        <MultiCheck label="Additional commercial requirements" values={draft.additional} onChange={(additional) => patch({ additional })} options={COM_EXTRAS} />
        <Field label="Notes">
          <TextArea value={draft.additionalNotes} onChange={(event) => patch({ additionalNotes: event.target.value })} />
        </Field>
      </Section>
      <Section kicker="Photographs" title="Up to five images">
        <PhotoPicker photos={draft.photos} onChange={(photos) => patch({ photos })} error={errors.photos} />
      </Section>
      <div className="flex flex-wrap gap-3">
        <Button type="submit">{initial ? "Save listing" : "Publish listing"}</Button>
        <Button type="button" variant="secondary" onClick={() => void navigate({ to: "/listings" })}>Cancel</Button>
      </div>
    </form>
  );
}
