import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import earth from "@/assets/earth-3d.png";
import satellite from "@/assets/satellite-3d.png";
import { DownloadFunnelModal } from "@/components/DownloadFunnelModal";

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
  const sceneRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Mouse parallax
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-space text-foreground">
      {/* Starfield layers */}
      <div
        className="pointer-events-none absolute inset-0 starfield opacity-90"
        style={{ transform: `translate3d(${parallax.x * -8}px, ${parallax.y * -8}px, 0)` }}
      />
      <div
        className="pointer-events-none absolute inset-0 starfield opacity-50 animate-twinkle"
        style={{ transform: `translate3d(${parallax.x * -16}px, ${parallax.y * -16}px, 0)` }}
      />

      {/* Soft eco glow behind earth */}
      <div
        className="pointer-events-none absolute left-1/2 top-[70%] -z-0 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.2 175 / 0.45), oklch(0.65 0.18 200 / 0.18) 45%, transparent 70%)",
        }}
      />

      {/* Top bar */}
      <header className="relative z-30 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary sm:text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          ENVIROX
          <span className="mx-2 text-muted-foreground hidden sm:inline">|</span>
          <span className="text-foreground/70 hidden sm:inline">Trust Layer for E-Commerce</span>
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

      {/* Hero scene — centered stack */}
      <section
        ref={sceneRef}
        className="perspective-scene relative z-10 mx-auto flex min-h-[calc(100vh-160px)] max-w-7xl flex-col items-center justify-start px-4 pt-4 sm:pt-8"
      >
        {/* Eyebrow */}
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.45em] text-foreground/60 sm:text-xs">
          Earth Day Mission <span className="mx-3 opacity-40">|</span> Shop Honest
        </p>

        {/* Massive title */}
        <h1
          className="relative z-20 mt-6 text-center font-black uppercase leading-[0.85] tracking-tight text-foreground"
          style={{
            fontSize: "clamp(3.5rem, 16vw, 13rem)",
            textShadow:
              "0 0 60px oklch(0.78 0.18 155 / 0.45), 0 10px 40px oklch(0 0 0 / 0.6)",
            transform: `translate3d(${parallax.x * 6}px, ${parallax.y * 4}px, 0)`,
          }}
        >
          Enviro<span className="text-primary">X</span>
        </h1>

        {/* Tagline + CTA */}
        <div
          className="relative z-20 mt-4 flex flex-col items-center gap-5"
          style={{ transform: `translate3d(${parallax.x * 4}px, ${parallax.y * 3}px, 0)` }}
        >
          <p className="max-w-xl text-center text-sm text-foreground/80 sm:text-base">
            Catch greenwashing in real-time and discover verified eco-friendly
            alternatives while you shop on Amazon, Shopify, eBay & more.
          </p>
          <button
            onClick={downloadExtension}
            className="group relative inline-flex items-center gap-3 rounded-full bg-cta px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105 sm:px-10 sm:py-5 sm:text-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Extension
          </button>
          <button
            onClick={() => setSpinning((s) => !s)}
            aria-pressed={spinning}
            className="flex items-center gap-2 rounded-full border border-primary/40 bg-card/50 px-4 py-2 text-xs font-semibold text-foreground/90 backdrop-blur-md transition hover:bg-card/80"
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

        {/* Earth — centered, behind/under title */}
        <div
          className="pointer-events-none relative mt-[-2rem] flex w-full justify-center sm:mt-[-3rem]"
          style={{ transform: `translate3d(${parallax.x * -10}px, ${parallax.y * -6}px, 0)` }}
        >
          <div className="relative">
            {/* Atmospheric halo */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 m-auto h-[130%] w-[130%] animate-pulse-glow rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.78 0.2 175 / 0.55) 0%, oklch(0.65 0.18 200 / 0.22) 45%, transparent 70%)",
              }}
            />
            {/* Cyan rim */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 m-auto h-[106%] w-[106%] rounded-full blur-md"
              style={{
                background:
                  "radial-gradient(circle, transparent 62%, oklch(0.85 0.18 180 / 0.6) 73%, transparent 80%)",
              }}
            />

            {/* Earth wrapper */}
            <div className="relative animate-float-slow [transform-style:preserve-3d]">
              <div className={`earth-tilt relative ${spinning ? "animate-spin-very-slow" : ""}`}>
                <img
                  src={earth}
                  alt="EnviroX 3D Earth"
                  width={1280}
                  height={1280}
                  className="h-[340px] w-[340px] select-none drop-shadow-[0_50px_70px_rgba(0,0,0,0.7)] sm:h-[480px] sm:w-[480px] md:h-[600px] md:w-[600px] lg:h-[720px] lg:w-[720px]"
                />
              </div>
            </div>

            {/* Orbit rings */}
            <div className="pointer-events-none absolute inset-0 m-auto h-[118%] w-[118%] rounded-full border border-primary/25 animate-spin-slow" />
            <div
              className="pointer-events-none absolute inset-0 m-auto h-[138%] w-[138%] rounded-full border border-accent/15 animate-spin-slow"
              style={{ animationDirection: "reverse", animationDuration: "120s" }}
            />

            {/* Satellite orbiting */}
            <div className="pointer-events-none absolute inset-0 m-auto h-[140%] w-[140%] animate-spin-slow" style={{ animationDuration: "40s" }}>
              <img
                src={satellite}
                alt=""
                aria-hidden
                width={140}
                height={140}
                className="absolute -top-6 left-1/2 h-20 w-20 -translate-x-1/2 drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] sm:h-28 sm:w-28"
              />
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="relative z-20 mt-8 grid w-full max-w-4xl grid-cols-1 gap-3 px-2 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          {[
            { t: "Greenwashing Radar", d: "Flags vague eco-claims on product pages instantly." },
            { t: "Verified Alternatives", d: "Suggests certified eco-friendly products in real-time." },
            { t: "Works Everywhere", d: "Amazon, Shopify, eBay & more — one click install." },
          ].map((f) => (
            <div
              key={f.t}
              className="rounded-2xl border border-border/60 bg-card/30 p-4 backdrop-blur-md shadow-card-glow transition hover:border-primary/60 sm:p-5"
            >
              <p className="text-sm font-bold text-primary">{f.t}</p>
              <p className="mt-1 text-xs text-foreground/75 sm:text-sm">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom bar */}
      <footer className="relative z-20 mt-10 flex items-center justify-between px-6 pb-6 sm:px-10">
        <button className="flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-xs text-foreground/80 backdrop-blur transition hover:bg-card/70 sm:text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          Resources
        </button>
        <p className="text-[10px] text-foreground/50 sm:text-xs">
          © {new Date().getFullYear()} EnviroX · Shop Honest
        </p>
      </footer>
    </main>
  );
}
