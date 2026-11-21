import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/fields";
import { Shell } from "@/components/shell";
import { SampleBanner } from "@/components/cards";
import { assess, liveListing, liveRequirement, marketplaceCounts } from "@/domain/match";
import { listingTitle, placeLine, requirementTitle } from "@/domain/present";
import { formatCAD } from "@/domain/format";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/matches")({ component: MatchesPage });

function MatchesPage() {
  const listings = useHub((state) => state.listings);
  const requirements = useHub((state) => state.requirements);
  const role = useHub((state) => state.profile.role);
  const counts = marketplaceCounts(listings, requirements);
  const pairs = requirements.flatMap((requirement) =>
    listings
      .map((listing) => ({ requirement, listing, match: assess(requirement, listing) }))
      .filter((pair) => pair.match.compatible)
      .sort((a, b) => b.match.score - a.match.score),
  );
  const available = pairs.filter((pair) => pair.match.ok);
  const expired = pairs.filter((pair) => !pair.match.ok);
  const mine = available.filter((pair) => (role === "landlord" ? pair.listing.owner === "me" : pair.requirement.owner === "me"));
  const demo = available.filter((pair) => pair.requirement.sample && pair.listing.sample);

  return (
    <Shell>
      <PageHeader
        kicker="Matches"
        title="What lines up"
        lede="A match needs the same kind of rental, province, city, type, budget, timing, and — for homes — enough bedrooms. Expired records are unavailable."
      />
      <div className="mb-4">
        <SampleBanner />
      </div>
      <dl className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl bg-navy px-4 py-4 text-on-navy">
          <dt className="text-sm text-paper/80">Available properties</dt>
          <dd className="font-display text-4xl tabular-nums">{counts.availableProperties}</dd>
        </div>
        <div className="rounded-3xl border border-line bg-card px-4 py-4">
          <dt className="text-sm text-muted">Total matching properties</dt>
          <dd className="font-display text-4xl tabular-nums text-navy">{counts.matchingProperties}</dd>
        </div>
        <div className="rounded-3xl border border-line bg-card px-4 py-4">
          <dt className="text-sm text-muted">Total matching tenants</dt>
          <dd className="font-display text-4xl tabular-nums text-navy">{counts.matchingTenants}</dd>
        </div>
      </dl>
      <PairSection
        title={role === "landlord" ? "Matches for your listings" : "Matches for your requirements"}
        empty={role ? "Nothing of yours matches yet. Post a requirement or listing, or review the demonstration pairs below." : "Choose a role, then post. Demonstration pairs are below."}
        pairs={mine}
      />
      <PairSection title="Demonstration matches" empty="No sample pairs are available." pairs={demo} />
      <section className="mt-8">
        <h2 className="mb-3 font-display text-2xl text-navy">Expired and unavailable</h2>
        <p className="mb-3 text-sm text-muted">
          These pairs still fit the rules, but at least one record is past its 60-day life. They are not offered. A future backend can delete expired marketplace records. Your profile is not part of that deletion.
        </p>
        {expired.length ? (
          <ul className="space-y-3">
            {expired.slice(0, 4).map((pair) => (
              <li key={`${pair.requirement.id}-${pair.listing.id}`} className="rounded-2xl border border-line bg-card px-4 py-3 text-sm">
                <p className="font-medium text-ink">
                  {requirementTitle(pair.requirement)} in {pair.requirement.city} · {listingTitle(pair.listing)}
                </p>
                <p className="text-danger">Unavailable</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">No expired pairs in the current records.</p>
        )}
      </section>
    </Shell>
  );
}

function PairSection({
  title,
  empty,
  pairs,
}: {
  title: string;
  empty: string;
  pairs: { requirement: ReturnType<typeof liveRequirement>; listing: ReturnType<typeof liveListing>; match: ReturnType<typeof assess> }[];
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-2xl text-navy">{title}</h2>
      {pairs.length ? (
        <ul className="space-y-3">
          {pairs.map((pair) => (
            <li key={`${pair.requirement.id}-${pair.listing.id}`} className="rounded-3xl border border-line bg-card p-4 shadow-card">
              <div className="grid gap-3 sm:grid-cols-2">
                <Link to="/requirements/$id" params={{ id: pair.requirement.id }} className="rounded-2xl bg-paper px-3 py-3">
                  <p className="text-xs tracking-widest text-brass uppercase">Requirement</p>
                  <p className="font-display text-xl text-navy">{requirementTitle(pair.requirement)}</p>
                  <p className="text-sm text-muted">{placeLine(pair.requirement)}</p>
                </Link>
                <Link to="/listings/$id" params={{ id: pair.listing.id }} className="rounded-2xl bg-paper px-3 py-3">
                  <p className="text-xs tracking-widest text-brass uppercase">Property</p>
                  <p className="font-display text-xl text-navy">{listingTitle(pair.listing)}</p>
                  <p className="text-sm text-muted">
                    {placeLine(pair.listing)} · {formatCAD(pair.listing.monthlyRent)}/mo
                  </p>
                </Link>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pair.match.reasons.slice(0, 4).map((reason) => (
                  <li key={reason} className="rounded-full bg-ok-soft px-2.5 py-1 text-xs text-ok">
                    {reason}
                  </li>
                ))}
              </ul>
              {pair.match.gaps.length ? <p className="mt-2 text-xs text-muted">Check: {pair.match.gaps.slice(0, 2).join(" · ")}</p> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-3xl border border-dashed border-line px-4 py-6 text-sm text-muted">{empty}</p>
      )}
    </section>
  );
}
