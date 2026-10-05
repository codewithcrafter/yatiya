export interface Occasion {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
}

export const occasions: Occasion[] = [
  { id: "occ-1", slug: "wedding", name: "Wedding", description: "Outfits perfect for the main wedding day." },
  { id: "occ-2", slug: "haldi", name: "Haldi", description: "Bright and comfortable wear for haldi ceremonies." },
  { id: "occ-3", slug: "mehendi", name: "Mehendi", description: "Vibrant styles for the mehendi night." },
  { id: "occ-4", slug: "cocktail", name: "Cocktail / Sufi Night", description: "Glamorous looks for cocktail events." },
  { id: "occ-5", slug: "festive", name: "Festivals", description: "Celebrate festivals in style." },
  { id: "occ-6", slug: "casual", name: "Casual Everyday", description: "Elevated casual wear." },
];
