import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Search, Star, Heart, ShoppingCart, Filter } from "lucide-react";
import { useState } from "react";
import { products, type Product } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/shop")({
  component: ShopPage,
});

const categories = ["All", "Food", "Accessories", "Toys", "Grooming", "Medicines"];

function ShopPage() {
  const [cat, setCat] = useState("All");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const filtered = cat === "All" ? products : products.filter((p) => p.category === cat);

  const toggleWishlist = (id: string) => {
    setWishlist((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <div className="space-y-4">
      <div className="px-4 pt-2">
        <h1 className="font-display text-2xl font-bold">Shop</h1>
        <p className="text-sm text-muted-foreground">Everything your pet loves, delivered fast</p>
      </div>

      {/* Search */}
      <div className="px-4">
        <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search food, toys, brands…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button><Filter className="h-4 w-4 text-muted-foreground" /></button>
        </div>
      </div>

      {/* Hero promo */}
      <div className="px-4">
        <div className="flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-peach p-4">
          <div className="flex-1">
            <div className="text-[11px] font-medium uppercase tracking-wider opacity-70">Flash sale</div>
            <h3 className="font-display text-lg font-bold leading-tight">Up to 40% off on Food & Treats</h3>
            <button className="mt-2 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">Shop now</button>
          </div>
          <div className="text-5xl">🦴</div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              cat === c ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {filtered.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            delay={i * 0.04}
            wished={wishlist.has(p.id)}
            onToggleWish={() => toggleWishlist(p.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, delay, wished, onToggleWish }: { product: Product; delay: number; wished: boolean; onToggleWish: () => void }) {
  const off = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="overflow-hidden rounded-2xl bg-card shadow-soft border border-border/40"
    >
      <div className="relative aspect-square bg-muted">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold text-background">{product.badge}</span>
        )}
        <button
          onClick={onToggleWish}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 backdrop-blur"
        >
          <Heart className={`h-3.5 w-3.5 ${wished ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
      </div>
      <div className="space-y-1 p-2.5">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.brand}</div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight min-h-[2.5rem]">{product.name}</h3>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {product.rating}
          <span>·</span><span>{product.reviews}</span>
        </div>
        <div className="flex items-end justify-between pt-1">
          <div>
            <div className="font-display text-base font-bold">₹{product.price}</div>
            {product.oldPrice && (
              <div className="text-[10px] text-muted-foreground">
                <span className="line-through">₹{product.oldPrice}</span> <span className="text-success">{off}% off</span>
              </div>
            )}
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
            <ShoppingCart className="h-3.5 w-3.5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
