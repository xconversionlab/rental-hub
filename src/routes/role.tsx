import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Building2, KeyRound } from "lucide-react";
import { Logo } from "@/components/shell";
import type { Role } from "@/domain/types";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/role")({ component: RoleScreen });

function RoleScreen() {
  const navigate = useNavigate();
  const updateProfile = useHub((state) => state.updateProfile);

  function choose(role: Role) {
    updateProfile({ role, onboarded: true });
    void navigate({ to: "/home" });
  }

  return (
    <main className="min-h-screen bg-paper px-6 py-8">
      <Logo />
      <div className="mx-auto mt-10 w-full max-w-3xl">
        <p className="text-xs font-medium tracking-widest text-brass uppercase">Role</p>
        <h1 className="mt-2 font-display text-4xl text-balance text-navy">Are you looking, or listing?</h1>
        <p className="mt-3 max-w-xl text-pretty text-muted">
          You can switch later in Profile. This only changes your desk. It is not an account, and it does not verify you.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button type="button" onClick={() => choose("tenant")} className="rounded-3xl border border-line bg-card p-6 text-left shadow-card">
            <span className="grid size-11 place-items-center rounded-2xl bg-navy text-on-navy">
              <KeyRound className="size-5" aria-hidden="true" />
            </span>
            <span className="mt-5 block font-display text-3xl text-navy">Tenant</span>
            <span className="mt-2 block text-sm text-pretty text-muted">
              Post a residential or commercial requirement, then see properties that fit your budget, dates, and city.
            </span>
          </button>
          <button type="button" onClick={() => choose("landlord")} className="rounded-3xl border border-line bg-card p-6 text-left shadow-card">
            <span className="grid size-11 place-items-center rounded-2xl bg-brass-soft text-brass">
              <Building2 className="size-5" aria-hidden="true" />
            </span>
            <span className="mt-5 block font-display text-3xl text-navy">Landlord</span>
            <span className="mt-2 block text-sm text-pretty text-muted">
              List a home or a commercial space, add up to five photographs, and see tenant requirements that match.
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
