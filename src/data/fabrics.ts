export interface Fabric {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export const fabrics: Fabric[] = [
  { id: "fab-1", slug: "cotton", name: "Cotton", description: "Breathable, comfortable pure cotton." },
  { id: "fab-2", slug: "georgette", name: "Georgette", description: "Lightweight and flowy georgette." },
  { id: "fab-3", slug: "silk", name: "Silk", description: "Luxurious pure silk." },
  { id: "fab-4", slug: "chanderi", name: "Chanderi", description: "Traditional sheer chanderi." },
  { id: "fab-5", slug: "crepe", name: "Crepe", description: "Soft crepe with a beautiful drape." },
  { id: "fab-6", slug: "velvet", name: "Velvet", description: "Rich, plush velvet for winter." },
  { id: "fab-7", slug: "organza", name: "Organza", description: "Crisp and elegant organza." },
];
