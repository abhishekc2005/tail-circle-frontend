import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Home, Heart, ShoppingBag, Users, User, Bell, Search } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/matches", label: "Matches", icon: Heart },
  { to: "/community", label: "Community", icon: Users },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/profile", label: "Profile", icon: User },
];

export function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="mx-auto max-w-md pb-24 pt-2 md:max-w-2xl">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-3 left-1/2 z-50 -translate-x-1/2 glass rounded-full border border-border/60 shadow-float px-2 py-2">
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-primary shadow-glow"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`relative h-5 w-5 ${active ? "text-primary-foreground" : ""}`} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/40">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 md:max-w-2xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
            <span className="text-lg">🐾</span>
          </div>
          <span className="font-display text-lg font-bold tracking-tight">Tail Circle</span>
        </Link>
        <div className="flex items-center gap-1">
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/notifications" className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </Link>
        </div>
      </div>
    </header>
  );
}
