import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/shell";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/")({ component: Splash });

function Splash() {
  const navigate = useNavigate();
  const profile = useHub((state) => state.profile);
  const hydrated = useHub((state) => state.hydrated);

  return (
    <main className="flex min-h-screen flex-col bg-navy px-6 py-8 text-on-navy">
      <Logo tone="paper" />
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-12">
        <p className="text-xs font-medium tracking-widest text-brass-soft uppercase">Canada · Residential and commercial</p>
        <h1 className="mt-3 font-display text-5xl text-balance text-paper">A quieter way to rent, from St. John's to Victoria.</h1>
        <p className="mt-4 max-w-md text-pretty text-paper/80">
          Tenants post what they need. Landlords list what is free. Prices are in Canadian dollars, across every province and territory.
        </p>
        <dl className="mt-8 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl border border-paper/25 px-3 py-3">
            <dt className="text-paper/70">Currency</dt>
            <dd className="mt-1 font-medium">CAD</dd>
          </div>
          <div className="rounded-2xl border border-paper/25 px-3 py-3">
            <dt className="text-paper/70">Active for</dt>
            <dd className="mt-1 font-medium">60 days</dd>
          </div>
          <div className="rounded-2xl border border-paper/25 px-3 py-3">
            <dt className="text-paper/70">Photos</dt>
            <dd className="mt-1 font-medium">Up to 5</dd>
          </div>
        </dl>
      </div>
      <div className="mx-auto w-full max-w-lg">
        <button
          type="button"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-paper px-5 text-sm font-medium text-navy"
          onClick={() => {
            if (hydrated && profile.onboarded && profile.role) {
              void navigate({ to: "/home" });
              return;
            }
            void navigate({ to: "/welcome" });
          }}
        >
          Continue
        </button>
        <p className="mt-3 text-center text-xs text-paper/60">Sample records in this preview are not real listings.</p>
      </div>
    </main>
  );
}
