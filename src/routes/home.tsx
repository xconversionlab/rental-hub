import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonClasses } from "@/components/button";
import { ListingCard, RequirementCard, SampleBanner } from "@/components/cards";
import { PageHeader } from "@/components/fields";
import { Shell } from "@/components/shell";
import { marketplaceCounts } from "@/domain/match";
import { statusFromExpiry } from "@/domain/expiry";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/home")({ component: Home });

function Home() {
  const profile = useHub((state) => state.profile);
  const listings = useHub((state) => state.listings);
  const requirements = useHub((state) => state.requirements);
  const counts = marketplaceCounts(listings, requirements);
  const role = profile.role;
  const mineListings = listings.filter((item) => item.owner === "me");
  const mineRequirements = requirements.filter((item) => item.owner === "me");
  const expiring = [...mineListings, ...mineRequirements].filter((item) => statusFromExpiry(item.expiresAt) === "active");
  const previewListings = listings.filter((item) => statusFromExpiry(item.expiresAt) === "active").slice(0, 3);

  return (
    <Shell>
      <PageHeader
        kicker={role === "landlord" ? "Landlord desk" : role === "tenant" ? "Tenant desk" : "Desk"}
        title={profile.displayName ? `Hello, ${profile.displayName}` : "Rental Hub"}
        lede="Residential and commercial rentals across Canada. Demonstration records are labelled Sample and are not real vacancies."
      />
      {!role ? (
        <p className="mb-6 rounded-2xl border border-line bg-card px-4 py-3 text-sm">
          Choose a role to post. You can still browse the sample marketplace.{" "}
          <Link to="/role" className="font-medium text-navy underline">
            Choose tenant or landlord
          </Link>
        </p>
      ) : null}
      <div className="mb-6">
        <SampleBanner />
      </div>
      <dl className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl bg-navy px-4 py-4 text-on-navy">
          <dt className="text-sm text-paper/80">Available properties</dt>
          <dd className="mt-1 font-display text-4xl tabular-nums">{counts.availableProperties}</dd>
        </div>
        <div className="rounded-3xl border border-line bg-card px-4 py-4 shadow-card">
          <dt className="text-sm text-muted">Total matching properties</dt>
          <dd className="mt-1 font-display text-4xl tabular-nums text-navy">{counts.matchingProperties}</dd>
        </div>
        <div className="rounded-3xl border border-line bg-card px-4 py-4 shadow-card">
          <dt className="text-sm text-muted">Total matching tenants</dt>
          <dd className="mt-1 font-display text-4xl tabular-nums text-navy">{counts.matchingTenants}</dd>
        </div>
      </dl>
      <div className="mb-8 flex flex-wrap gap-3">
        <Link to="/segment" search={{ intent: role === "landlord" ? "listing" : "requirement" }} className={buttonClasses("primary")}>
          {role === "landlord" ? "List a property" : "Post a requirement"}
        </Link>
        <Link to="/search" search={{ segment: "all", view: "properties" }} className={buttonClasses("secondary")}>
          Search the marketplace
        </Link>
        <Link to="/matches" className={buttonClasses("secondary")}>
          View matches
        </Link>
      </div>
      <section className="mb-8">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl text-navy">{role === "landlord" ? "Your listings" : "Your requirements"}</h2>
          <Link to={role === "landlord" ? "/listings" : "/requirements"} className="text-sm font-medium text-navy">
            See all
          </Link>
        </div>
        {role === "landlord" ? (
          mineListings.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {mineListings.slice(0, 3).map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          ) : (
            <p className="rounded-3xl border border-dashed border-line bg-card px-4 py-8 text-sm text-muted">
              You have no listings yet. Sample properties stay in Search until you publish your own.
            </p>
          )
        ) : mineRequirements.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {mineRequirements.slice(0, 3).map((item) => (
              <RequirementCard key={item.id} requirement={item} />
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-line bg-card px-4 py-8 text-sm text-muted">
            You have no requirements yet. {expiring.length ? "" : ""}Post one to see personal matches. Sample requirements are already matched in Matches.
          </p>
        )}
      </section>
      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl text-navy">Available properties</h2>
          <Link to="/search" search={{ segment: "all", view: "properties" }} className="text-sm font-medium text-navy">
            Filter
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {previewListings.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>
    </Shell>
  );
}
