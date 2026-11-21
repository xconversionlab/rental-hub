import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonClasses } from "@/components/button";
import { ListingCard } from "@/components/cards";
import { PageHeader } from "@/components/fields";
import { Shell } from "@/components/shell";
import { statusFromExpiry } from "@/domain/expiry";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/listings/")({ component: MyListings });

function MyListings() {
  const listings = useHub((state) => state.listings);
  const mine = listings.filter((item) => item.owner === "me");
  const active = mine.filter((item) => statusFromExpiry(item.expiresAt) === "active").length;

  return (
    <Shell>
      <PageHeader
        kicker="Mine"
        title="My property listings"
        lede="Each listing is active for 60 days. Photographs stay attached to that listing, up to five. Expired listings are marked unavailable and are not deleted here."
      />
      <p className="mb-4 text-sm text-muted">
        {active} active · {mine.length - active} expired
      </p>
      <Link to="/segment" search={{ intent: "listing" }} className={buttonClasses("primary", "mb-6")}>
        List a property
      </Link>
      {mine.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mine.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-dashed border-line bg-card px-4 py-8 text-sm text-muted">
          You have not published a listing. Sample properties are in Search and are not yours.
        </p>
      )}
    </Shell>
  );
}
