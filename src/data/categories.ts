export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  parentId?: string;
  image?: string;
}

export const categories: Category[] = [
  // Women
  { id: "c-1", slug: "lehenga", name: "Lehenga", description: "Traditional & modern lehengas" },
  { id: "c-2", slug: "anarkali", name: "Anarkali", description: "Flowy and elegant anarkali suits" },
  { id: "c-3", slug: "saree", name: "Saree", description: "Exquisite sarees for every occasion" },
  { id: "c-4", slug: "dresses", name: "Dresses", description: "Contemporary dresses" },
  { id: "c-5", slug: "co-ord-sets", name: "Co-Ord Sets", description: "Matching top and bottom sets" },
  { id: "c-6", slug: "kurti", name: "Kurti", description: "Daily and festive wear kurtis" },
  { id: "c-7", slug: "gowns", name: "Gowns", description: "Evening and bridal gowns" },
  { id: "c-8", slug: "kaftans", name: "Kaftans", description: "Comfortable and stylish kaftans" },

];
