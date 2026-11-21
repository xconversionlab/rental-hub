import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, Home, Scale, Search, UserRound } from "lucide-react";
import { useEffect } from "react";
import { useHub } from "@/state/hub";
import { cn } from "@/lib/cn";

export function Logo({ tone = "navy" }: { tone?: "navy" | "paper" }) {
  const inverted = tone === "paper";
  return (
    <span className={cn("inline-flex items-center gap-2", inverted ? "text-paper" : "text-navy")}>
      <span className={cn("grid size-9 place-items-center rounded-xl", inverted ? "bg-paper text-navy" : "bg-navy text-paper")}>
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path d="M4 11.5 12 5l8 6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M7 10.5V19h10v-8.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M11 19v-4h2v4" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-xl leading-none">Rental Hub</span>
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
    <ul className={cn(vertical ? "flex flex-col gap-1" : "grid grid-cols-5")}>
      {links.map((item) => {
        const active = item.match.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
        const target = item.to === "/saved" ? (role === "landlord" ? "/listings" : "/requirements") : item.to;
        const Icon = item.icon;
        return (
          <li key={item.label}>
            <Link
              to={target}
              className={cn(
                "flex min-h-11 items-center gap-2 rounded-2xl px-2 py-2 text-xs font-medium",
                vertical ? "justify-start px-3" : "flex-col justify-center",
                active ? "bg-navy text-on-navy" : "text-muted hover:bg-card hover:text-navy",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
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
    <div className="min-h-screen bg-paper text-ink lg:grid lg:grid-cols-[240px_1fr]">
      <a
        href="#content"
        className="absolute -left-40 top-3 z-50 rounded-full bg-navy px-4 py-2 text-sm text-on-navy focus:left-4"
      >
        Skip to content
      </a>
      <aside className="sticky top-0 hidden h-screen flex-col gap-8 border-r border-line bg-card px-4 py-6 lg:flex">
        <Link to="/home" aria-label="Rental Hub home">
          <Logo />
        </Link>
        <NavList vertical />
        <p className="mt-auto text-xs text-pretty text-muted">Canadian rentals in CAD. Sample records are not real vacancies.</p>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
          <Link to="/home" aria-label="Rental Hub home">
            <Logo />
          </Link>
        </header>
        {storageError ? (
          <p role="alert" className="border-b border-line bg-danger-soft px-4 py-2 text-sm text-danger">
            {storageError}
          </p>
        ) : null}
        <main id="content" className="mx-auto w-full max-w-6xl px-4 py-6 pb-28 lg:px-8 lg:pb-10">
          {children}
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-card px-2 pt-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] lg:hidden" aria-label="Primary">
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
