export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  bannerImage?: string;
}

export const collections: Collection[] = [
  {
    id: "col-1",
    slug: "modern-muse",
    name: "Modern Muse",
    description: "Contemporary silhouettes for the modern woman.",
    bannerImage: "/images/collections/modern-muse.jpg",
  },
  {
    id: "col-2",
    slug: "timeless-traditions",
    name: "Timeless Traditions",
    description: "Classic ethnic wear that transcends time.",
    bannerImage: "/images/collections/timeless-traditions.jpg",
  },

  {
    id: "col-4",
    slug: "bridal",
    name: "Bridal Couture",
    description: "Make your special day unforgettable with our bridal couture.",
    bannerImage: "/images/collections/bridal.jpg",
  }
];
