import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Star, Video, Home as HomeIcon, MapPin, ChevronLeft, AlertCircle } from "lucide-react";
import { doctors } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/doctors")({
  component: DoctorsPage,
});

function DoctorsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-4 pt-2">
        <Link to="/" className="-ml-2 p-2"><ChevronLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="font-display text-2xl font-bold">Vets & Doctors</h1>
          <p className="text-xs text-muted-foreground">Book in-clinic, home or video consults</p>
        </div>
      </div>

      {/* Consult type cards */}
      <div className="grid grid-cols-3 gap-2 px-4">
        <ConsultType icon={MapPin} label="Clinic" color="bg-gradient-sky" />
        <ConsultType icon={HomeIcon} label="Home" color="bg-gradient-peach" />
        <ConsultType icon={Video} label="Video" color="bg-gradient-primary" />
      </div>

      {/* Emergency */}
      <div className="mx-4 flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/15">
          <AlertCircle className="h-5 w-5 text-destructive" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">Pet emergency?</div>
          <div className="text-xs text-muted-foreground">24/7 line · response in &lt; 2 min</div>
        </div>
        <button className="rounded-full bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground">Call</button>
      </div>

      {/* Doctors list */}
      <div className="space-y-3 px-4 pb-4">
        <h2 className="font-display text-lg font-bold">Top rated vets</h2>
        {doctors.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-2xl bg-card p-3 shadow-soft border border-border/40"
          >
            <div className="flex items-start gap-3">
              <img src={d.avatar} alt={d.name} className="h-14 w-14 rounded-2xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{d.name}</h3>
                  <span className="font-display text-base font-bold">₹{d.fee}</span>
                </div>
                <p className="text-xs text-muted-foreground">{d.specialty} · {d.experience}</p>
                <div className="mt-1 flex items-center gap-2 text-[11px]">
                  <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {d.rating}</span>
                  <span className="text-muted-foreground">({d.reviews})</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-success">{d.available}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-full bg-muted py-2 text-xs font-semibold">View profile</button>
              <button className="flex-1 rounded-full bg-gradient-primary py-2 text-xs font-semibold text-primary-foreground shadow-glow">Book consult</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ConsultType({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <button className={`flex flex-col items-center gap-2 rounded-2xl p-4 ${color}`}>
      <Icon className="h-5 w-5" />
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
