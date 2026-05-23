import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Calendar, MessageSquare, ChevronLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/notifications")({
  component: NotificationsPage,
});

const iconMap = {
  match: { icon: Heart, color: "bg-gradient-primary text-primary-foreground" },
  order: { icon: ShoppingBag, color: "bg-gradient-sky" },
  appointment: { icon: Calendar, color: "bg-gradient-peach" },
  social: { icon: MessageSquare, color: "bg-accent" },
};

function NotificationsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-4 pt-2">
        <Link to="/" className="-ml-2 p-2"><ChevronLeft className="h-5 w-5" /></Link>
        <h1 className="font-display text-2xl font-bold">Notifications</h1>
      </div>

      <div className="space-y-2 px-4 pb-4">
        {notifications.map((n, i) => {
          const { icon: Icon, color } = iconMap[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-start gap-3 rounded-2xl p-3 shadow-soft border border-border/40 ${n.unread ? "bg-card" : "bg-muted/30"}`}
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{n.title}</h3>
                  <span className="text-[11px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{n.body}</p>
              </div>
              {n.unread && <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
