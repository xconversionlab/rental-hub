import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, Home, Scale, Search, UserRound } from "lucide-react";
import { useEffect } from "react";
import { useHub } from "@/state/hub";
import { cn } from "@/lib/cn";

export function Logo({ tone = "navy" }: { tone?: "navy" | "paper" }) {
  const inverted = tone === "paper";
  return (
    <span className={cn("inline-flex items-center gap-2.5", inverted ? "text-paper" : "text-navy")}>
      <img
        src="/rental-hub-mark.svg"
        alt=""
        aria-hidden="true"
        className="size-10 shrink-0 rounded-[0.9rem] shadow-[0_5px_16px_rgb(8_22_40_/_0.18)] transition-transform duration-300 hover:-rotate-3 hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] tracking-tight">Rental Hub</span>
        <span className={cn("mt-1 text-[0.58rem] font-semibold tracking-[0.2em]", inverted ? "text-paper/60" : "text-muted")}>CANADA RENTALS</span>
      </span>
    </span>
  );
}

const links = [
  { to: "/home", label: "Home", icon: Home, match: ["/home"] },
  { to: "/search", label: "Search", icon: Search, match: ["/search"] },
  { to: "/matches", label: "Matches", icon: Scale, match: ["/matches"] },
  { to: "/saved", label: "Mine", icon: Building2, match: ["/requirements", "/listings", "/saved", "/segment"] },
  { to: "/profile", label: "Profile", icon: UserRound, match: ["/profile", "/legal"] },
] as const;

function NavList({ vertical }: { vertical?: boolean }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const role = useHub((state) => state.profile.role);
  return (
    <ul className={cn(vertical ? "flex flex-col gap-1.5" : "grid grid-cols-5")}>
      {links.map((item) => {
        const active = item.match.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
        const target = item.to === "/saved" ? (role === "landlord" ? "/listings" : "/requirements") : item.to;
        const Icon = item.icon;
        return (
          <li key={item.label}>
            <Link
              to={target}
              className={cn(
                "group flex min-h-11 items-center gap-2 rounded-2xl px-2 py-2 text-xs font-medium transition-all duration-200",
                vertical ? "justify-start px-3" : "flex-col justify-center",
                active ? "bg-navy text-on-navy shadow-[0_6px_16px_rgb(12_35_64_/_0.16)]" : "text-muted hover:bg-paper hover:text-navy",
              )}
            >
              <Icon className="size-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const hydrate = useHub((state) => state.hydrate);
  const storageError = useHub((state) => state.storageError);
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="min-h-screen bg-paper text-ink lg:grid lg:grid-cols-[252px_1fr]">
      <a
        href="#content"
        className="absolute -left-40 top-3 z-50 rounded-full bg-navy px-4 py-2 text-sm text-on-navy focus:left-4"
      >
        Skip to content
      </a>
      <aside className="sticky top-0 hidden h-screen flex-col gap-9 border-r border-line/80 bg-card px-5 py-7 lg:flex">
        <Link to="/home" aria-label="Rental Hub home" className="w-fit">
          <Logo />
        </Link>
        <NavList vertical />
        <div className="mt-auto rounded-2xl bg-paper p-3">
          <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-brass uppercase">Built for Canada</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">Canadian rentals in CAD. Sample records are not real vacancies.</p>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line/80 bg-paper/90 px-4 py-3 backdrop-blur-xl lg:hidden">
          <Link to="/home" aria-label="Rental Hub home">
            <Logo />
          </Link>
        </header>
        {storageError ? (
          <p role="alert" className="border-b border-line bg-danger-soft px-4 py-2 text-sm text-danger">
            {storageError}
          </p>
        ) : null}
        <main id="content" className="page-enter mx-auto w-full max-w-6xl px-4 py-6 pb-28 lg:px-8 lg:py-8 lg:pb-10">
          {children}
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line/80 bg-card/95 px-2 pt-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgb(12_35_64_/_0.06)] backdrop-blur-xl lg:hidden" aria-label="Primary">
          <NavList />
        </nav>
      </div>
    </div>
  );
}

export function useHydratedHub() {
  const hydrate = useHub((state) => state.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
}
