import { createFileRoute, Link } from "@tanstack/react-router";
import { CommercialListingForm, ResidentialListingForm } from "@/components/listing-form";
import { PageHeader } from "@/components/fields";
import { Shell } from "@/components/shell";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/listings/new")({
  validateSearch: (search: Record<string, unknown>) => ({
    segment: search.segment === "commercial" ? "commercial" : "residential",
    edit: typeof search.edit === "string" ? search.edit : undefined,
  }),
  component: NewListing,
});

function NewListing() {
  const { segment, edit } = Route.useSearch();
  const listings = useHub((state) => state.listings);
  const existing = edit ? listings.find((item) => item.id === edit && item.owner === "me") : undefined;
  const resolved = existing?.segment ?? segment;

  return (
    <Shell>
      <PageHeader
        kicker={resolved === "commercial" ? "Commercial listing" : "Residential listing"}
        title={existing ? "Edit listing" : "List a property"}
        lede="Photographs are optional. You can add, replace, or remove up to five, and they stay with this listing."
      />
      {edit && !existing ? (
        <p className="text-sm text-danger">
          That listing is not yours to edit.{" "}
          <Link to="/listings" className="underline">
            Back to your listings
          </Link>
        </p>
      ) : resolved === "commercial" ? (
        <CommercialListingForm initial={existing?.segment === "commercial" ? existing : undefined} />
      ) : (
        <ResidentialListingForm initial={existing?.segment === "residential" ? existing : undefined} />
      )}
    </Shell>
  );
}
