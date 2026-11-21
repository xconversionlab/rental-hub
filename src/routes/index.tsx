import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/shell";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/")({ component: Splash });

function Splash() {
  const navigate = useNavigate();
  const profile = useHub((state) => state.profile);
  const hydrated = useHub((state) => state.hydrated);

  return (
    <main className="splash-screen flex min-h-screen flex-col bg-navy px-6 py-8 text-on-navy">
      <div className="splash-content">
        <Logo tone="paper" />
      </div>
      <div className="splash-content mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-12">
        <div className="brand-float mb-7 grid size-16 place-items-center self-start rounded-[1.35rem] border border-paper/15 bg-paper/5 p-2 shadow-[0_18px_40px_rgb(0_0_0_/_0.12)]">
          <img src="/rental-hub-mark.svg" alt="" aria-hidden="true" className="size-full rounded-xl" />
        </div>
        <p className="text-xs font-semibold tracking-[0.22em] text-brass-soft uppercase">Canada · Residential and commercial</p>
        <h1 className="mt-4 max-w-xl font-display text-5xl leading-[1.05] text-balance text-paper sm:text-6xl">A quieter way to rent, from St. John's to Victoria.</h1>
        <p className="mt-5 max-w-md text-pretty leading-relaxed text-paper/75">
          Tenants post what they need. Landlords list what is free. Prices are in Canadian dollars, across every province and territory.
        </p>
        <dl className="mt-9 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl border border-paper/15 bg-paper/[0.04] px-3 py-3 backdrop-blur-sm">
            <dt className="text-paper/60">Currency</dt>
            <dd className="mt-1 font-medium">CAD</dd>
          </div>
          <div className="rounded-2xl border border-paper/15 bg-paper/[0.04] px-3 py-3 backdrop-blur-sm">
            <dt className="text-paper/60">Active for</dt>
            <dd className="mt-1 font-medium">60 days</dd>
          </div>
          <div className="rounded-2xl border border-paper/15 bg-paper/[0.04] px-3 py-3 backdrop-blur-sm">
            <dt className="text-paper/60">Photos</dt>
            <dd className="mt-1 font-medium">Up to 5</dd>
          </div>
        </dl>
      </div>
      <div className="splash-content mx-auto w-full max-w-lg">
        <button
          type="button"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-paper px-5 text-sm font-semibold text-navy shadow-[0_12px_28px_rgb(0_0_0_/_0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_34px_rgb(0_0_0_/_0.25)] active:translate-y-0"
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
        <p className="mt-3 text-center text-xs text-paper/55">Sample records in this preview are not real listings.</p>
      </div>
    </main>
  );
}
