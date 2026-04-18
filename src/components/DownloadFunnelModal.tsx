import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { z } from "zod";

interface DownloadFunnelModalProps {
  open: boolean;
  onClose: () => void;
}

type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | "success";

const DOWNLOAD_URL =
  "https://drive.usercontent.google.com/download?id=1voeK6RjYygzLMSkBG39H9vIhwcJUBa7Z&export=download";

const formSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(80, "Too long"),
  email: z.string().trim().email("Enter a valid email").max(160, "Too long"),
});

// Question steps used for progress (excludes form & success)
const QUESTION_STEPS: StepId[] = [1, 3, 4, 5, 6, 7];

export function DownloadFunnelModal({ open, onClose }: DownloadFunnelModalProps) {
  const [step, setStep] = useState<StepId>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Reset on open
  useEffect(() => {
    if (open) {
      setStep(1);
      setName("");
      setEmail("");
      setErrors({});
      setSubmitting(false);
      setMounted(true);
    } else {
      const t = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Esc to close + lock scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const fireConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#34d399", "#22d3ee", "#a7f3d0", "#67e8f9"],
    });
  };

  const goToForm = () => setStep(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse({ name, email });
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string } = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as "name" | "email";
        fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulate brief processing for UX feedback
    setTimeout(() => {
      setSubmitting(false);
      setStep(3);
    }, 700);
  };

  const goToSuccess = () => {
    setStep("success");
    setTimeout(fireConfetti, 150);
  };

  // Progress
  const progressIndex =
    step === 2 || step === "success"
      ? QUESTION_STEPS.length
      : QUESTION_STEPS.indexOf(step as StepId) + 1;
  const progressPct = (progressIndex / QUESTION_STEPS.length) * 100;

  if (!mounted && !open) return null;

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
      />

      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="funnel-title"
        className={`relative w-full max-w-lg rounded-3xl border border-primary/30 bg-card/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8 transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          boxShadow:
            "0 30px 80px -20px oklch(0.78 0.18 155 / 0.35), 0 0 0 1px oklch(0.85 0.18 195 / 0.15)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/60 text-foreground/70 transition hover:bg-background hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Progress bar */}
        {step !== "success" && (
          <div className="mb-6 mt-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/50">
              {step === 2 ? "Almost there" : `Step ${progressIndex} of ${QUESTION_STEPS.length}`}
            </p>
          </div>
        )}

        {/* Step content */}
        <div key={String(step)} className="animate-in fade-in slide-in-from-right-4 duration-300">
          {step === 1 && (
            <StepShell
              title="Do you want to save the environment?"
              subtitle="One quick question before you download."
            >
              <ChoiceRow
                primary={{ label: "Yes 🌱", onClick: goToForm }}
                secondary={{ label: "No", onClick: () => setStep(4) }}
              />
            </StepShell>
          )}

          {step === 2 && (
            <StepShell
              title="Good. Let's make sure you don't get fooled while doing it."
              subtitle="Just your name and email — we'll send your download."
            >
              <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/70">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                    placeholder="Jane Doe"
                    disabled={submitting}
                    className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/70">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={160}
                    placeholder="jane@example.com"
                    disabled={submitting}
                    className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-4 text-base font-bold text-primary-foreground shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:opacity-80 disabled:hover:scale-100"
                >
                  {submitting ? (
                    <>
                      <Spinner /> Processing…
                    </>
                  ) : (
                    <>Continue →</>
                  )}
                </button>
              </form>
            </StepShell>
          )}

          {step === 3 && (
            <StepShell
              title="Would you pay for unlimited scans and deeper product insights?"
              subtitle="Help us build the trust layer for e-commerce."
            >
              <ChoiceRow
                primary={{ label: "Yes, count me in", onClick: goToSuccess }}
                secondary={{ label: "No", onClick: () => setStep(4) }}
              />
            </StepShell>
          )}

          {step === 4 && (
            <StepShell
              title="Fair. But you're still buying products."
              subtitle="Do you at least want to know if you're getting fooled?"
            >
              <ChoiceRow
                primary={{ label: "Yes, show me", onClick: goToForm }}
                secondary={{ label: "Nope", onClick: () => setStep(5) }}
              />
            </StepShell>
          )}

          {step === 5 && (
            <StepShell
              title="So you're okay paying for things…"
              subtitle="…without knowing what they actually are?"
            >
              <ChoiceRow
                primary={{ label: "Okay, fine", onClick: goToForm }}
                secondary={{ label: "Still no", onClick: () => setStep(6) }}
              />
            </StepShell>
          )}

          {step === 6 && (
            <StepShell
              title="Alright. Last chance."
              subtitle="Do you want early access before everyone else figures this out?"
            >
              <ChoiceRow
                primary={{ label: "Yes, early access", onClick: goToForm }}
                secondary={{ label: "No", onClick: () => setStep(7) }}
              />
            </StepShell>
          )}

          {step === 7 && (
            <StepShell
              title="You'll probably come back later anyway."
              subtitle="Save yourself the trip."
            >
              <button
                onClick={goToForm}
                className="mt-2 w-full rounded-full bg-gradient-to-r from-primary to-accent px-6 py-4 text-base font-bold text-primary-foreground shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
              >
                Fine. Give me access →
              </button>
            </StepShell>
          )}

          {step === "success" && (
            <div className="py-4 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-3xl shadow-lg animate-pulse-glow">
                🎉
              </div>
              <h2 id="funnel-title" className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Hurray! You're in!
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm text-foreground/70 sm:text-base">
                {name ? `Thanks, ${name.split(" ")[0]}. ` : ""}You now have early access. Your download is ready.
              </p>
              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={fireConfetti}
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-bold text-primary-foreground shadow-xl transition hover:scale-105"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Now
              </a>
              <p className="mt-4 text-xs text-foreground/50">
                Download didn't start?{" "}
                <a href={DOWNLOAD_URL} className="text-primary underline" target="_blank" rel="noopener noreferrer">
                  Click here
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 id="funnel-title" className="text-2xl font-black leading-tight tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-sm text-foreground/70 sm:text-base">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function ChoiceRow({
  primary,
  secondary,
}: {
  primary: { label: string; onClick: () => void };
  secondary: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={primary.onClick}
        className="flex-1 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-4 text-base font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03] hover:shadow-xl"
      >
        {primary.label}
      </button>
      <button
        onClick={secondary.onClick}
        className="flex-1 rounded-full border border-border/60 bg-background/40 px-6 py-4 text-base font-semibold text-foreground/80 transition hover:border-primary/50 hover:bg-background/70"
      >
        {secondary.label}
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M21 12a9 9 0 1 1-6.2-8.55" />
    </svg>
  );
}
