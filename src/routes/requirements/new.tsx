import { createFileRoute, Link } from "@tanstack/react-router";
import { CommercialRequirementForm, ResidentialRequirementForm } from "@/components/requirement-form";
import { PageHeader } from "@/components/fields";
import { Shell } from "@/components/shell";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/requirements/new")({
  validateSearch: (search: Record<string, unknown>) => ({
    segment: search.segment === "commercial" ? "commercial" : "residential",
    edit: typeof search.edit === "string" ? search.edit : undefined,
  }),
  component: NewRequirement,
});

function NewRequirement() {
  const { segment, edit } = Route.useSearch();
  const requirements = useHub((state) => state.requirements);
  const existing = edit ? requirements.find((item) => item.id === edit && item.owner === "me") : undefined;
  const resolved = existing?.segment ?? segment;

  return (
    <Shell>
      <PageHeader
        kicker={resolved === "commercial" ? "Commercial requirement" : "Residential requirement"}
        title={existing ? "Edit requirement" : "Post what you need"}
        lede="Active for 60 days. Phone and email are optional, stored only on this device, and kept off marketplace cards."
      />
      {edit && !existing ? (
        <p className="text-sm text-danger">
          That requirement is not yours to edit.{" "}
          <Link to="/requirements" className="underline">
            Back to your requirements
          </Link>
        </p>
      ) : resolved === "commercial" ? (
        <CommercialRequirementForm initial={existing?.segment === "commercial" ? existing : undefined} />
      ) : (
        <ResidentialRequirementForm initial={existing?.segment === "residential" ? existing : undefined} />
      )}
    </Shell>
  );
}
