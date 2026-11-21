import { createFileRoute, Link } from "@tanstack/react-router";
import { Fact, Pill, SampleBanner } from "@/components/cards";
import { PageHeader } from "@/components/fields";
import { OwnerActions } from "@/components/owner-actions";
import { Shell } from "@/components/shell";
import {
  COM_EXTRAS,
  EMPLOYMENT_LETTERS,
  RES_AMENITIES,
  optionLabel,
} from "@/domain/catalog";
import { formatLong } from "@/domain/format";
import { assess } from "@/domain/match";
import {
  budgetLine,
  categoryLabel,
  conditionLabel,
  contactLabel,
  creditLabel,
  furnishedLabel,
  garageLabel,
  laundryLabel,
  parkingLabel,
  petsLabel,
  placeLine,
  requirementArea,
  requirementTitle,
  statusLabel,
  termLabel,
} from "@/domain/present";
import { statusFromExpiry } from "@/domain/expiry";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/requirements/$id")({ component: RequirementDetail });

function RequirementDetail() {
  const { id } = Route.useParams();
  const requirement = useHub((state) => state.requirements.find((item) => item.id === id));
  const listings = useHub((state) => state.listings);

  if (!requirement) {
    return (
      <Shell>
        <PageHeader title="Requirement not found" lede="It may have been removed from this device." />
        <Link to="/requirements" className="text-sm font-medium text-navy">
          Back to requirements
        </Link>
      </Shell>
    );
  }

  const status = statusFromExpiry(requirement.expiresAt);
  const matches = listings
    .map((listing) => ({ listing, match: assess(requirement, listing) }))
    .filter((item) => item.match.ok)
    .sort((a, b) => b.match.score - a.match.score);

  return (
    <Shell>
      <PageHeader kicker={requirement.segment === "commercial" ? "Commercial requirement" : "Residential requirement"} title={requirementTitle(requirement)} lede={placeLine(requirement)} />
      <div className="mb-4 flex flex-wrap gap-2">
        {requirement.sample ? <Pill tone="brass">Sample</Pill> : <Pill>Yours</Pill>}
        <Pill tone={status === "active" ? "ok" : "danger"}>{status === "active" ? "Active" : "Expired · unavailable"}</Pill>
      </div>
      {requirement.sample ? (
        <div className="mb-4">
          <SampleBanner />
        </div>
      ) : null}
      <p className="mb-4 text-sm text-muted">
        Created {formatLong(requirement.createdAt)} · Expires {formatLong(requirement.expiresAt)} · {statusLabel(requirement.expiresAt)}
      </p>
      <div className="mb-4">
        <OwnerActions kind="requirement" id={requirement.id} mine={requirement.owner === "me"} segment={requirement.segment} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Fact label="Budget" value={budgetLine(requirement)} />
        <Fact label="Term" value={termLabel(requirement.rentalTerm)} />
        <Fact label="Tenant" value={categoryLabel(requirement)} />
        <Fact label="Area" value={requirementArea(requirement)} />
        <Fact label="Contact" value={contactLabel(requirement.contactMethod, requirement.contactTime)} />
        {requirement.segment === "residential" ? (
          <>
            <Fact label="Bedrooms" value={requirement.bedrooms === "bachelor" ? "Bachelor" : requirement.bedrooms === "5plus" ? "5+" : requirement.bedrooms} />
            <Fact label="Washrooms" value={requirement.washrooms === "4plus" ? "4+" : requirement.washrooms} />
            <Fact label="Parking" value={parkingLabel(requirement.parking)} />
            <Fact label="Condition" value={conditionLabel(requirement.condition)} />
            <Fact label="Furnished" value={furnishedLabel(requirement.furnished)} />
            <Fact label="Move-in" value={requirement.immediately ? "Immediately" : requirement.useRange ? `${formatLong(requirement.moveInDate)} – ${formatLong(requirement.moveInEnd)}` : formatLong(requirement.moveInDate)} />
            <Fact label="±15 days" value={requirement.dateFlexibility ? "Yes" : "No"} />
            <Fact label="Employment letter" value={optionLabel(EMPLOYMENT_LETTERS, requirement.employmentLetter)} />
            <Fact label="Credit category" value={creditLabel(requirement.creditScore)} />
            <Fact label="Pets" value={petsLabel(requirement.pets)} />
            <Fact label="Laundry" value={laundryLabel(requirement.laundry)} />
            <Fact label="Garage" value={garageLabel(requirement.garage)} />
            <Fact label="Strict garage storage" value={requirement.strictGarageStorage ? "Required" : "No"} />
          </>
        ) : (
          <Fact label="Move-in" value={requirement.moveInDate ? formatLong(requirement.moveInDate) : "Not set"} />
        )}
      </div>
      <section className="mt-6">
        <h2 className="font-display text-2xl text-navy">Additional requirements</h2>
        {requirement.additional.length ? (
          <ul className="mt-2 flex flex-wrap gap-2">
            {requirement.additional.map((item) => (
              <li key={item} className="rounded-full bg-brass-soft px-3 py-1 text-xs text-brass">
                {optionLabel(requirement.segment === "residential" ? RES_AMENITIES : COM_EXTRAS, item)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-muted">None selected.</p>
        )}
        {requirement.additionalNotes ? <p className="mt-3 text-sm text-ink">{requirement.additionalNotes}</p> : null}
      </section>
      {requirement.segment === "commercial" && requirement.owner === "me" && (requirement.contactName || requirement.mobile || requirement.email) ? (
        <section className="mt-6 rounded-3xl border border-line bg-card p-4">
          <h2 className="font-display text-2xl text-navy">Contact on this device</h2>
          <p className="mt-1 text-xs text-muted">Visible only because this requirement is yours. It is not shown on marketplace cards.</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <Fact label="Name" value={requirement.contactName || "—"} />
            <Fact label="Mobile" value={requirement.mobile || "—"} />
            <Fact label="Email" value={requirement.email || "—"} />
          </div>
        </section>
      ) : null}
      {requirement.sample ? (
        <p className="mt-4 text-sm text-muted">Contact details are withheld. This sample is not a real person.</p>
      ) : null}
      <section className="mt-8">
        <h2 className="font-display text-2xl text-navy">Matching properties</h2>
        <p className="mt-1 text-sm text-muted">{matches.length} available {matches.length === 1 ? "property matches" : "properties match"}.</p>
        <ul className="mt-3 space-y-2">
          {matches.map(({ listing, match }) => (
            <li key={listing.id}>
              <Link to="/listings/$id" params={{ id: listing.id }} className="block rounded-2xl border border-line bg-card px-4 py-3">
                <span className="font-medium text-navy">{listing.address}</span>
                <span className="mt-1 block text-sm text-muted">{match.reasons.slice(0, 3).join(" · ")}</span>
              </Link>
            </li>
          ))}
        </ul>
        {matches.length === 0 ? <p className="mt-2 text-sm text-muted">No available property matches this requirement.</p> : null}
      </section>
    </Shell>
  );
}
