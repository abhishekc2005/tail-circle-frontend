export type Pet = {
  id: string;
  name: string;
  breed: string;
  species: "Dog" | "Cat" | "Rabbit" | "Bird";
  age: string;
  gender: "Male" | "Female";
  distance: string;
  bio: string;
  intent: string;
  photo: string;
  owner: { name: string; avatar: string };
  vaccinated: boolean;
  sterilized: boolean;
  temperament: string[];
};

const photos = [
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
  "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&q=80",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80",
  "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
];

const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=24",
  "https://i.pravatar.cc/150?img=33",
  "https://i.pravatar.cc/150?img=47",
];

export const pets: Pet[] = [
  { id: "1", name: "Mochi", breed: "Shiba Inu", species: "Dog", age: "2 yrs", gender: "Female", distance: "1.2 km", bio: "Loves morning runs and peanut butter treats 🥜", intent: "Looking for playmates", photo: photos[0], owner: { name: "Aanya R.", avatar: avatars[0] }, vaccinated: true, sterilized: false, temperament: ["Playful", "Friendly", "Active"] },
  { id: "2", name: "Biscuit", breed: "Golden Retriever", species: "Dog", age: "3 yrs", gender: "Male", distance: "0.8 km", bio: "Gentle giant who loves swimming and cuddles 💛", intent: "Breeding match", photo: photos[1], owner: { name: "Rohan M.", avatar: avatars[1] }, vaccinated: true, sterilized: false, temperament: ["Calm", "Loving", "Social"] },
  { id: "3", name: "Luna", breed: "Persian Cat", species: "Cat", age: "1.5 yrs", gender: "Female", distance: "2.4 km", bio: "Royal vibes only. Naps in sunbeams ☀️", intent: "Pet friends", photo: photos[2], owner: { name: "Sara K.", avatar: avatars[2] }, vaccinated: true, sterilized: true, temperament: ["Calm", "Independent"] },
  { id: "4", name: "Pepper", breed: "Beagle", species: "Dog", age: "4 yrs", gender: "Male", distance: "3.1 km", bio: "Nose-first explorer. Treat motivated 🦴", intent: "Playdates", photo: photos[3], owner: { name: "Karan S.", avatar: avatars[3] }, vaccinated: true, sterilized: true, temperament: ["Curious", "Energetic"] },
  { id: "5", name: "Coco", breed: "Pomeranian", species: "Dog", age: "1 yr", gender: "Female", distance: "0.5 km", bio: "Tiny floof, big personality ✨", intent: "Looking for playmates", photo: photos[4], owner: { name: "Meera P.", avatar: avatars[4] }, vaccinated: true, sterilized: false, temperament: ["Sassy", "Cuddly"] },
];

export type Post = {
  id: string;
  user: { name: string; avatar: string; pet: string };
  time: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  tag: string;
};

export const posts: Post[] = [
  { id: "p1", user: { name: "Aanya R.", avatar: avatars[0], pet: "Mochi" }, time: "2h", image: photos[0], caption: "First beach day for Mochi 🌊 She made 12 new friends!", likes: 234, comments: 28, tag: "Experience" },
  { id: "p2", user: { name: "Rohan M.", avatar: avatars[1], pet: "Biscuit" }, time: "5h", image: photos[1], caption: "Tried the new salmon meal plan from Tail Circle — Biscuit approved 🐟", likes: 412, comments: 56, tag: "Review" },
  { id: "p3", user: { name: "Sara K.", avatar: avatars[2], pet: "Luna" }, time: "1d", image: photos[2], caption: "Dr. Mehta at Paws Clinic was incredible with Luna. Highly recommend 💯", likes: 189, comments: 31, tag: "Recommendation" },
  { id: "p4", user: { name: "Karan S.", avatar: avatars[3], pet: "Pepper" }, time: "1d", image: photos[3], caption: "Pepper's first grooming session at Fluff & Buff 💇 Look at that glow!", likes: 320, comments: 44, tag: "Experience" },
];

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
};

