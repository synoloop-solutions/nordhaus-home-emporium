import type { Product, RoomType, Review, CustomizationGroup, Dimensions } from "./types";
import { IMG } from "./images";

const COLORS = {
  oat: { label: "Oat", hex: "#E7DECB" },
  sand: { label: "Sand", hex: "#D9C7B0" },
  walnut: { label: "Walnut", hex: "#6B4A2E" },
  charcoal: { label: "Charcoal", hex: "#3A3A3A" },
  sage: { label: "Sage", hex: "#A7B0A0" },
  terracotta: { label: "Terracotta", hex: "#B5765A" },
  ivory: { label: "Ivory", hex: "#F3EEE3" },
  ink: { label: "Ink", hex: "#2B2622" },
};

const sampleReviews = (seed: number): Review[] => {
  const names = ["Amelia R.", "Jonas K.", "Priya S.", "Marcus L.", "Elin V.", "Tomas B."];
  const titles = [
    "Exceeded expectations",
    "Beautifully made",
    "Worth every penny",
    "A new favourite",
    "Cozy and elegant",
  ];
  const bodies = [
    "The craftsmanship is outstanding and it arrived perfectly packaged. The colour matches the photos exactly.",
    "Comfortable, sturdy, and the finish feels premium. White-glove delivery was seamless.",
    "This piece transformed our space. Friends keep asking where we got it.",
    "Assembly was straightforward and the materials feel built to last for years.",
  ];
  const out: Review[] = [];
  const count = 3 + (seed % 3);
  for (let i = 0; i < count; i++) {
    out.push({
      id: `r-${seed}-${i}`,
      author: names[(seed + i) % names.length],
      rating: i === 0 ? 5 : 4 + ((seed + i) % 2),
      date: `2024-0${1 + ((seed + i) % 9)}-1${i}`,
      title: titles[(seed + i) % titles.length],
      body: bodies[(seed + i) % bodies.length],
      verified: i % 3 !== 2,
      photo: i === 0 ? IMG.living2 : undefined,
    });
  }
  return out;
};

const defaultDims = (over: Partial<Dimensions>): Dimensions => ({
  height: 32,
  width: 84,
  depth: 38,
  weight: 110,
  seatHeight: 18,
  seatDepth: 22,
  packageHeight: 36,
  packageWidth: 88,
  packageDepth: 42,
  ...over,
});

const fabricGroup: CustomizationGroup = {
  id: "fabric",
  name: "Upholstery",
  type: "select",
  options: [
    { label: "Boucle Wool", priceDelta: 0 },
    { label: "Performance Linen", priceDelta: 120 },
    { label: "Italian Leather", priceDelta: 450 },
  ],
};

const woodGroup: CustomizationGroup = {
  id: "wood",
  name: "Wood Finish",
  type: "select",
  options: [
    { label: "Natural Oak", priceDelta: 0 },
    { label: "Walnut", priceDelta: 90 },
    { label: "Black Ash", priceDelta: 140 },
  ],
};

const sizeGroup: CustomizationGroup = {
  id: "size",
  name: "Size",
  type: "select",
  options: [
    { label: "Standard", priceDelta: 0 },
    { label: "Large", priceDelta: 300 },
  ],
};

const colorGroup = (cols: { label: string; hex: string }[]): CustomizationGroup => ({
  id: "color",
  name: "Colour",
  type: "color",
  options: cols.map((c) => ({ label: c.label, priceDelta: 0, swatch: c.hex })),
});

let seed = 1;
function make(p: {
  slug: string;
  name: string;
  category: string;
  room: RoomType;
  style: string;
  price: number;
  salePrice?: number;
  images: string[];
  colors: { label: string; hex: string }[];
  materials: string[];
  description: string;
  dims?: Partial<Dimensions>;
  customizations?: CustomizationGroup[];
  isNew?: boolean;
  bestSeller?: boolean;
  inStock?: boolean;
  rating?: number;
  related?: string[];
}): Product {
  const s = seed++;
  return {
    id: `p-${s}`,
    slug: p.slug,
    name: p.name,
    category: p.category,
    room: p.room,
    style: p.style,
    price: p.price,
    salePrice: p.salePrice,
    rating: p.rating ?? 4.5 + (s % 5) / 10,
    reviewCount: 18 + ((s * 7) % 120),
    images: p.images,
    colors: p.colors,
    materials: p.materials,
    description: p.description,
    details: [
      `Solid kiln-dried hardwood frame for lasting durability`,
      `High-resilience foam wrapped in down-alternative fill`,
      `${p.materials.join(", ")} construction`,
      `Hand-finished by skilled artisans`,
    ],
    care: "Vacuum regularly with an upholstery attachment. Spot clean with a mild, water-based solvent. Avoid direct sunlight to preserve colour.",
    warranty: "5-year structural warranty and 2-year upholstery warranty.",
    assembly: "Minimal assembly — legs attach in under 10 minutes. Tools included.",
    dimensions: defaultDims(p.dims ?? {}),
    customizations: p.customizations ?? [colorGroup(p.colors), fabricGroup],
    inStock: p.inStock ?? true,
    isNew: p.isNew,
    bestSeller: p.bestSeller,
    reviews: sampleReviews(s),
    relatedSlugs: p.related ?? [],
  };
}

