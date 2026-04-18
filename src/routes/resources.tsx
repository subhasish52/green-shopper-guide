import { createFileRoute, Link } from "@tanstack/react-router";

const PDF_URL =
  "https://docs.google.com/document/d/1ONy_PfUJff25KOA5DbgiqZmjm8vk-1zs788zi94DsW4/export?format=pdf";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "EnviroX Resources — How Greenwashing Detection Works" },
      {
        name: "description",
        content:
          "Learn how EnviroX detects greenwashing in real-time: AI-driven analysis, confidence scoring, real test results, and a smart eco-friendly recommendation engine.",
      },
      { property: "og:title", content: "EnviroX Resources — How It Works" },
      {
        property: "og:description",
        content:
          "Deep dive into EnviroX: data extraction, AI analysis, confidence scoring formula, real test cases, and verified product recommendations.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-space text-foreground">
      <div className="pointer-events-none absolute inset-0 starfield opacity-80" />
      <div className="pointer-events-none absolute inset-0 starfield opacity-40 animate-twinkle" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[700px] w-[1000px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.2 175 / 0.35), oklch(0.65 0.18 200 / 0.12) 45%, transparent 70%)",
        }}
      />

      {/* Top bar */}
      <header className="relative z-30 flex items-center justify-between px-6 py-5 sm:px-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary sm:text-sm"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          ENVIROX
        </Link>
        <nav className="flex items-center gap-3 text-xs sm:text-sm">
          <Link
            to="/"
            className="rounded-full border border-border/60 bg-card/40 px-4 py-2 text-foreground/80 backdrop-blur transition hover:bg-card/70"
          >
            ← Home
          </Link>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 font-bold text-primary-foreground shadow-lg transition hover:scale-105"
          >
            📄 Download PDF
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-10 pb-12 text-center sm:pt-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/40 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary backdrop-blur">
          🌿 Resources
        </span>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-foreground sm:text-6xl">
          About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">EnviroX</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
          An intelligent browser extension that detects greenwashing in real-time
          while you shop online — powered by evidence, not marketing labels.
        </p>
      </section>

      {/* Content */}
      <section className="relative z-10 mx-auto max-w-4xl space-y-6 px-6 pb-24">
        <Card emoji="🌱" title="About EnviroX">
          <p>
            EnviroX is an intelligent browser extension designed to detect
            greenwashing in real-time while you shop online.
          </p>
          <p>
            It analyzes product claims, ingredients, certifications, and user
            reviews to determine whether a product's "eco-friendly" or
            "natural" claims are actually genuine or misleading.
          </p>
          <p>
            Unlike traditional tools, EnviroX focuses on{" "}
            <strong className="text-primary">evidence-based verification</strong>,
            not marketing labels.
          </p>
        </Card>

        <Card emoji="⚙️" title="How EnviroX Works">
          <p>EnviroX operates through a multi-layer AI-driven system:</p>

          <SubBlock emoji="🔍" title="1. Data Extraction">
            <p>The extension extracts:</p>
            <ul className="ml-5 list-disc space-y-1 text-foreground/80">
              <li>Product title and description</li>
              <li>Ingredient lists</li>
              <li>Customer reviews</li>
              <li>Product images</li>
            </ul>
          </SubBlock>

          <SubBlock emoji="🤖" title="2. AI-Based Analysis">
            <p>The extracted data is analyzed to detect:</p>
            <ul className="ml-5 list-disc space-y-1 text-foreground/80">
              <li>Misleading eco-claims</li>
              <li>Ingredient contradictions</li>
              <li>Fake or missing certifications</li>
              <li>Inconsistencies between claims and reviews</li>
            </ul>
          </SubBlock>

          <SubBlock emoji="📊" title="3. Confidence Scoring System">
            <p>Each product is assigned a Greenwashing Confidence Score (0–100):</p>
            <div className="grid gap-2 sm:grid-cols-3">
              <Badge tone="green" label="0–33" sub="Low Risk · Likely Genuine" />
              <Badge tone="amber" label="34–66" sub="Medium Risk · Possible Exaggeration" />
              <Badge tone="red" label="67–100" sub="High Risk · Likely Greenwashing" />
            </div>
          </SubBlock>
        </Card>

        <Card emoji="🧠" title="How the Confidence Score is Calculated">
          <p>EnviroX uses a weighted mathematical model:</p>
          <pre className="overflow-x-auto rounded-2xl border border-border/60 bg-background/60 p-4 text-sm text-primary">
{`C = (0.80·Sᵢ + 0.10·Sc + 0.05·Sr + 0.05·So) × 100`}
          </pre>
          <p>Where:</p>
          <ul className="ml-5 list-disc space-y-1 text-foreground/80">
            <li><strong>Sᵢ</strong> → Ingredient contradictions</li>
            <li><strong>Sc</strong> → Certification validity</li>
            <li><strong>Sr</strong> → Review-based contradictions</li>
            <li><strong>So</strong> → OCR-based claim detection</li>
          </ul>

          <SubBlock emoji="⚖️" title="Weight Distribution">
            <ul className="ml-5 list-disc space-y-1 text-foreground/80">
              <li>Ingredients → <strong>80%</strong> (most important)</li>
              <li>Certifications → <strong>10%</strong></li>
              <li>Reviews → <strong>5%</strong></li>
              <li>Image claims → <strong>5%</strong></li>
            </ul>
            <p className="text-foreground/70">
              This ensures decisions are based primarily on factual composition,
              not just marketing claims.
            </p>
          </SubBlock>
        </Card>

        <Card emoji="🔬" title="Real Test Results">
          <Scenario
            status="ok"
            label="Scenario 1 — No Eco Claims"
            product="Amazon Smart Plug"
            result="No Eco-Claims Detected"
            insight="Product made no sustainability claims, so no misleading behavior detected."
          />
          <Scenario
            status="ok"
            label="Scenario 2 — Verified Organic Product"
            product="Organic Face Wash"
            result="No Major Issues Found · Confidence Score: 10% (Low Risk)"
            insight="Claims aligned with ingredients, but limited external validation."
          />
          <Scenario
            status="ok"
            label="Scenario 3 — Fully Verified Product"
            product="Organic Soap"
            result="100% Confidence (Genuine)"
            insight="Supported by valid certifications and no contradictory reviews."
          />
          <Scenario
            status="bad"
            label="Scenario 4 — Greenwashing Detected"
            product='"100% Natural" Shampoo'
            result="85% Confidence (High Risk)"
            insight="Synthetic chemicals (SLS, etc.). Strong contradiction between marketing and composition."
          />
        </Card>

        <Card emoji="💡" title="Smart Recommendation Engine">
          <p>When a product is flagged, EnviroX automatically suggests:</p>
          <ul className="ml-5 list-disc space-y-1 text-foreground/80">
            <li>✅ Top 3 verified alternatives</li>
            <li>💰 Within ±₹100 price range</li>
            <li>🔍 Based on trust, not popularity</li>
          </ul>
          <SubBlock emoji="📈" title="Ranking Factors">
            <ul className="ml-5 list-disc space-y-1 text-foreground/80">
              <li>Lower greenwashing score</li>
              <li>Strong verification evidence</li>
              <li>Price similarity</li>
            </ul>
            <p className="text-foreground/70">
              This ensures users get better, safer alternatives instantly.
            </p>
          </SubBlock>
        </Card>

        <Card emoji="⚡" title="Optimization & Performance">
          <div className="grid gap-3 sm:grid-cols-2">
            <Stat value="< 6s" label="Average analysis time" />
            <Stat value="~$0.02" label="Cost per analysis" />
            <Stat value="Smart cache" label="Avoids re-analysis" />
            <Stat value="Instant reuse" label="Verified products reused" />
          </div>
        </Card>

        <Card emoji="🔐" title="Transparency First">
          <p>EnviroX clearly shows:</p>
          <ul className="ml-5 list-disc space-y-1 text-foreground/80">
            <li>Why a product was flagged</li>
            <li>What evidence was used</li>
            <li>When it was last verified</li>
          </ul>
          <p className="text-primary">We believe trust comes from explainability.</p>
        </Card>

        {/* CTA */}
        <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-card/80 to-card/40 p-8 text-center backdrop-blur-xl">
          <h3 className="text-2xl font-black text-foreground sm:text-3xl">
            📥 Download Full Research & Results
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-foreground/70">
            Want to dive deeper into the system architecture, formulas, and test
            cases? Download the complete documentation.
          </p>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-bold text-primary-foreground shadow-xl transition hover:scale-105"
          >
            📄 Download Documentation (PDF)
          </a>
        </div>
      </section>
    </main>
  );
}

