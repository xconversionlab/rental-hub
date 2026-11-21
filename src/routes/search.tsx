import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ListingCard, RequirementCard, SampleBanner } from "@/components/cards";
import { ChipSelect, Field, MultiCheck, PageHeader, SelectInput, TextInput, ToggleRow } from "@/components/fields";
import { Shell } from "@/components/shell";
import {
  BEDROOMS,
  CITIES,
  COM_AREAS,
  COM_BUDGETS,
  COM_EXTRAS,
  COM_TYPES,
  CONDITIONS,
  PROVINCES,
  RES_AMENITIES,
  RES_AREAS,
  RES_BUDGETS,
  RES_TYPES,
  TERMS,
} from "@/domain/catalog";
import { listingMatchesFilters, requirementMatchesFilters } from "@/domain/match";
import { statusFromExpiry } from "@/domain/expiry";
import { EMPTY_FILTERS, type SearchFilters } from "@/domain/types";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    segment: search.segment === "residential" || search.segment === "commercial" ? search.segment : "all",
    view: search.view === "tenants" ? "tenants" : "properties",
  }),
  component: SearchPage,
});

function SearchPage() {
  const incoming = Route.useSearch();
  const listings = useHub((state) => state.listings);
  const requirements = useHub((state) => state.requirements);
  const [view, setView] = useState<"properties" | "tenants">(incoming.view === "tenants" ? "tenants" : "properties");
  const [filters, setFilters] = useState<SearchFilters>({
    ...EMPTY_FILTERS,
    segment: incoming.segment === "residential" || incoming.segment === "commercial" ? incoming.segment : "all",
  });
  const [more, setMore] = useState(false);

  const cities = filters.province ? (CITIES[filters.province] ?? []) : [];
  const matchedListings = useMemo(
    () => listings.filter((item) => listingMatchesFilters(item, filters)),
    [listings, filters],
  );
  const matchedRequirements = useMemo(
    () => requirements.filter((item) => requirementMatchesFilters(item, filters)),
    [requirements, filters],
  );
  const propertyPool = useMemo(
    () => listings.filter((item) => listingMatchesFilters(item, { ...filters, includeExpired: true })),
    [listings, filters],
  );
  const tenantPool = useMemo(
    () => requirements.filter((item) => requirementMatchesFilters(item, { ...filters, includeExpired: true })),
    [requirements, filters],
  );
  const availableCount = propertyPool.filter((item) => statusFromExpiry(item.expiresAt) === "active").length;

  function patch(partial: Partial<SearchFilters>) {
    setFilters((current) => ({ ...current, ...partial }));
  }

  const budgetOptions = filters.segment === "commercial" ? COM_BUDGETS : RES_BUDGETS;
  const areaOptions = filters.segment === "commercial" ? COM_AREAS : RES_AREAS;

  return (
    <Shell>
      <PageHeader
        kicker="Search"
        title="Find properties and tenants"
        lede="Filters run on the records stored on this device, including labelled sample data."
      />
      <div className="mb-4">
        <SampleBanner />
      </div>
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Total matching properties" value={propertyPool.length} />
        <Stat label="Total matching tenants" value={tenantPool.length} />
        <Stat label="Available properties" value={availableCount} />
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" className={tabClass(view === "properties")} onClick={() => setView("properties")}>
          Properties
        </button>
        <button type="button" className={tabClass(view === "tenants")} onClick={() => setView("tenants")}>
          Tenant requirements
        </button>
      </div>
      <div className="mb-6 space-y-4 rounded-3xl border border-line bg-card p-4 shadow-card">
        <ChipSelect
          label="Kind"
          value={filters.segment}
          onChange={(segment) =>
            patch({
              segment: segment as SearchFilters["segment"],
              propertyType: "",
              commercialType: "",
              budget: "",
              area: "",
              additional: [],
            })
          }
          options={[
            { id: "all", label: "All" },
            { id: "residential", label: "Residential" },
            { id: "commercial", label: "Commercial" },
          ]}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Province or territory">
            <SelectInput
              value={filters.province}
              onChange={(event) => patch({ province: event.target.value, city: "" })}
            >
              <option value="">All provinces</option>
              {PROVINCES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="City">
            <SelectInput value={filters.city} onChange={(event) => patch({ city: event.target.value })} disabled={!filters.province}>
              <option value="">All cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
        <button type="button" className="text-sm font-medium text-navy" onClick={() => setMore((value) => !value)}>
          {more ? "Hide extra filters" : "Budget, type, area, dates, and requirements"}
        </button>
        {more ? (
          <div className="space-y-4">
            {filters.segment !== "commercial" ? (
              <Field label="Residential property type">
                <SelectInput value={filters.propertyType} onChange={(event) => patch({ propertyType: event.target.value })}>
                  <option value="">Any</option>
                  {RES_TYPES.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </SelectInput>
              </Field>
            ) : null}
            {filters.segment !== "residential" ? (
              <Field label="Commercial category">
                <SelectInput value={filters.commercialType} onChange={(event) => patch({ commercialType: event.target.value })}>
                  <option value="">Any</option>
                  {COM_TYPES.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </SelectInput>
              </Field>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Budget band">
                <SelectInput value={filters.budget} onChange={(event) => patch({ budget: event.target.value })}>
                  <option value="">Any budget</option>
                  {budgetOptions.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Area">
                <SelectInput value={filters.area} onChange={(event) => patch({ area: event.target.value })}>
                  <option value="">Any area</option>
                  {areaOptions.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </SelectInput>
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Minimum rent (CAD)">
                <TextInput inputMode="numeric" value={filters.rentMin} onChange={(event) => patch({ rentMin: event.target.value })} />
              </Field>
              <Field label="Maximum rent (CAD)">
                <TextInput inputMode="numeric" value={filters.rentMax} onChange={(event) => patch({ rentMax: event.target.value })} />
              </Field>
            </div>
            <Field label="Rental term">
              <SelectInput value={filters.rentalTerm} onChange={(event) => patch({ rentalTerm: event.target.value })}>
                <option value="">Any term</option>
                {TERMS.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </SelectInput>
            </Field>
            {filters.segment !== "commercial" ? (
              <Field label="Bedrooms (at least)">
                <SelectInput value={filters.bedrooms} onChange={(event) => patch({ bedrooms: event.target.value })}>
                  <option value="">Any</option>
                  {BEDROOMS.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </SelectInput>
              </Field>
            ) : null}
            <Field label="Condition">
              <SelectInput value={filters.condition} onChange={(event) => patch({ condition: event.target.value })}>
                <option value="">Any condition</option>
                {CONDITIONS.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </SelectInput>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Available from">
                <TextInput type="date" value={filters.availableFrom} onChange={(event) => patch({ availableFrom: event.target.value })} />
              </Field>
              <Field label="Available to">
                <TextInput type="date" value={filters.availableTo} onChange={(event) => patch({ availableTo: event.target.value })} />
              </Field>
            </div>
            <ToggleRow label="Immediately available only" checked={filters.immediatelyOnly} onChange={(immediatelyOnly) => patch({ immediatelyOnly })} />
            <ToggleRow label="Include expired records" checked={filters.includeExpired} onChange={(includeExpired) => patch({ includeExpired })} hint="Expired records stay visible as unavailable. They are not deleted." />
            {filters.segment !== "commercial" ? (
              <MultiCheck label="Additional residential requirements" values={filters.additional.filter((id) => RES_AMENITIES.some((item) => item.id === id))} onChange={(residential) => patch({ additional: [...residential, ...filters.additional.filter((id) => COM_EXTRAS.some((item) => item.id === id))] })} options={RES_AMENITIES} />
            ) : null}
            {filters.segment !== "residential" ? (
              <MultiCheck label="Additional commercial requirements" values={filters.additional.filter((id) => COM_EXTRAS.some((item) => item.id === id))} onChange={(commercial) => patch({ additional: [...filters.additional.filter((id) => RES_AMENITIES.some((item) => item.id === id)), ...commercial] })} options={COM_EXTRAS} />
            ) : null}
            <button type="button" className="text-sm font-medium text-navy" onClick={() => setFilters({ ...EMPTY_FILTERS })}>
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
      {view === "properties" ? (
        matchedListings.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {matchedListings.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted">No properties match these filters.</p>
        )
      ) : matchedRequirements.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {matchedRequirements.map((item) => (
            <RequirementCard key={item.id} requirement={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted">No tenant requirements match these filters.</p>
      )}
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-line bg-card px-3 py-3">
      <p className="font-display text-3xl tabular-nums text-navy">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function tabClass(active: boolean) {
  return active
    ? "min-h-11 rounded-full bg-navy px-4 text-sm font-medium text-on-navy"
    : "min-h-11 rounded-full border border-line bg-card px-4 text-sm font-medium text-navy";
}
