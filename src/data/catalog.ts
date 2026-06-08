import type { Collection, RoomCategory, RoomScene, Testimonial, RoomType, Product } from "./types";
import { IMG, lifestyle } from "./images";
import { getProduct, products } from "./products";

const ls = lifestyle(1200);

export const roomCategories: RoomCategory[] = [
  { slug: "living-room", name: "Living Room", image: ls.living, description: "Sofas, chairs and tables for everyday gathering." },
  { slug: "bedroom", name: "Bedroom", image: ls.bedroom, description: "Beds, nightstands and calming retreats." },
  { slug: "dining-room", name: "Dining Room", image: ls.dining, description: "Tables and chairs for long, lingering meals." },
  { slug: "office", name: "Home Office", image: ls.office, description: "Desks and seating made for focus." },
  { slug: "outdoor", name: "Outdoor", image: ls.outdoor, description: "Weatherproof pieces for open-air living." },
  { slug: "home-decor", name: "Home Decor", image: ls.decor, description: "Rugs, lighting and the finishing touches." },
];

export const collections: Collection[] = [
  { slug: "modern-living", name: "Modern Living", tagline: "Clean lines for the contemporary home", image: IMG.living1, productSlugs: ["haven-modular-sofa", "lyra-coffee-table", "aalto-floor-lamp", "loom-area-rug"] },
  { slug: "scandinavian", name: "Scandinavian Collection", tagline: "Warmth, light and natural materials", image: IMG.living3, productSlugs: ["fjord-lounge-chair", "bramble-bookshelf", "saga-dining-table", "copenhagen-dining-chair"] },
  { slug: "luxury-bedroom", name: "Luxury Bedroom", tagline: "A sanctuary for rest", image: IMG.bedroom1, productSlugs: ["lumen-platform-bed", "willow-dresser", "mara-nightstand", "aurora-table-lamp"] },
  { slug: "contemporary-dining", name: "Contemporary Dining", tagline: "Gather in style", image: IMG.dining1, productSlugs: ["saga-dining-table", "copenhagen-dining-chair", "knot-pendant-light", "sideboard-luca"] },
  { slug: "workspace-essentials", name: "Workspace Essentials", tagline: "Designed for focus", image: IMG.office1, productSlugs: ["atlas-writing-desk", "ergo-task-chair", "stack-bookcase", "focus-floor-lamp"] },
  { slug: "outdoor-retreat", name: "Outdoor Retreat", tagline: "Bring the indoors out", image: IMG.outdoor1, productSlugs: ["terra-outdoor-sofa", "terra-lounge-chair", "horizon-side-table", "dune-dining-set"] },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export const roomScenes: RoomScene[] = [
  {
    slug: "sunlit-living-room",
    name: "The Sunlit Living Room",
    description: "Layered neutrals, soft boucle and warm oak make this living room an invitation to slow down.",
    image: IMG.living1,
    productSlugs: ["haven-modular-sofa", "lyra-coffee-table", "aalto-floor-lamp", "loom-area-rug", "halo-accent-chair"],
    hotspots: [
      { x: 34, y: 62, slug: "haven-modular-sofa" },
      { x: 55, y: 74, slug: "lyra-coffee-table" },
      { x: 80, y: 40, slug: "aalto-floor-lamp" },
    ],
  },
  {
    slug: "serene-bedroom",
    name: "The Serene Bedroom",
    description: "A low platform bed, soft textiles and ceramic lighting create a calm, restorative retreat.",
    image: IMG.bedroom1,
    productSlugs: ["lumen-platform-bed", "mara-nightstand", "aurora-table-lamp", "hearth-throw-blanket", "willow-dresser"],
    hotspots: [
      { x: 45, y: 60, slug: "lumen-platform-bed" },
      { x: 18, y: 58, slug: "mara-nightstand" },
      { x: 22, y: 44, slug: "aurora-table-lamp" },
    ],
  },
  {
    slug: "gathered-dining",
    name: "The Gathered Dining Room",
    description: "An extendable oak table, woven chairs and a rattan pendant set the scene for long dinners.",
    image: IMG.dining1,
    productSlugs: ["saga-dining-table", "copenhagen-dining-chair", "knot-pendant-light", "sideboard-luca"],
    hotspots: [
      { x: 50, y: 66, slug: "saga-dining-table" },
      { x: 28, y: 62, slug: "copenhagen-dining-chair" },
      { x: 52, y: 26, slug: "knot-pendant-light" },
    ],
  },
  {
    slug: "focused-studio",
    name: "The Focused Studio",
    description: "A clean writing desk, ergonomic seating and modular storage built for deep work.",
    image: IMG.office1,
    productSlugs: ["atlas-writing-desk", "ergo-task-chair", "stack-bookcase", "focus-floor-lamp"],
    hotspots: [
      { x: 48, y: 64, slug: "atlas-writing-desk" },
      { x: 60, y: 58, slug: "ergo-task-chair" },
      { x: 82, y: 46, slug: "stack-bookcase" },
    ],
  },
  {
    slug: "open-air-terrace",
    name: "The Open-Air Terrace",
    description: "Teak, rope and quick-dry cushions make this terrace ready for golden-hour gatherings.",
    image: IMG.outdoor1,
    productSlugs: ["terra-outdoor-sofa", "terra-lounge-chair", "horizon-side-table", "dune-dining-set"],
    hotspots: [
      { x: 40, y: 64, slug: "terra-outdoor-sofa" },
      { x: 70, y: 60, slug: "terra-lounge-chair" },
      { x: 55, y: 72, slug: "horizon-side-table" },
    ],
  },
  {
    slug: "curated-corner",
    name: "The Curated Corner",
    description: "Rugs, ceramics and a sculptural chair bring personality to a quiet reading nook.",
    image: IMG.living2,
    productSlugs: ["halo-accent-chair", "loom-area-rug", "vessel-vase-set", "drift-wall-mirror", "grove-planter"],
    hotspots: [
      { x: 42, y: 58, slug: "halo-accent-chair" },
      { x: 60, y: 78, slug: "loom-area-rug" },
      { x: 30, y: 40, slug: "drift-wall-mirror" },
    ],
  },
];

export const getRoomScene = (slug: string) => roomScenes.find((r) => r.slug === slug);

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Sofia Lindqvist", location: "Stockholm", rating: 5, quote: "NordHaus transformed our apartment. The Haven sofa is the most comfortable thing we own, and the white-glove delivery was flawless.", photo: IMG.living2 },
  { id: "t2", name: "Daniel Okoye", location: "London", rating: 5, quote: "Beautiful craftsmanship and genuinely helpful design advice. Our dining room finally feels finished.", photo: IMG.dining1 },
  { id: "t3", name: "Mei Tanaka", location: "Toronto", rating: 5, quote: "The quality is exceptional for the price. Two years in and the oak still looks brand new.", photo: IMG.bedroom1 },
  { id: "t4", name: "Lucas Moreau", location: "Paris", rating: 5, quote: "From browsing to assembly, the whole experience felt premium. Highly recommend the design consultation.", photo: IMG.living1 },
  { id: "t5", name: "Hannah Berg", location: "Copenhagen", rating: 5, quote: "Warm, timeless pieces that work beautifully together. The room planner made it so easy.", photo: IMG.living3 },
  { id: "t6", name: "Arjun Patel", location: "Sydney", rating: 5, quote: "Our terrace is now the favourite spot in the house. Teak quality is outstanding.", photo: IMG.outdoor1 },
];

export const designServices = [
  { id: "consult", title: "Interior Consultation", description: "Book a free 1:1 session with a NordHaus designer to plan your space.", icon: "MessageSquare" },
  { id: "planning", title: "Room Planning", description: "Get a tailored layout with furniture recommendations for any room.", icon: "LayoutGrid" },
  { id: "assist", title: "Design Assistance", description: "Ongoing support from selection to styling, on your schedule.", icon: "Sparkles" },
];

export const trustSignals = [
  { id: "delivery", title: "Free Delivery", text: "On orders over $999", icon: "Truck" },
  { id: "returns", title: "Easy Returns", text: "30-day hassle-free returns", icon: "RotateCcw" },
  { id: "secure", title: "Secure Checkout", text: "256-bit SSL encryption", icon: "ShieldCheck" },
  { id: "warranty", title: "5-Year Warranty", text: "On all furniture", icon: "BadgeCheck" },
];

export const FREE_DELIVERY_THRESHOLD = 999;