function Card({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-xl backdrop-blur-xl sm:p-8">
      <h2 className="flex items-center gap-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
        <span className="text-3xl">{emoji}</span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function SubBlock({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/40 p-4 sm:p-5">
      <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
        <span>{emoji}</span> {title}
      </h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

function Badge({
  tone,
  label,
  sub,
}: {
  tone: "green" | "amber" | "red";
  label: string;
  sub: string;
}) {
  const toneMap = {
    green: "border-primary/40 bg-primary/10 text-primary",
    amber: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    red: "border-red-400/40 bg-red-400/10 text-red-300",
  };
  return (
    <div className={`rounded-2xl border p-3 text-center ${toneMap[tone]}`}>
      <div className="text-xl font-black">{label}</div>
      <div className="mt-1 text-xs opacity-90">{sub}</div>
    </div>
  );
}

function Scenario({
  status,
  label,
  product,
  result,
  insight,
}: {
  status: "ok" | "bad";
  label: string;
  product: string;
  result: string;
  insight: string;
}) {
  const dot = status === "ok" ? "bg-primary" : "bg-red-400";
  return (
    <div className="rounded-2xl border border-border/40 bg-background/40 p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot}`} />
        <h3 className="text-base font-bold text-foreground sm:text-lg">{label}</h3>
      </div>
      <dl className="mt-3 space-y-1 text-sm">
        <div><dt className="inline font-semibold text-foreground/60">Product: </dt><dd className="inline text-foreground/90">{product}</dd></div>
        <div><dt className="inline font-semibold text-foreground/60">Result: </dt><dd className="inline text-foreground/90">{result}</dd></div>
        <div><dt className="inline font-semibold text-foreground/60">Insight: </dt><dd className="inline text-foreground/80">{insight}</dd></div>
      </dl>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/40 p-4 text-center">
      <div className="text-2xl font-black text-primary">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-foreground/60">
        {label}
      </div>
    </div>
  );
}
