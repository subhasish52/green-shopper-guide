import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import earth from "@/assets/earth-3d.png";
import satellite from "@/assets/satellite-3d.png";
import enviroxTitle from "@/assets/envirox-title.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EnviroX — Catch Greenwashing While You Shop" },
      {
        name: "description",
        content:
          "EnviroX is a Chrome extension that flags greenwashing and recommends verified eco-friendly alternatives in real-time on every e-commerce site.",
      },
      { property: "og:title", content: "EnviroX — Catch Greenwashing While You Shop" },
      {
        property: "og:description",
        content:
          "Real-time greenwashing detection and verified eco-friendly product suggestions while you shop online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function downloadExtension() {
  fetch("/envirox-extension.zip")
    .then((res) => {
      if (!res.ok) throw new Error(`Download failed: ${res.status}`);
      return res.blob();
    })
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "envirox-extension.zip";
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch((err) => alert(err.message));
}

function Index() {
  const [spinning, setSpinning] = useState(true);
  return (
    <main className="relative min-h-screen overflow-hidden bg-space text-foreground">
      {/* Starfield layers */}
      <div className="pointer-events-none absolute inset-0 starfield opacity-90" />
      <div className="pointer-events-none absolute inset-0 starfield opacity-50 animate-twinkle" />

      {/* Soft eco glow */}
      <div className="pointer-events-none absolute left-1/2 top-[55%] -z-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.75 0.2 155 / 0.35), transparent 65%)" }} />

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-widest text-primary">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          ENVIROX RESEARCH
          <span className="mx-2 text-muted-foreground">|</span>
          <span className="text-foreground/80">Stanford Accelerator for Sustainability</span>
        </div>
        <button
          aria-label="Toggle sound"
          className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/40 text-foreground/80 backdrop-blur transition hover:bg-card/70"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </button>
      </header>

      {/* Hero scene */}
      <section className="perspective-scene relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pb-32 pt-6 sm:pb-40">
        {/* Satellite + mission card (top-left) */}
        <div className="pointer-events-none absolute left-2 top-2 hidden md:block lg:left-10">
          <div className="relative">
            <img
              src={satellite}
              alt="EnviroX satellite scanning Earth"
              width={220}
              height={220}
              className="relative z-10 h-44 w-44 animate-float-orbit drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] lg:h-56 lg:w-56"
            />
            {/* scanning beam */}
            <div
              className="absolute left-16 top-24 h-72 w-44 origin-top -rotate-12 animate-beam blur-md lg:left-20 lg:top-28 lg:h-96 lg:w-56"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.8 0.2 155 / 0.55), transparent 80%)",
                clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
              }}
            />
          </div>

          <div className="pointer-events-auto mt-2 max-w-xs rounded-xl border border-primary/40 bg-card/30 p-5 backdrop-blur-md shadow-card-glow tilt-card">
            <p className="text-[11px] font-bold tracking-[0.25em] text-primary">
              EARTH DAY MISSION
            </p>
            <p className="mt-2 text-xs leading-relaxed text-foreground/80">
              Step into the shoes of a conscious shopper — let EnviroX expose greenwashing and reveal verified alternatives.
            </p>
            <button
              onClick={downloadExtension}
              className="mt-4 inline-flex items-center justify-center rounded-full border border-primary/70 bg-transparent px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-primary/15"
            >
              Launch Mission
            </button>
          </div>
        </div>

        {/* Title block */}
        <div className="relative z-10 mt-4 flex w-full flex-col items-center text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-foreground/70">
            EnviroX Research <span className="mx-3 opacity-40">|</span> Trust Layer for E-Commerce
          </p>
          <h1 className="sr-only">EnviroX — Real-time greenwashing detection</h1>
          <img
            src={enviroxTitle}
            alt="EnviroX"
            width={1600}
            height={640}
            className="mx-auto w-[78%] max-w-3xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] sm:w-[70%]"
          />
          <p className="mt-2 text-2xl font-extrabold uppercase tracking-[0.3em] text-foreground/90 sm:text-3xl">
            Shop Honest
          </p>
        </div>

        {/* Earth + CTA */}
        <div className="relative mt-10 flex w-full justify-center">
          <div className="relative perspective-scene">
            {/* Outer atmospheric halo */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 m-auto h-[140%] w-[140%] animate-pulse-glow rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.78 0.2 175 / 0.55) 0%, oklch(0.65 0.18 200 / 0.25) 40%, transparent 70%)",
              }}
            />
            {/* Inner cyan rim glow */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 m-auto h-[108%] w-[108%] rounded-full blur-md"
              style={{
                background:
                  "radial-gradient(circle, transparent 60%, oklch(0.82 0.18 180 / 0.55) 72%, transparent 80%)",
              }}
            />

            {/* Earth wrapper for tilt + rotation */}
            <div className="relative animate-float-slow [transform-style:preserve-3d]">
              <div
                className={`earth-tilt relative ${spinning ? "animate-spin-very-slow" : ""}`}
              >
                <img
                  src={earth}
                  alt="3D Earth"
                  width={1280}
                  height={1280}
                  className="h-[420px] w-[420px] select-none drop-shadow-[0_60px_80px_rgba(0,0,0,0.75)] sm:h-[600px] sm:w-[600px] md:h-[760px] md:w-[760px] lg:h-[860px] lg:w-[860px]"
                />
                {/* Sphere shading overlay for extra 3D depth */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full mix-blend-overlay"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, oklch(1 0 0 / 0.35) 0%, transparent 38%), radial-gradient(circle at 72% 78%, oklch(0.05 0.05 240 / 0.6) 0%, transparent 55%)",
                  }}
                />
                {/* Atmosphere ring on sphere edge */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    boxShadow:
                      "inset 0 0 80px 10px oklch(0.85 0.18 180 / 0.4), inset -40px -40px 100px 0 oklch(0.05 0.05 240 / 0.5)",
                  }}
                />
              </div>
            </div>

            {/* Orbit rings */}
            <div className="pointer-events-none absolute inset-0 m-auto h-[118%] w-[118%] -translate-y-2 rounded-full border border-primary/25 animate-spin-slow" />
            <div
              className="pointer-events-none absolute inset-0 m-auto h-[135%] w-[135%] rounded-full border border-accent/15 animate-spin-slow"
              style={{ animationDirection: "reverse", animationDuration: "120s" }}
            />

            {/* Accept mission CTA */}
            <button
              onClick={downloadExtension}
              className="absolute left-1/2 top-[20%] z-20 -translate-x-1/2 rounded-full bg-cta px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105 sm:px-10 sm:py-5 sm:text-lg"
            >
              Download Extension
            </button>

            {/* Rotate on command */}
            <button
              onClick={() => setSpinning((s) => !s)}
              aria-pressed={spinning}
              className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/40 bg-card/50 px-4 py-2 text-xs font-semibold text-foreground/90 backdrop-blur-md transition hover:bg-card/80 sm:bottom-8 sm:text-sm"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={spinning ? "animate-spin-slow" : ""}
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              {spinning ? "Pause Rotation" : "Rotate Earth"}
            </button>
          </div>
        </div>

        {/* Feature pills */}
        <div className="relative z-10 mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 px-4 sm:grid-cols-3">
          {[
            { t: "Greenwashing Radar", d: "Flags vague eco-claims on product pages instantly." },
            { t: "Verified Alternatives", d: "Suggests certified eco-friendly products in real-time." },
            { t: "Works Everywhere", d: "Amazon, Shopify, eBay & more — one click install." },
          ].map((f) => (
            <div
              key={f.t}
              className="rounded-2xl border border-border/60 bg-card/30 p-5 backdrop-blur-md shadow-card-glow transition hover:border-primary/60"
            >
              <p className="text-sm font-bold text-primary">{f.t}</p>
              <p className="mt-1 text-sm text-foreground/75">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom bar */}
      <footer className="relative z-20 flex items-center justify-between px-6 pb-6 sm:px-10">
        <button className="flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm text-foreground/80 backdrop-blur transition hover:bg-card/70">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          Resources & more
        </button>
        <button className="flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm text-foreground/80 backdrop-blur transition hover:bg-card/70">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          English (US)
        </button>
      </footer>
    </main>
  );
}
