import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Fact, Pill, SampleBanner } from "@/components/cards";
import { PageHeader } from "@/components/fields";
import { OwnerActions } from "@/components/owner-actions";
import { PropertyPlate } from "@/components/plates";
import { Shell } from "@/components/shell";
import { COM_EXTRAS, RES_AMENITIES, optionLabel } from "@/domain/catalog";
import { formatCAD, formatLong } from "@/domain/format";
import { assess } from "@/domain/match";
import {
  areaLine,
  availabilityLine,
  conditionLabel,
  contactLabel,
  furnishedLabel,
  listingTitle,
  parkingLabel,
  placeLine,
  plateFor,
  termLabel,
} from "@/domain/present";
import { statusFromExpiry } from "@/domain/expiry";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/listings/$id")({ component: ListingDetail });

function ListingDetail() {
  const { id } = Route.useParams();
  const listing = useHub((state) => state.listings.find((item) => item.id === id));
  const requirements = useHub((state) => state.requirements);
  const profile = useHub((state) => state.profile);
  const [photo, setPhoto] = useState(0);

  if (!listing) {
    return (
      <Shell>
        <PageHeader title="Property not found" lede="It may have been removed from this device." />
        <Link to="/search" search={{ segment: "all", view: "properties" }} className="text-sm font-medium text-navy">
          Back to search
        </Link>
      </Shell>
    );
  }

  const status = statusFromExpiry(listing.expiresAt);
  const photos = listing.photos;
  const matches = requirements
    .map((requirement) => ({ requirement, match: assess(requirement, listing) }))
    .filter((item) => item.match.ok)
    .sort((a, b) => b.match.score - a.match.score);
  const showContact = listing.owner === "me";

  return (
    <Shell>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          {photos.length ? (
            <img src={photos[Math.min(photo, photos.length - 1)]} alt={`${listingTitle(listing)} photograph ${photo + 1}`} className="aspect-[3/2] w-full rounded-3xl object-cover" />
          ) : (
            <div className="overflow-hidden rounded-3xl">
              <PropertyPlate kind={plateFor(listing)} label="No photograph" />
            </div>
          )}
          {photos.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {photos.map((src, index) => (
                <button key={src.slice(0, 24) + index} type="button" onClick={() => setPhoto(index)} className="shrink-0 overflow-hidden rounded-xl border border-line">
                  <img src={src} alt="" className="size-16 object-cover" />
                </button>
              ))}
            </div>
          ) : null}
          {!photos.length ? <p className="mt-2 text-xs text-muted">Photographs are optional. This record has none.</p> : null}
        </div>
        <div>
          <PageHeader kicker={listing.segment === "commercial" ? "Commercial property" : "Residential property"} title={listingTitle(listing)} lede={`${formatCAD(listing.monthlyRent)} per month · ${placeLine(listing)}`} />
          <div className="mb-4 flex flex-wrap gap-2">
            {listing.sample ? <Pill tone="brass">Sample</Pill> : <Pill>Yours</Pill>}
            <Pill tone={status === "active" ? "ok" : "danger"}>{status === "active" ? "Available" : "Expired · unavailable"}</Pill>
          </div>
          {listing.sample ? (
            <div className="mb-4">
              <SampleBanner />
            </div>
          ) : null}
          <p className="mb-4 text-sm text-ink">{listing.address}</p>
          <p className="mb-4 text-sm text-muted">
            {listing.postalCode} · Created {formatLong(listing.createdAt)} · Expires {formatLong(listing.expiresAt)}
          </p>
          <OwnerActions kind="listing" id={listing.id} mine={listing.owner === "me"} segment={listing.segment} />
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Fact label="Rent" value={`${formatCAD(listing.monthlyRent)} / month`} />
        <Fact label="Area" value={areaLine(listing)} />
        <Fact label="Term" value={termLabel(listing.rentalTerm)} />
        <Fact label="Condition" value={conditionLabel(listing.condition)} />
        <Fact label="Parking" value={parkingLabel(listing.parking)} />
        <Fact label="Availability" value={availabilityLine(listing)} />
        {listing.segment === "residential" ? (
          <>
            <Fact label="Furnishing" value={furnishedLabel(listing.furnishing)} />
            <Fact label="Bedrooms" value={listing.bedrooms} />
            <Fact label="Washrooms" value={listing.washrooms} />
          </>
        ) : null}
      </div>
      <section className="mt-6">
        <h2 className="font-display text-2xl text-navy">{listing.segment === "commercial" ? "Additional commercial requirements" : "Amenities"}</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {(listing.segment === "commercial" ? listing.additional : listing.amenities).map((item) => (
            <li key={item} className="rounded-full bg-brass-soft px-3 py-1 text-xs text-brass">
              {optionLabel(listing.segment === "commercial" ? COM_EXTRAS : RES_AMENITIES, item)}
            </li>
          ))}
        </ul>
        {(listing.segment === "commercial" ? listing.additional : listing.amenities).length === 0 ? (
          <p className="mt-2 text-sm text-muted">None listed.</p>
        ) : null}
        {listing.segment === "commercial" && listing.additionalNotes ? <p className="mt-3 text-sm">{listing.additionalNotes}</p> : null}
      </section>
      <section className="mt-6 rounded-3xl border border-line bg-card p-4">
        <h2 className="font-display text-2xl text-navy">Contact</h2>
        {listing.sample ? (
          <p className="mt-2 text-sm text-muted">Sample landlord. Contact details are withheld because this is not a real listing.</p>
        ) : showContact ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Fact label="Preferred method" value={contactLabel(profile.contactMethod, profile.contactTime)} />
            <Fact label="On your profile" value={profile.email || profile.mobile || "No phone or email saved"} />
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted">The lister’s preferred contact method is kept off public cards in this preview.</p>
        )}
      </section>
      <section className="mt-8">
        <h2 className="font-display text-2xl text-navy">Matching tenants</h2>
        <p className="mt-1 text-sm text-muted">{matches.length} active {matches.length === 1 ? "requirement matches" : "requirements match"}.</p>
        <ul className="mt-3 space-y-2">
          {matches.map(({ requirement, match }) => (
            <li key={requirement.id}>
              <Link to="/requirements/$id" params={{ id: requirement.id }} className="block rounded-2xl border border-line bg-card px-4 py-3">
                <span className="font-medium text-navy">{requirement.city} · {requirement.segment}</span>
                <span className="mt-1 block text-sm text-muted">{match.reasons.slice(0, 3).join(" · ")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
