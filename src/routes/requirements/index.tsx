import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonClasses } from "@/components/button";
import { RequirementCard } from "@/components/cards";
import { PageHeader } from "@/components/fields";
import { Shell } from "@/components/shell";
import { statusFromExpiry } from "@/domain/expiry";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/requirements/")({ component: MyRequirements });

function MyRequirements() {
  const requirements = useHub((state) => state.requirements);
  const mine = requirements.filter((item) => item.owner === "me");
  const active = mine.filter((item) => statusFromExpiry(item.expiresAt) === "active").length;

  return (
    <Shell>
      <PageHeader
        kicker="Mine"
        title="My requirements"
        lede="Each requirement is active for 60 days from the day you save or renew it. Expired requirements stay here as unavailable. They are not deleted automatically."
      />
      <p className="mb-4 text-sm text-muted">
        {active} active · {mine.length - active} expired
      </p>
      <Link to="/segment" search={{ intent: "requirement" }} className={buttonClasses("primary", "mb-6")}>
        Post a requirement
      </Link>
      {mine.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {mine.map((item) => (
            <RequirementCard key={item.id} requirement={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-dashed border-line bg-card px-4 py-8 text-sm text-muted">
          Nothing saved under your role yet. Sample requirements are in Search, not in this list.
        </p>
      )}
    </Shell>
  );
}
