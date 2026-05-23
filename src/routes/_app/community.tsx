import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { posts, pets } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/community")({
  component: CommunityPage,
});

const filters = ["For you", "Reviews", "Experiences", "Recommendations", "Trending"];

function CommunityPage() {
  const [active, setActive] = useState("For you");

  return (
    <div className="space-y-4">
      <div className="px-4 pt-2">
        <h1 className="font-display text-2xl font-bold">Community</h1>
        <p className="text-sm text-muted-foreground">Stories from pet parents like you</p>
      </div>

      {/* Stories */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4">
        <button className="flex flex-col items-center gap-1">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-[11px]">Your story</span>
        </button>
        {pets.map((p) => (
          <button key={p.id} className="flex flex-col items-center gap-1">
            <div className="rounded-full bg-gradient-primary p-[2px]">
              <img src={p.photo} alt={p.name} className="h-16 w-16 rounded-full border-2 border-background object-cover" />
            </div>
            <span className="text-[11px]">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              active === f ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-4 px-4 pb-4">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, delay }: { post: (typeof posts)[number]; delay: number }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="overflow-hidden rounded-2xl bg-card shadow-soft border border-border/40"
    >
      <div className="flex items-center gap-3 p-3">
        <img src={post.user.avatar} alt="" className="h-9 w-9 rounded-full" />
        <div className="flex-1">
          <div className="text-sm font-semibold leading-tight">{post.user.name}</div>
          <div className="text-[11px] text-muted-foreground">with {post.user.pet} · {post.time}</div>
        </div>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">{post.tag}</span>
        <button className="text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></button>
      </div>

      <img src={post.image} alt="" className="aspect-square w-full object-cover" />

      <div className="flex items-center gap-1 px-3 py-2">
        <motion.button whileTap={{ scale: 0.85 }} onClick={() => setLiked(!liked)} className="p-2">
          <Heart className={`h-5 w-5 ${liked ? "fill-primary text-primary" : ""}`} />
        </motion.button>
        <button className="p-2"><MessageCircle className="h-5 w-5" /></button>
        <button className="p-2"><Share2 className="h-5 w-5" /></button>
        <button onClick={() => setSaved(!saved)} className="ml-auto p-2">
          <Bookmark className={`h-5 w-5 ${saved ? "fill-foreground" : ""}`} />
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="text-sm font-semibold">{(post.likes + (liked ? 1 : 0)).toLocaleString()} likes</div>
        <p className="mt-1 text-sm">
          <span className="font-semibold">{post.user.name}</span>{" "}
          <span>{post.caption}</span>
        </p>
        <button className="mt-1 text-xs text-muted-foreground">View all {post.comments} comments</button>
      </div>
    </motion.article>
  );
}
