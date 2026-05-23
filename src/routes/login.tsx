import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Welcome back to Tail Circle 🐾");
      navigate({ to: "/" });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary shadow-glow text-lg">🐾</div>
          <span className="font-display text-xl font-bold">Tail Circle</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-12"
        >
          <h1 className="font-display text-3xl font-bold leading-tight">Welcome back<br />pet parent 💛</h1>
          <p className="mt-2 text-sm text-foreground/70">Sign in to continue your pet's journey</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={onSubmit}
          className="mt-8 space-y-3"
        >
          <Field icon={Mail} type="email" placeholder="you@email.com" defaultValue="aanya@tailcircle.com" />
          <Field icon={Lock} type="password" placeholder="Password" defaultValue="••••••••" />

          <button
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground py-3.5 text-sm font-semibold text-background shadow-card transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing in…" : <>Sign in <ArrowRight className="h-4 w-4" /></>}
          </button>

          <button type="button" className="w-full text-center text-xs font-medium text-foreground/70">
            Forgot password?
          </button>
        </motion.form>

        <div className="mt-auto pt-8 text-center text-sm text-foreground/70">
          New here?{" "}
          <Link to="/onboarding" className="font-semibold text-primary">Create an account</Link>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, ...props }: { icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3.5 backdrop-blur">
      <Icon className="h-4 w-4 text-foreground/60" />
      <input
        {...props}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/50"
      />
    </div>
  );
}
