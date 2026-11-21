import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, Car, MapPin } from "lucide-react";
import { liveListing, liveRequirement } from "@/domain/match";
import {
  areaLine,
  availabilityLine,
  budgetLine,
  categoryLabel,
  listingTitle,
  moneyLine,
  placeLine,
  plateFor,
  requirementArea,
  requirementTitle,
  statusLabel,
  termLabel,
} from "@/domain/present";
import { formatLong } from "@/domain/format";
import type { Listing, Requirement } from "@/domain/types";
import { optionLabel, PARKING, WASHROOMS, BEDROOMS } from "@/domain/catalog";
import { PropertyPlate } from "@/components/plates";
import { cn } from "@/lib/cn";

export function Pill({
  children,
  tone = "navy",
}: {
  children: React.ReactNode;
  tone?: "navy" | "brass" | "ok" | "danger" | "paper";
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "navy" && "bg-navy text-on-navy",
        tone === "brass" && "bg-brass-soft text-brass",
        tone === "ok" && "bg-ok-soft text-ok",
        tone === "danger" && "bg-danger-soft text-danger",
        tone === "paper" && "bg-paper text-navy",
      )}
    >
      {children}
    </span>
  );
}

export function SampleBanner() {
  return (
    <p className="rounded-2xl border border-line bg-brass-soft px-4 py-3 text-sm text-pretty text-ink">
      <span className="font-medium">Demonstration data.</span> Sample listings and requirements are fictional. They are not homes or commercial spaces you can rent or lease.
    </p>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  const row = liveListing(listing);
  return (
    <Link
      to="/listings/$id"
      params={{ id: row.id }}
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-card transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="relative">
        {row.photos[0] ? (
          <img src={row.photos[0]} alt="" className="aspect-[3/2] w-full object-cover" />
        ) : (
          <PropertyPlate kind={plateFor(row)} />
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {row.sample ? <Pill tone="brass">Sample</Pill> : null}
          <Pill tone={row.status === "active" ? "ok" : "danger"}>{row.status === "active" ? "Available" : "Unavailable"}</Pill>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl text-balance text-navy">{listingTitle(row)}</h3>
          <p className="shrink-0 text-sm font-semibold tabular-nums text-brass">{moneyLine(row)}</p>
        </div>
        <p className="inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-3.5" aria-hidden="true" />
          {placeLine(row)}
        </p>
        <ul className="mt-auto flex flex-wrap gap-3 text-xs text-muted">
          {row.segment === "residential" ? (
            <>
              <li className="inline-flex items-center gap-1">
                <BedDouble className="size-3.5" aria-hidden="true" />
                {optionLabel(BEDROOMS, row.bedrooms)}
              </li>
              <li className="inline-flex items-center gap-1">
                <Bath className="size-3.5" aria-hidden="true" />
                {optionLabel(WASHROOMS, row.washrooms)}
              </li>
            </>
          ) : (
            <li>{areaLine(row)}</li>
          )}
          <li className="inline-flex items-center gap-1">
            <Car className="size-3.5" aria-hidden="true" />
            {optionLabel(PARKING, row.parking)}
          </li>
          <li>{availabilityLine(row)}</li>
        </ul>
      </div>
    </Link>
  );
}

export function RequirementCard({ requirement }: { requirement: Requirement }) {
  const row = liveRequirement(requirement);
  return (
    <Link
      to="/requirements/$id"
      params={{ id: row.id }}
      className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-card p-4 shadow-card"
    >
      <div className="flex flex-wrap gap-2">
        {row.sample ? <Pill tone="brass">Sample</Pill> : <Pill tone="paper">Yours</Pill>}
        <Pill tone={row.status === "active" ? "ok" : "danger"}>{statusLabel(row.expiresAt)}</Pill>
        <Pill>{row.segment === "residential" ? "Residential" : "Commercial"}</Pill>
      </div>
      <div>
        <h3 className="font-display text-2xl text-balance text-navy">{requirementTitle(row)}</h3>
        <p className="mt-1 text-sm text-muted">{placeLine(row)}</p>
      </div>
      <p className="text-sm font-medium tabular-nums text-brass">{budgetLine(row)}</p>
      <ul className="mt-auto space-y-1 text-sm text-muted">
        <li>{categoryLabel(row)}</li>
        <li>{row.segment === "commercial" ? requirementArea(row) : `${optionLabel(BEDROOMS, row.bedrooms)} bedroom`}</li>
        <li>
          {termLabel(row.rentalTerm)} · {row.segment === "residential" && row.immediately ? "Move-in now" : `Move-in ${row.moveInDate ? formatLong(row.moveInDate) : "open"}`}
        </li>
      </ul>
    </Link>
  );
}

export function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper px-3 py-3">
      <p className="text-xs tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-1 text-sm font-medium text-ink">{value || "—"}</p>
    </div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-card px-5 py-10 text-center">
      <h2 className="font-display text-2xl text-navy">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-pretty text-muted">{body}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
