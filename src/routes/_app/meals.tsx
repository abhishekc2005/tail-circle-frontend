import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, Sparkles, ChevronLeft } from "lucide-react";
import { mealPlans } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/meals")({
  component: MealsPage,
});

function MealsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 px-4 pt-2">
        <Link to="/" className="-ml-2 p-2"><ChevronLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="font-display text-2xl font-bold">Meal subscriptions</h1>
          <p className="text-xs text-muted-foreground">Fresh, vet-formulated, delivered weekly</p>
        </div>
      </div>

      {/* Trial banner */}
      <div className="mx-4 overflow-hidden rounded-3xl bg-gradient-hero p-5 shadow-card">
        <div className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2.5 py-1 text-xs font-medium backdrop-blur">
          <Sparkles className="h-3 w-3 text-primary" /> Saturday trial · Free
        </div>
        <h2 className="mt-2 font-display text-2xl font-bold leading-tight">Let Mochi try a meal on us 🥣</h2>
        <p className="mt-1 text-sm text-foreground/70">No card needed. Tell us what Mochi loves.</p>
        <button className="mt-3 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background">Book trial</button>
      </div>

      {/* Plans */}
      <div className="space-y-3 px-4">
        <h2 className="font-display text-lg font-bold">Choose a plan</h2>
        {mealPlans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`relative overflow-hidden rounded-2xl p-5 shadow-card ${
              plan.popular
                ? "bg-gradient-primary text-primary-foreground"
                : "bg-card border border-border/40"
            }`}
          >
            {plan.popular && (
              <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-primary">
                MOST POPULAR
              </div>
            )}
            <div className="text-xs opacity-80">{plan.tagline}</div>
            <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold">₹{plan.price}</span>
              <span className="text-sm opacity-70">/ month</span>
            </div>
            <div className="text-xs opacity-70">₹{plan.perMeal}/meal · {plan.meals} meals</div>

            <ul className="mt-4 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4" /> {f}
                </li>
              ))}
            </ul>

            <button
              className={`mt-4 w-full rounded-full py-2.5 text-sm font-semibold ${
                plan.popular
                  ? "bg-white text-primary"
                  : "bg-foreground text-background"
              }`}
            >
              Start {plan.name}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="px-4 pb-4 text-center text-xs text-muted-foreground">
        Pause, resume, or cancel anytime. No hidden fees.
      </div>
    </div>
  );
}
