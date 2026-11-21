import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Home } from "lucide-react";
import { PageHeader } from "@/components/fields";
import { Shell } from "@/components/shell";

type Intent = "requirement" | "listing" | "search";

export const Route = createFileRoute("/segment")({
  validateSearch: (search: Record<string, unknown>) => ({
    intent: (search.intent === "listing" || search.intent === "search" ? search.intent : "requirement") as Intent,
  }),
  component: SegmentScreen,
});

function SegmentScreen() {
  const { intent } = Route.useSearch();
  const copy =
    intent === "listing"
      ? { kicker: "New listing", title: "What are you listing?", lede: "Residential and commercial listings use different forms." }
      : intent === "search"
        ? { kicker: "Search", title: "What are you looking through?", lede: "Start with residential or commercial, then refine." }
        : { kicker: "New requirement", title: "What do you need?", lede: "Residential and commercial requirements are kept separate." };

  function href(segment: "residential" | "commercial") {
    if (intent === "listing") return { to: "/listings/new" as const, search: { segment, edit: undefined } };
    if (intent === "search") return { to: "/search" as const, search: { segment, view: "properties" as const } };
    return { to: "/requirements/new" as const, search: { segment, edit: undefined } };
  }

  return (
    <Shell>
      <PageHeader {...copy} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Link {...href("residential")} className="rounded-3xl border border-line bg-card p-6 shadow-card">
          <Home className="size-5 text-navy" aria-hidden="true" />
          <h2 className="mt-4 font-display text-3xl text-navy">Residential</h2>
          <p className="mt-2 text-sm text-pretty text-muted">Homes, condos, suites, and rooms. Bedrooms, furnishing, pets, laundry, and garage.</p>
        </Link>
        <Link {...href("commercial")} className="rounded-3xl border border-line bg-card p-6 shadow-card">
          <Building2 className="size-5 text-brass" aria-hidden="true" />
          <h2 className="mt-4 font-display text-3xl text-navy">Commercial</h2>
          <p className="mt-2 text-sm text-pretty text-muted">Offices, retail, industrial, and other workplaces. Area, rent, and extra site needs.</p>
        </Link>
      </div>
    </Shell>
  );
}
