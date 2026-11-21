import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/button";
import { useHub } from "@/state/hub";

export function OwnerActions({
  kind,
  id,
  mine,
  segment,
}: {
  kind: "listing" | "requirement";
  id: string;
  mine: boolean;
  segment: "residential" | "commercial";
}) {
  const navigate = useNavigate();
  const renewListing = useHub((state) => state.renewListing);
  const deleteListing = useHub((state) => state.deleteListing);
  const renewRequirement = useHub((state) => state.renewRequirement);
  const deleteRequirement = useHub((state) => state.deleteRequirement);
  const [confirm, setConfirm] = useState(false);
  if (!mine) return null;
  const edit =
    kind === "listing"
      ? { to: "/listings/new" as const, search: { segment, edit: id } }
      : { to: "/requirements/new" as const, search: { segment, edit: id } };

  return (
    <div className="flex flex-wrap gap-2">
      <Link to={edit.to} search={edit.search} className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-sm font-medium text-navy">
        Edit
      </Link>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          if (kind === "listing") renewListing(id);
          else renewRequirement(id);
        }}
      >
        Renew 60 days
      </Button>
      {confirm ? (
        <Button
          type="button"
          variant="danger"
          onClick={() => {
            if (kind === "listing") {
              deleteListing(id);
              void navigate({ to: "/listings" });
            } else {
              deleteRequirement(id);
              void navigate({ to: "/requirements" });
            }
          }}
        >
          Confirm remove
        </Button>
      ) : (
        <Button type="button" variant="danger" onClick={() => setConfirm(true)}>
          Remove
        </Button>
      )}
    </div>
  );
}
