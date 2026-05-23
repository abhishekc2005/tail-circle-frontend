import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Camera, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

const steps = ["Welcome", "About you", "Your pet", "Photos", "All set"];

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      toast.success("Welcome to Tail Circle 🎉");
      navigate({ to: "/" });
    }
  };
  const back = () => step > 0 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-6">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {step > 0 && (
            <button onClick={back} className="-ml-2 p-2"><ArrowLeft className="h-5 w-5" /></button>
          )}
          <div className="flex flex-1 gap-1.5">
            {steps.map((_, i) => (
              <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  className="h-full bg-foreground"
                  initial={false}
                  animate={{ width: i <= step ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-[11px] uppercase tracking-wider text-foreground/60">
          Step {step + 1} of {steps.length} · {steps[step]}
        </div>

        <div className="flex flex-1 flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="mt-8 flex-1"
            >
              {step === 0 && <StepWelcome />}
              {step === 1 && <StepAbout />}
              {step === 2 && <StepPet />}
              {step === 3 && <StepPhotos />}
              {step === 4 && <StepDone />}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground py-3.5 text-sm font-semibold text-background shadow-card"
        >
          {step === steps.length - 1 ? "Enter Tail Circle" : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function StepWelcome() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white/60 text-7xl animate-float">🐾</div>
      <h1 className="mt-6 font-display text-3xl font-bold leading-tight">Welcome to<br />Tail Circle</h1>
      <p className="mx-auto mt-3 max-w-xs text-sm text-foreground/70">
        The home for your pet's life — friends, food, vets, events, and beautiful memories.
      </p>
    </div>
  );
}

function StepAbout() {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl font-bold">Tell us about you</h2>
      <Input placeholder="Full name" defaultValue="Aanya Raghav" />
      <Input placeholder="Mobile number" defaultValue="+91 98XXX 43210" />
      <Input placeholder="Email" defaultValue="aanya@tailcircle.com" />
      <Input placeholder="City" defaultValue="Mumbai" />
    </div>
  );
}

function StepPet() {
  const species = ["Dog", "Cat", "Rabbit", "Bird"];
  const [sel, setSel] = useState("Dog");
  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl font-bold">About your pet</h2>
      <Input placeholder="Pet name" defaultValue="Mochi" />
      <div className="grid grid-cols-4 gap-2">
        {species.map((s) => (
          <button
            key={s}
            onClick={() => setSel(s)}
            className={`rounded-2xl py-3 text-sm font-medium transition ${
              sel === s ? "bg-foreground text-background" : "bg-white/70 text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <Input placeholder="Breed" defaultValue="Shiba Inu" />
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Age" defaultValue="2 yrs" />
        <Input placeholder="Gender" defaultValue="Female" />
      </div>
      <Input placeholder="Short bio" defaultValue="Loves morning runs and peanut butter treats" />
    </div>
  );
}

function StepPhotos() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold">Add some photos 📸</h2>
      <p className="text-sm text-foreground/70">Pets with photos get 8x more matches</p>
      <div className="grid grid-cols-3 gap-2">
        {[
          "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&q=80",
          "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80",
          null, null, null, null,
        ].map((src, i) =>
          src ? (
            <div key={i} className="aspect-square overflow-hidden rounded-2xl">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ) : (
            <button key={i} className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-foreground/20 bg-white/40">
              <Camera className="h-5 w-5 text-foreground/40" />
            </button>
          )
        )}
      </div>
    </div>
  );
}

function StepDone() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary shadow-glow"
      >
        <Check className="h-12 w-12 text-primary-foreground" strokeWidth={3} />
      </motion.div>
      <h1 className="mt-6 font-display text-3xl font-bold leading-tight">You're all set,<br />Aanya 🎉</h1>
      <p className="mx-auto mt-3 max-w-xs text-sm text-foreground/70">
        Mochi's profile is ready. Let's find playmates, vets, and treats nearby.
      </p>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl bg-white/70 px-4 py-3.5 text-sm outline-none backdrop-blur placeholder:text-foreground/50"
    />
  );
}