export const products: Product[] = [
  // LIVING ROOM
  make({ slug: "haven-modular-sofa", name: "Haven Modular Sofa", category: "Sofas", room: "living-room", style: "Modern", price: 2490, salePrice: 1990, images: [IMG.sofa1, IMG.sofa2, IMG.living1], colors: [COLORS.oat, COLORS.sage, COLORS.charcoal], materials: ["Boucle wool", "Oak legs"], description: "A deep, modular sofa that adapts to your space. Sink-in comfort meets clean Scandinavian lines.", bestSeller: true, related: ["fjord-lounge-chair", "lyra-coffee-table", "aalto-floor-lamp"] }),
  make({ slug: "fjord-lounge-chair", name: "Fjord Lounge Chair", category: "Chairs", room: "living-room", style: "Scandinavian", price: 890, images: [IMG.chair1, IMG.chair2, IMG.living2], colors: [COLORS.sand, COLORS.walnut, COLORS.ink], materials: ["Top-grain leather", "Walnut"], description: "A sculptural lounge chair with a gently reclined seat and solid walnut frame.", bestSeller: true, dims: { width: 30, depth: 32, height: 31 }, related: ["haven-modular-sofa", "lyra-coffee-table"] }),
  make({ slug: "lyra-coffee-table", name: "Lyra Oak Coffee Table", category: "Tables", room: "living-room", style: "Minimalist", price: 640, images: [IMG.table1, IMG.table3, IMG.living3], colors: [COLORS.oat, COLORS.walnut], materials: ["Solid oak", "Steel"], description: "A round coffee table with a warm oak top and slender tapered legs.", customizations: [woodGroup], dims: { width: 42, depth: 42, height: 16, weight: 45 }, related: ["haven-modular-sofa", "fjord-lounge-chair"] }),
  make({ slug: "nord-sectional", name: "Nord L-Shaped Sectional", category: "Sofas", room: "living-room", style: "Contemporary", price: 3290, images: [IMG.sofa3, IMG.sofa4, IMG.living1], colors: [COLORS.sand, COLORS.charcoal], materials: ["Performance linen", "Hardwood"], description: "A generous sectional built for slow Sunday mornings and movie nights alike.", isNew: true, dims: { width: 112, depth: 64 } }),
  make({ slug: "aalto-floor-lamp", name: "Aalto Arc Floor Lamp", category: "Lighting", room: "living-room", style: "Modern", price: 380, salePrice: 299, images: [IMG.lamp1, IMG.lamp2], colors: [COLORS.charcoal, COLORS.ivory], materials: ["Powder-coated steel", "Linen shade"], description: "An elegant arc lamp that casts warm, ambient light over your reading nook.", customizations: [colorGroup([COLORS.charcoal, COLORS.ivory])], dims: { width: 60, depth: 12, height: 78, weight: 28 } }),
  make({ slug: "bramble-bookshelf", name: "Bramble Oak Bookshelf", category: "Storage", room: "living-room", style: "Scandinavian", price: 1190, images: [IMG.shelf1, IMG.living3], colors: [COLORS.oat, COLORS.walnut], materials: ["Solid oak"], description: "Open shelving with adjustable tiers to display books and treasured objects.", customizations: [woodGroup], dims: { width: 40, depth: 14, height: 72, weight: 95 } }),
  make({ slug: "halo-accent-chair", name: "Halo Accent Chair", category: "Chairs", room: "living-room", style: "Mid-century", price: 720, images: [IMG.chair3, IMG.chair4], colors: [COLORS.terracotta, COLORS.sage, COLORS.oat], materials: ["Boucle wool", "Brass"], description: "A curvy accent chair that adds a sculptural moment to any corner.", isNew: true }),
  make({ slug: "ember-media-console", name: "Ember Media Console", category: "Storage", room: "living-room", style: "Contemporary", price: 1340, images: [IMG.shelf1, IMG.living2], colors: [COLORS.walnut, COLORS.ink], materials: ["Walnut veneer", "Cane"], description: "A low media console with cane-front cabinets and soft-close drawers.", customizations: [woodGroup], dims: { width: 64, depth: 16, height: 22 } }),

  // BEDROOM
  make({ slug: "lumen-platform-bed", name: "Lumen Platform Bed", category: "Beds", room: "bedroom", style: "Minimalist", price: 1890, salePrice: 1590, images: [IMG.bed1, IMG.bed2, IMG.bedroom1], colors: [COLORS.oat, COLORS.charcoal, COLORS.walnut], materials: ["Upholstered linen", "Oak"], description: "A low-profile platform bed with a softly upholstered headboard.", bestSeller: true, customizations: [colorGroup([COLORS.oat, COLORS.charcoal, COLORS.walnut]), sizeGroup], dims: { width: 84, depth: 86, height: 42 }, related: ["mara-nightstand", "willow-dresser"] }),
  make({ slug: "mara-nightstand", name: "Mara Oak Nightstand", category: "Storage", room: "bedroom", style: "Scandinavian", price: 420, images: [IMG.shelf1, IMG.bedroom1], colors: [COLORS.oat, COLORS.walnut], materials: ["Solid oak"], description: "A compact nightstand with a single soft-close drawer and open cubby.", customizations: [woodGroup], dims: { width: 20, depth: 16, height: 22, weight: 30 }, related: ["lumen-platform-bed"] }),
  make({ slug: "willow-dresser", name: "Willow Six-Drawer Dresser", category: "Storage", room: "bedroom", style: "Modern", price: 1490, images: [IMG.shelf1, IMG.bed3], colors: [COLORS.oat, COLORS.walnut, COLORS.ink], materials: ["Oak", "Cane"], description: "Generous storage with cane detailing and dovetailed drawers.", customizations: [woodGroup], dims: { width: 60, depth: 18, height: 32 }, isNew: true }),
  make({ slug: "sól-bench", name: "Sól Upholstered Bench", category: "Seating", room: "bedroom", style: "Contemporary", price: 540, images: [IMG.chair2, IMG.bed2], colors: [COLORS.sand, COLORS.sage], materials: ["Boucle wool", "Oak"], description: "An end-of-bed bench that pairs comfort with a tailored silhouette.", dims: { width: 48, depth: 18, height: 18 } }),
  make({ slug: "aurora-table-lamp", name: "Aurora Ceramic Table Lamp", category: "Lighting", room: "bedroom", style: "Minimalist", price: 220, images: [IMG.lamp2, IMG.lamp1], colors: [COLORS.ivory, COLORS.terracotta], materials: ["Glazed ceramic", "Linen"], description: "A hand-glazed ceramic lamp with a warm linen shade.", customizations: [colorGroup([COLORS.ivory, COLORS.terracotta])], dims: { width: 12, depth: 12, height: 22, weight: 8 } }),

  // DINING ROOM
  make({ slug: "saga-dining-table", name: "Saga Extendable Dining Table", category: "Tables", room: "dining-room", style: "Scandinavian", price: 2190, salePrice: 1790, images: [IMG.table2, IMG.dining1, IMG.table1], colors: [COLORS.oat, COLORS.walnut], materials: ["Solid oak"], description: "Seats six and extends to eight — built for long, lingering dinners.", bestSeller: true, customizations: [woodGroup, sizeGroup], dims: { width: 78, depth: 38, height: 30, weight: 140 }, related: ["copenhagen-dining-chair", "lyra-coffee-table"] }),
  make({ slug: "copenhagen-dining-chair", name: "Copenhagen Dining Chair", category: "Chairs", room: "dining-room", style: "Mid-century", price: 290, images: [IMG.chair4, IMG.chair1], colors: [COLORS.walnut, COLORS.ink, COLORS.sand], materials: ["Oak", "Woven cord"], description: "A timeless dining chair with a woven seat and gently splayed legs.", bestSeller: true, dims: { width: 20, depth: 21, height: 31, weight: 12 }, related: ["saga-dining-table"] }),
  make({ slug: "knot-pendant-light", name: "Knot Pendant Light", category: "Lighting", room: "dining-room", style: "Modern", price: 340, images: [IMG.lamp1, IMG.dining1], colors: [COLORS.ivory, COLORS.charcoal], materials: ["Rattan", "Steel"], description: "A handwoven rattan pendant that casts a warm, dappled glow.", customizations: [colorGroup([COLORS.ivory, COLORS.charcoal])], dims: { width: 18, depth: 18, height: 16, weight: 6 }, isNew: true }),
  make({ slug: "sideboard-luca", name: "Luca Dining Sideboard", category: "Storage", room: "dining-room", style: "Contemporary", price: 1590, images: [IMG.shelf1, IMG.dining1], colors: [COLORS.walnut, COLORS.oat], materials: ["Walnut", "Brass"], description: "A statement sideboard with fluted doors and brass pulls.", customizations: [woodGroup], dims: { width: 66, depth: 18, height: 32 } }),
  make({ slug: "bistro-bar-stool", name: "Bistro Counter Stool", category: "Seating", room: "dining-room", style: "Minimalist", price: 240, images: [IMG.chair3, IMG.chair4], colors: [COLORS.sand, COLORS.ink], materials: ["Oak", "Leather"], description: "A counter-height stool with a contoured leather seat.", dims: { width: 16, depth: 16, height: 26, weight: 14 } }),

  // OFFICE
  make({ slug: "atlas-writing-desk", name: "Atlas Writing Desk", category: "Desks", room: "office", style: "Scandinavian", price: 980, salePrice: 820, images: [IMG.desk1, IMG.office1, IMG.desk2], colors: [COLORS.oat, COLORS.walnut], materials: ["Oak", "Steel"], description: "A clean writing desk with a slim drawer and cable management.", bestSeller: true, customizations: [woodGroup], dims: { width: 55, depth: 26, height: 30, weight: 70 }, related: ["ergo-task-chair", "stack-bookcase"] }),
  make({ slug: "ergo-task-chair", name: "Ergo Task Chair", category: "Chairs", room: "office", style: "Modern", price: 690, images: [IMG.chair2, IMG.office1], colors: [COLORS.charcoal, COLORS.sage], materials: ["Mesh", "Aluminium"], description: "An ergonomic task chair with adjustable lumbar and breathable mesh.", customizations: [colorGroup([COLORS.charcoal, COLORS.sage])], dims: { width: 26, depth: 26, height: 44, weight: 35 }, related: ["atlas-writing-desk"] }),
  make({ slug: "stack-bookcase", name: "Stack Modular Bookcase", category: "Storage", room: "office", style: "Minimalist", price: 1120, images: [IMG.shelf1, IMG.desk2], colors: [COLORS.oat, COLORS.ink], materials: ["Oak", "Steel"], description: "A modular bookcase you can stack and reconfigure as you grow.", customizations: [woodGroup], dims: { width: 36, depth: 14, height: 70 }, isNew: true }),
  make({ slug: "focus-floor-lamp", name: "Focus LED Floor Lamp", category: "Lighting", room: "office", style: "Contemporary", price: 260, images: [IMG.lamp1, IMG.office1], colors: [COLORS.charcoal, COLORS.ivory], materials: ["Aluminium"], description: "A dimmable LED floor lamp with a precise reading head.", dims: { width: 10, depth: 10, height: 60, weight: 18 } }),

  // OUTDOOR
  make({ slug: "terra-outdoor-sofa", name: "Terra Outdoor Sofa", category: "Sofas", room: "outdoor", style: "Contemporary", price: 1990, salePrice: 1690, images: [IMG.outdoor1, IMG.outdoor2], colors: [COLORS.sand, COLORS.charcoal], materials: ["Teak", "All-weather rope"], description: "A weather-resistant teak sofa with quick-dry cushions.", bestSeller: true, dims: { width: 76, depth: 34, height: 30 }, related: ["terra-lounge-chair", "horizon-side-table"] }),
  make({ slug: "terra-lounge-chair", name: "Terra Outdoor Lounge Chair", category: "Chairs", room: "outdoor", style: "Modern", price: 690, images: [IMG.outdoor2, IMG.outdoor1], colors: [COLORS.sand, COLORS.sage], materials: ["Teak", "Rope"], description: "A stackable teak lounge chair built for the elements.", dims: { width: 28, depth: 30, height: 32 }, related: ["terra-outdoor-sofa"] }),
  make({ slug: "horizon-side-table", name: "Horizon Outdoor Side Table", category: "Tables", room: "outdoor", style: "Minimalist", price: 320, images: [IMG.table3, IMG.outdoor1], colors: [COLORS.walnut, COLORS.charcoal], materials: ["Teak", "Concrete"], description: "A compact side table with a concrete top and teak base.", dims: { width: 18, depth: 18, height: 18, weight: 24 }, isNew: true }),
  make({ slug: "dune-dining-set", name: "Dune Outdoor Dining Set", category: "Tables", room: "outdoor", style: "Scandinavian", price: 2490, images: [IMG.outdoor1, IMG.table2], colors: [COLORS.sand, COLORS.walnut], materials: ["Teak", "Rope"], description: "A six-seat outdoor dining set crafted from sustainable teak.", dims: { width: 80, depth: 40, height: 30 } }),

  // HOME DECOR
  make({ slug: "loom-area-rug", name: "Loom Hand-Knotted Rug", category: "Rugs", room: "home-decor", style: "Scandinavian", price: 740, salePrice: 590, images: [IMG.rug1, IMG.living1], colors: [COLORS.oat, COLORS.sage, COLORS.terracotta], materials: ["Wool", "Cotton"], description: "A hand-knotted wool rug with a soft, low pile and subtle pattern.", customizations: [colorGroup([COLORS.oat, COLORS.sage, COLORS.terracotta]), sizeGroup], dims: { width: 96, depth: 120, height: 1, weight: 30 }, bestSeller: true }),
  make({ slug: "vessel-vase-set", name: "Vessel Ceramic Vase Set", category: "Accessories", room: "home-decor", style: "Minimalist", price: 120, images: [IMG.decor1, IMG.decor2], colors: [COLORS.ivory, COLORS.terracotta, COLORS.sage], materials: ["Stoneware"], description: "A set of three hand-thrown stoneware vases in organic shapes.", customizations: [colorGroup([COLORS.ivory, COLORS.terracotta, COLORS.sage])], dims: { width: 8, depth: 8, height: 12, weight: 6 } }),
  make({ slug: "drift-wall-mirror", name: "Drift Round Wall Mirror", category: "Mirrors", room: "home-decor", style: "Modern", price: 280, images: [IMG.decor2, IMG.living2], colors: [COLORS.walnut, COLORS.ink], materials: ["Oak frame", "Glass"], description: "A round mirror with a slim oak frame to open up any wall.", dims: { width: 32, depth: 2, height: 32, weight: 18 }, isNew: true }),
  make({ slug: "hearth-throw-blanket", name: "Hearth Wool Throw", category: "Textiles", room: "home-decor", style: "Scandinavian", price: 140, images: [IMG.decor1, IMG.bedroom1], colors: [COLORS.oat, COLORS.terracotta, COLORS.charcoal], materials: ["Lambswool"], description: "A cozy lambswool throw with fringed edges, woven in Portugal.", customizations: [colorGroup([COLORS.oat, COLORS.terracotta, COLORS.charcoal])], dims: { width: 50, depth: 70, height: 1, weight: 4 } }),
  make({ slug: "grove-planter", name: "Grove Standing Planter", category: "Accessories", room: "home-decor", style: "Contemporary", price: 180, images: [IMG.decor2, IMG.living3], colors: [COLORS.ivory, COLORS.charcoal], materials: ["Fiberstone", "Oak"], description: "A standing planter that brings greenery to any corner.", dims: { width: 12, depth: 12, height: 24, weight: 10 } }),
  make({ slug: " linen-cushion-pair", name: "Linen Cushion Pair", category: "Textiles", room: "home-decor", style: "Minimalist", price: 90, images: [IMG.decor1, IMG.sofa2], colors: [COLORS.sand, COLORS.sage, COLORS.terracotta], materials: ["Washed linen"], description: "A pair of washed-linen cushions with hidden zip covers.", customizations: [colorGroup([COLORS.sand, COLORS.sage, COLORS.terracotta])], dims: { width: 20, depth: 6, height: 20, weight: 3 } }),
];

// Normalise the accidental leading space slug
products.forEach((p) => (p.slug = p.slug.trim()));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByRoom = (room: RoomType) => products.filter((p) => p.room === room);
export const bestSellers = products.filter((p) => p.bestSeller);
export const newArrivals = products.filter((p) => p.isNew);
export const onSale = products.filter((p) => p.salePrice);

export const allCategories = Array.from(new Set(products.map((p) => p.category))).sort();
export const allStyles = Array.from(new Set(products.map((p) => p.style))).sort();
export const allMaterials = Array.from(
  new Set(products.flatMap((p) => p.materials.map((m) => m.split(" ")[0]))),
).sort();
export const allColors = Array.from(
  new Map(products.flatMap((p) => p.colors).map((c) => [c.label, c])).values(),
);

export function relatedProducts(p: Product, limit = 6): Product[] {
  const explicit = p.relatedSlugs.map(getProduct).filter(Boolean) as Product[];
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const more = products.filter(
    (x) => x.room === p.room && x.slug !== p.slug && !explicit.includes(x),
  );
  return [...explicit, ...more].slice(0, limit);
}