import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Settings, Wallet, Bookmark, Calendar, Bell, Shield, HelpCircle, LogOut, ChevronRight, Edit2, Heart } from "lucide-react";
import { pets } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});

const stats = [
  { label: "Matches", value: 12 },
  { label: "Posts", value: 34 },
  { label: "Following", value: 248 },
];

const menu = [
  { icon: Wallet, label: "Wallet", value: "₹2,450", to: "/profile" },
  { icon: Calendar, label: "My bookings", value: "3 active", to: "/profile" },
  { icon: Bookmark, label: "Saved items", value: "18", to: "/profile" },
  { icon: Heart, label: "Subscriptions", value: "1 plan", to: "/meals" },
  { icon: Bell, label: "Notifications", to: "/notifications" },
  { icon: Shield, label: "Privacy & safety", to: "/profile" },
  { icon: HelpCircle, label: "Help center", to: "/profile" },
];

function ProfilePage() {
  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-hero" />
        <div className="px-4">
          <div className="-mt-12 flex items-end justify-between">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/200?img=1"
                alt="Aanya"
                className="h-24 w-24 rounded-full border-4 border-background object-cover shadow-card"
              />
              <button className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background shadow">
                <Edit2 className="h-3 w-3" />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-soft">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3">
            <h1 className="font-display text-2xl font-bold">Aanya Raghav</h1>
            <p className="text-sm text-muted-foreground">Mumbai · Pet parent of Mochi 🐕</p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl bg-card p-3 shadow-soft border border-border/40">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-xl font-bold">{s.value}</div>
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My pets */}
      <div className="px-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">My pets</h2>
          <button className="text-xs font-medium text-primary">+ Add pet</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {pets.slice(0, 2).map((pet, i) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-56 flex-shrink-0 overflow-hidden rounded-2xl bg-card shadow-card border border-border/40"
            >
              <img src={pet.photo} alt={pet.name} className="h-32 w-full object-cover" />
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold">{pet.name}</h3>
                  <span className="text-xs text-muted-foreground">{pet.age}</span>
                </div>
                <p className="text-xs text-muted-foreground">{pet.breed}</p>
                <div className="mt-2 flex gap-1">
                  {pet.temperament.slice(0, 2).map((t) => (
                    <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4">
        <div className="overflow-hidden rounded-2xl bg-card shadow-soft border border-border/40">
          {menu.map((m, i) => (
            <Link
              key={m.label}
              to={m.to}
              className={`flex items-center gap-3 px-4 py-3.5 transition hover:bg-muted/50 ${i > 0 ? "border-t border-border/40" : ""}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                <m.icon className="h-4 w-4" />
              </div>
              <span className="flex-1 text-sm font-medium">{m.label}</span>
              {m.value && <span className="text-xs text-muted-foreground">{m.value}</span>}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>

        <Link
          to="/login"
          className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </Link>
      </div>
    </div>
  );
}
