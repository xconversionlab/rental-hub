import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/shell";
import { buttonClasses } from "@/components/button";

export const Route = createFileRoute("/welcome")({ component: Welcome });

const slides = [
  {
    kicker: "01",
    title: "One desk for a home or a workplace.",
    body: "Residential and commercial rentals live in the same marketplace, with separate forms so a condo search never mixes with a warehouse.",
  },
  {
    kicker: "02",
    title: "Every province. Canadian dollars.",
    body: "Filter by province and city, budget or rent, property type, area, term, and the date a place is free.",
  },
  {
    kicker: "03",
    title: "Requirements and listings last 60 days.",
    body: "After that they are marked unavailable. They are not deleted here. Profiles and verification notes are kept until you remove them.",
  },
];

function Welcome() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const last = index === slides.length - 1;

  return (
    <main className="flex min-h-screen flex-col bg-paper px-6 py-8 text-ink">
      <Logo />
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-10">
        <p className="text-xs font-medium tracking-widest text-brass uppercase">{slide.kicker} / 03</p>
        <h1 className="mt-3 font-display text-4xl text-balance text-navy">{slide.title}</h1>
        <p className="mt-4 text-pretty text-muted">{slide.body}</p>
        <div className="mt-8 flex gap-2" aria-hidden="true">
          {slides.map((item, itemIndex) => (
            <span key={item.kicker} className={itemIndex === index ? "h-1.5 w-8 rounded-full bg-navy" : "h-1.5 w-4 rounded-full bg-line"} />
          ))}
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-lg gap-3">
        {index > 0 ? (
          <button type="button" className={buttonClasses("secondary", "flex-1")} onClick={() => setIndex((value) => value - 1)}>
            Back
          </button>
        ) : null}
        {last ? (
          <Link to="/role" className={buttonClasses("primary", "flex-1")}>
            Choose a role
          </Link>
        ) : (
          <button type="button" className={buttonClasses("primary", "flex-1")} onClick={() => setIndex((value) => value + 1)}>
            Next
          </button>
        )}
      </div>
    </main>
  );
}
