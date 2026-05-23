import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronRight, Stethoscope, Scissors, Calendar, UtensilsCrossed, MapPin, Star, Sparkles } from "lucide-react";
import { pets, services, doctors, mealPlans } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

const serviceCards = [
  { icon: Stethoscope, label: "Vet", color: "bg-gradient-peach", to: "/doctors" },
  { icon: Scissors, label: "Grooming", color: "bg-gradient-sky", to: "/shop" },
  { icon: UtensilsCrossed, label: "Meals", color: "bg-gradient-primary", to: "/meals" },
  { icon: Calendar, label: "Events", color: "bg-accent", to: "/shop" },
];

function HomePage() {
  return (
    <div className="space-y-6 px-4">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
        <p className="text-sm text-muted-foreground">Good morning, Aanya 🌅</p>
        <h1 className="font-display text-2xl font-bold">What does Mochi need today?</h1>
      </motion.div>

      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-hero p-5 shadow-card"
      >
        <div className="relative z-10 max-w-[60%]">
          <div className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2.5 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" /> Free trial
          </div>
          <h2 className="mt-2 font-display text-xl font-bold leading-tight">
            Saturday meal trial<br />on us 🍲
          </h2>
          <p className="mt-1 text-xs text-foreground/70">Vet-formulated. Delivered fresh.</p>
          <Link
            to="/meals"
            className="mt-3 inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background"
          >
            Claim trial <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="absolute -right-4 -top-2 text-[120px] leading-none opacity-90 animate-float">🐶</div>
      </motion.div>

      {/* Service quick actions */}
      <div className="grid grid-cols-4 gap-2.5">
        {serviceCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <Link to={s.to} className="flex flex-col items-center gap-1.5">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.color} shadow-soft`}>
                <s.icon className="h-6 w-6 text-foreground" />
              </div>
              <span className="text-[11px] font-medium">{s.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Match suggestions */}
      <Section title="Pets near you" link="/matches">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {pets.slice(0, 5).map((pet) => (
            <Link
              key={pet.id}
              to="/matches"
              className="group relative w-36 flex-shrink-0 overflow-hidden rounded-2xl shadow-card"
            >
              <img src={pet.photo} alt={pet.name} className="h-48 w-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5">
                <div className="text-sm font-semibold text-white">{pet.name}</div>
                <div className="flex items-center gap-1 text-[10px] text-white/80">
                  <MapPin className="h-2.5 w-2.5" /> {pet.distance}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Nearby vendors */}
      <Section title="Nearby services" link="/shop">
        <div className="space-y-2.5">
          {services.slice(0, 3).map((s) => (
            <div key={s.id} className="flex gap-3 rounded-2xl bg-card p-2.5 shadow-soft border border-border/40">
              <img src={s.image} alt={s.name} className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-primary">{s.type}</span>
                  {s.tag && <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">{s.tag}</span>}
                </div>
                <h3 className="truncate text-sm font-semibold">{s.name}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-current text-amber-400" /> {s.rating}</span>
                  <span>·</span><span>{s.distance}</span>
                  <span>·</span><span className="font-medium text-foreground">{s.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Meal plans teaser */}
      <Section title="Subscription plans" link="/meals">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {mealPlans.map((p) => (
            <div key={p.id} className={`w-52 flex-shrink-0 rounded-2xl p-4 shadow-card ${p.popular ? "bg-gradient-primary text-primary-foreground" : "bg-card border border-border/40"}`}>
              <div className="text-xs opacity-80">{p.tagline}</div>
              <div className="font-display text-lg font-bold">{p.name}</div>
              <div className="mt-2 font-display text-2xl font-bold">₹{p.price}</div>
              <div className="text-[11px] opacity-70">₹{p.perMeal}/meal · {p.meals} meals</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Top doctors */}
      <Section title="Top vets" link="/doctors">
        <div className="space-y-2.5">
          {doctors.slice(0, 2).map((d) => (
            <div key={d.id} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft border border-border/40">
              <img src={d.avatar} alt={d.name} className="h-12 w-12 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.specialty} · {d.experience}</div>
                <div className="mt-0.5 flex items-center gap-1 text-[11px] text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> {d.available}
                </div>
              </div>
              <button className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background">Book</button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, link, children }: { title: string; link?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        {link && (
          <Link to={link} className="flex items-center gap-0.5 text-xs font-medium text-primary">
            See all <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
