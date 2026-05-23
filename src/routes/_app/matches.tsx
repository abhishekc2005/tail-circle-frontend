import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { useState } from "react";
import { Heart, X, Star, MapPin, Shield, Sparkles, Info } from "lucide-react";
import { pets, type Pet } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/matches")({
  component: MatchesPage,
});

function MatchesPage() {
  const [stack, setStack] = useState(pets);
  const [lastAction, setLastAction] = useState<"like" | "pass" | null>(null);

  const handleSwipe = (dir: "like" | "pass" | "super") => {
    if (stack.length === 0) return;
    const top = stack[0];
    setLastAction(dir === "pass" ? "pass" : "like");
    if (dir === "like") toast.success(`You liked ${top.name} 💖`);
    if (dir === "super") toast.success(`Super liked ${top.name}! ⭐`);
    setStack((s) => s.slice(1));
  };

  return (
    <div className="px-4 pt-2">
      <div className="mb-3">
        <h1 className="font-display text-2xl font-bold">Discover</h1>
        <p className="text-sm text-muted-foreground">Find playmates and matches nearby</p>
      </div>

      <div className="relative mx-auto h-[520px] w-full max-w-sm">
        <AnimatePresence>
          {stack.length === 0 ? (
            <EmptyState onReset={() => setStack(pets)} />
          ) : (
            stack.slice(0, 3).reverse().map((pet, idx) => {
              const isTop = idx === stack.slice(0, 3).length - 1;
              return (
                <SwipeCard
                  key={pet.id}
                  pet={pet}
                  isTop={isTop}
                  offset={(stack.slice(0, 3).length - 1 - idx) * 8}
                  onSwipe={handleSwipe}
                />
              );
            })
          )}
        </AnimatePresence>
      </div>

      {stack.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <ActionBtn onClick={() => handleSwipe("pass")} className="bg-card border border-border" >
            <X className="h-6 w-6 text-foreground" />
          </ActionBtn>
          <ActionBtn onClick={() => handleSwipe("super")} className="bg-gradient-sky h-12 w-12">
            <Star className="h-5 w-5 fill-current text-foreground" />
          </ActionBtn>
          <ActionBtn onClick={() => handleSwipe("like")} className="bg-gradient-primary shadow-glow">
            <Heart className="h-6 w-6 fill-current text-primary-foreground" />
          </ActionBtn>
        </div>
      )}

      {lastAction && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {stack.length} more pet{stack.length === 1 ? "" : "s"} to discover
        </p>
      )}
    </div>
  );
}

function SwipeCard({ pet, isTop, offset, onSwipe }: { pet: Pet; isTop: boolean; offset: number; onSwipe: (d: "like" | "pass" | "super") => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, 0], [1, 0]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 120) onSwipe("like");
    else if (info.offset.x < -120) onSwipe("pass");
  };

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-3xl bg-card shadow-float"
      style={isTop ? { x, rotate } : { y: offset, scale: 1 - offset * 0.02 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1 - offset * 0.02, opacity: 1, y: offset }}
      exit={{ x: x.get() > 0 ? 400 : -400, opacity: 0, transition: { duration: 0.25 } }}
      whileTap={isTop ? { cursor: "grabbing" } : undefined}
    >
      <img src={pet.photo} alt={pet.name} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {isTop && (
        <>
          <motion.div style={{ opacity: likeOpacity }} className="absolute left-5 top-8 rotate-[-20deg] rounded-lg border-4 border-success px-3 py-1 font-display text-2xl font-bold text-success">
            LIKE
          </motion.div>
          <motion.div style={{ opacity: nopeOpacity }} className="absolute right-5 top-8 rotate-[20deg] rounded-lg border-4 border-destructive px-3 py-1 font-display text-2xl font-bold text-destructive">
            NOPE
          </motion.div>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-3xl font-bold">{pet.name}</h2>
              <span className="text-2xl font-light opacity-90">{pet.age}</span>
            </div>
            <p className="text-sm opacity-90">{pet.breed} · {pet.gender}</p>
          </div>
          <button className="rounded-full bg-white/20 p-2 backdrop-blur">
            <Info className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-sm opacity-95 line-clamp-2">{pet.bio}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Pill icon={MapPin}>{pet.distance}</Pill>
          <Pill icon={Sparkles}>{pet.intent}</Pill>
          {pet.vaccinated && <Pill icon={Shield}>Vaccinated</Pill>}
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-white/20 pt-2.5">
          <img src={pet.owner.avatar} alt="" className="h-7 w-7 rounded-full border border-white/40" />
          <span className="text-xs opacity-90">Owned by {pet.owner.name}</span>
        </div>
      </div>
    </motion.div>
  );
}

function Pill({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[11px] backdrop-blur">
      <Icon className="h-3 w-3" /> {children}
    </span>
  );
}

function ActionBtn({ onClick, className = "", children }: { onClick: () => void; className?: string; children: React.ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`flex h-14 w-14 items-center justify-center rounded-full shadow-card ${className}`}
    >
      {children}
    </motion.button>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-gradient-hero p-8 text-center">
      <div className="text-6xl">🐾</div>
      <h3 className="mt-3 font-display text-xl font-bold">You're all caught up!</h3>
      <p className="mt-1 text-sm text-muted-foreground">Check back later for more pets in your area.</p>
      <button onClick={onReset} className="mt-4 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background">
        Reset stack
      </button>
    </div>
  );
}
