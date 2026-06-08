import type { Collection, RoomCategory, RoomScene, Testimonial, RoomType, Product } from "./types";
import { IMG, lifestyle } from "./images";
import { getProduct, products } from "./products";

const ls = lifestyle(1400);

export const roomCategories: RoomCategory[] = [
  { slug: "living-room", name: "Living Room", image: ls.living, description: "Sculptural seating and gallery-quality tables for everyday gathering." },
  { slug: "bedroom", name: "Bedroom", image: ls.bedroom, description: "Heirloom beds and bedside pieces composed in linen, oak and brass." },
  { slug: "dining-room", name: "Dining Room", image: ls.dining, description: "Extending tables and hand-caned chairs made for long evenings." },
  { slug: "office", name: "Private Study", image: ls.office, description: "Leather-topped desks and architect's seating for considered work." },
  { slug: "outdoor", name: "Terrace & Garden", image: ls.outdoor, description: "Teak, marine rope and performance textiles for open-air living." },
  { slug: "home-decor", name: "Objet & Lighting", image: ls.decor, description: "Hand-thrown ceramics, heirloom rugs and sculptural lighting." },
];

export const collections: Collection[] = [
  { slug: "modern-living", name: "Signature Living", tagline: "Sculptural seating, anchored by craft", image: IMG.living1, productSlugs: ["haven-modular-sofa", "lyra-coffee-table", "aalto-floor-lamp", "loom-area-rug"] },
  { slug: "scandinavian", name: "Private Residence", tagline: "Refined interiors for considered homes", image: IMG.living3, productSlugs: ["fjord-lounge-chair", "bramble-bookshelf", "saga-dining-table", "copenhagen-dining-chair"] },
  { slug: "luxury-bedroom", name: "Atelier Bedroom", tagline: "A sanctuary in linen, oak and brass", image: IMG.bedroom1, productSlugs: ["lumen-platform-bed", "willow-dresser", "mara-nightstand", "aurora-table-lamp"] },
  { slug: "contemporary-dining", name: "Grand Dining", tagline: "Tables made for unhurried evenings", image: IMG.dining1, productSlugs: ["saga-dining-table", "copenhagen-dining-chair", "knot-pendant-light", "sideboard-luca"] },
  { slug: "workspace-essentials", name: "Executive Office", tagline: "Studies for focused, beautiful work", image: IMG.office1, productSlugs: ["atlas-writing-desk", "ergo-task-chair", "stack-bookcase", "focus-floor-lamp"] },
  { slug: "outdoor-retreat", name: "Heritage Collection", tagline: "Archive silhouettes, reimagined", image: IMG.outdoor1, productSlugs: ["terra-outdoor-sofa", "terra-lounge-chair", "horizon-side-table", "dune-dining-set"] },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export const roomScenes: RoomScene[] = [
  {
    slug: "sunlit-living-room",
    name: "The Penthouse Salon",
    description: "Travertine, full-grain leather and bookmatched walnut compose a living room shaped by light and proportion.",
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
    name: "The Designer Suite",
    description: "A low-profile platform bed in oiled oak, sheathed in Belgian linen and lit by hand-spun ceramic.",
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
    name: "The Grand Dining Room",
    description: "An extending walnut table, hand-caned chairs and a sculptural brass pendant — composed for long, lingering evenings.",
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
    name: "The Executive Study",
    description: "A leather-topped writing desk, an architect's chair and stacked oak shelving — built for considered work.",
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
    name: "The Architectural Terrace",
    description: "Teak frames, marine rope and quick-dry performance textiles, composed for the golden hour.",
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
    name: "The Collector's Corner",
    description: "Heirloom rugs, hand-thrown ceramics and a sculptural lounge chair — a still life in the language of home.",
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
  { id: "t1", name: "Sofia Lindqvist", location: "Interior Designer · Stockholm", rating: 5, quote: "Aurum's craftsmanship rivals the European ateliers I source from in Milan. The Haven sofa anchored an entire penthouse project.", photo: IMG.living2 },
  { id: "t2", name: "Daniel Okoye", location: "Architect · London", rating: 5, quote: "From specification to white-glove install, the experience was effortless. The walnut grain on the dining table is exceptional.", photo: IMG.dining1 },
  { id: "t3", name: "Mei Tanaka", location: "Private Client · Toronto", rating: 5, quote: "Three years into the suite and the leather has only grown more beautiful. This is furniture made to be inherited.", photo: IMG.bedroom1 },
  { id: "t4", name: "Lucas Moreau", location: "Hospitality Designer · Paris", rating: 5, quote: "Aurum understands the brief instinctively. Every piece arrived as specified — the bespoke service is genuinely bespoke.", photo: IMG.living1 },
  { id: "t5", name: "Hannah Berg", location: "Private Client · Copenhagen", rating: 5, quote: "Timeless silhouettes, honest materials, and a level of finish you don't find at this scale anywhere else.", photo: IMG.living3 },
  { id: "t6", name: "Arjun Patel", location: "Real Estate Developer · Sydney", rating: 5, quote: "We furnished three penthouses with Aurum. The trade program and design service made what could have been complex feel choreographed.", photo: IMG.outdoor1 },
];

export const designServices = [
  { id: "consult", title: "Private Design Consultation", description: "A bespoke 1:1 session with a senior Aurum designer — in your home or our atelier.", icon: "MessageSquare" },
  { id: "planning", title: "Residential & Commercial", description: "Tailored layouts and material palettes for private residences, offices and architectural homes.", icon: "LayoutGrid" },
  { id: "assist", title: "Hospitality & Trade", description: "End-to-end specification for hotels, restaurants and developers, with dedicated trade pricing.", icon: "Sparkles" },
];

export const trustSignals = [
  { id: "delivery", title: "White-Glove Delivery", text: "Installed and styled in your home", icon: "Truck" },
  { id: "returns", title: "Considered Returns", text: "30-day reconsideration window", icon: "RotateCcw" },
  { id: "secure", title: "Bespoke Atelier", text: "Made to your specification", icon: "ShieldCheck" },
  { id: "warranty", title: "Lifetime Craftsmanship", text: "Guaranteed by our atelier", icon: "BadgeCheck" },
];

export const FREE_DELIVERY_THRESHOLD = 999;
