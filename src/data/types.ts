export type RoomType =
  | "living-room"
  | "bedroom"
  | "dining-room"
  | "office"
  | "outdoor"
  | "home-decor";

export interface CustomizationOption {
  label: string;
  priceDelta: number;
  swatch?: string; // hex color for color swatches
}

export interface CustomizationGroup {
  id: string;
  name: string;
  type: "color" | "select";
  options: CustomizationOption[];
}

export interface Dimensions {
  height: number; // inches
  width: number;
  depth: number;
  weight: number; // lbs
  seatHeight?: number;
  seatDepth?: number;
  packageHeight?: number;
  packageWidth?: number;
  packageDepth?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  photo?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  room: RoomType;
  style: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: { label: string; hex: string }[];
  materials: string[];
  description: string;
  details: string[];
  care: string;
  warranty: string;
  assembly: string;
  dimensions: Dimensions;
  customizations: CustomizationGroup[];
  inStock: boolean;
  isNew?: boolean;
  bestSeller?: boolean;
  reviews: Review[];
  relatedSlugs: string[];
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  productSlugs: string[];
}

export interface RoomScene {
  slug: string;
  name: string;
  description: string;
  image: string;
  productSlugs: string[];
  hotspots: { x: number; y: number; slug: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  photo: string;
}

export interface RoomCategory {
  slug: RoomType;
  name: string;
  image: string;
  description: string;
}