export const products: Product[] = [
  { id: "pr1", name: "Premium Chicken & Rice", brand: "PawFeast", price: 1299, oldPrice: 1599, rating: 4.8, reviews: 2341, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80", category: "Food", badge: "Bestseller" },
  { id: "pr2", name: "Cozy Plush Bed (M)", brand: "Snuggle", price: 1899, rating: 4.7, reviews: 891, image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&q=80", category: "Accessories" },
  { id: "pr3", name: "Rope Tug Toy", brand: "PlayPaw", price: 349, oldPrice: 499, rating: 4.6, reviews: 1205, image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&q=80", category: "Toys", badge: "Deal" },
  { id: "pr4", name: "Oatmeal Grooming Shampoo", brand: "PureFur", price: 549, rating: 4.9, reviews: 3120, image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=600&q=80", category: "Grooming" },
  { id: "pr5", name: "Multivitamin Chews (60ct)", brand: "VetWell", price: 899, rating: 4.7, reviews: 654, image: "https://images.unsplash.com/photo-1583337426008-2fef51aa841e?w=600&q=80", category: "Medicines" },
  { id: "pr6", name: "Reflective Walking Harness", brand: "TrailPaw", price: 1199, oldPrice: 1499, rating: 4.8, reviews: 2890, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80", category: "Accessories", badge: "New" },
];

export type Service = {
  id: string;
  name: string;
  type: string;
  rating: number;
  distance: string;
  price: string;
  image: string;
  tag?: string;
};

export const services: Service[] = [
  { id: "s1", name: "Happy Tails Day Care", type: "Day Care", rating: 4.9, distance: "1.2 km", price: "₹599/day", image: photos[5], tag: "Top rated" },
  { id: "s2", name: "Fluff & Buff Grooming", type: "Grooming", rating: 4.8, distance: "0.6 km", price: "₹799+", image: photos[6] },
  { id: "s3", name: "Dr. Mehta — Paws Clinic", type: "Veterinary", rating: 4.95, distance: "2.1 km", price: "₹500 consult", image: photos[7], tag: "Available now" },
  { id: "s4", name: "Pawsome Birthday Bash", type: "Event", rating: 4.7, distance: "3.4 km", price: "₹1,499", image: photos[0] },
];

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  fee: number;
  avatar: string;
  available: string;
};

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Priya Mehta", specialty: "General Vet", experience: "12 yrs", rating: 4.9, reviews: 1240, fee: 500, avatar: avatars[2], available: "Today 4:30 PM" },
  { id: "d2", name: "Dr. Arjun Kapoor", specialty: "Dermatology", experience: "8 yrs", rating: 4.8, reviews: 892, fee: 700, avatar: avatars[1], available: "Tomorrow 10:00 AM" },
  { id: "d3", name: "Dr. Nisha Iyer", specialty: "Surgery", experience: "15 yrs", rating: 4.95, reviews: 2100, fee: 1200, avatar: avatars[4], available: "Today 6:00 PM" },
  { id: "d4", name: "Dr. Vikram Rao", specialty: "Behavioral", experience: "10 yrs", rating: 4.7, reviews: 540, fee: 800, avatar: avatars[3], available: "Wed 2:00 PM" },
];

export type MealPlan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  perMeal: number;
  meals: number;
  popular?: boolean;
  features: string[];
};

export const mealPlans: MealPlan[] = [
  { id: "m1", name: "Starter", tagline: "Try us out", price: 1499, perMeal: 75, meals: 20, features: ["20 fresh meals", "Free delivery", "Pause anytime"] },
  { id: "m2", name: "Popular", tagline: "Most loved", price: 3499, perMeal: 58, meals: 60, popular: true, features: ["60 fresh meals", "Free delivery", "Vet-formulated", "Free treats"] },
  { id: "m3", name: "Best Value", tagline: "Save 30%", price: 5999, perMeal: 50, meals: 120, features: ["120 fresh meals", "Priority delivery", "Free toys", "Nutrition coach"] },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  type: "match" | "order" | "appointment" | "social";
  unread?: boolean;
};

export const notifications: Notification[] = [
  { id: "n1", title: "It's a match! 🐾", body: "Mochi matched with Biscuit. Say hi!", time: "5m", type: "match", unread: true },
  { id: "n2", title: "Order shipped", body: "Your PawFeast bag is out for delivery", time: "1h", type: "order", unread: true },
  { id: "n3", title: "Appointment tomorrow", body: "Dr. Mehta — 4:30 PM checkup for Mochi", time: "3h", type: "appointment" },
  { id: "n4", title: "New comment", body: "Sara K. commented on your post", time: "1d", type: "social" },
];
