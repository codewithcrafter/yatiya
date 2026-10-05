export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  inventory: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  categoryId: string;
  collectionId?: string;
  fabricId?: string;
  colors: string[];
  sizes: string[];
  occasions: string[];
  tags: string[];
  featured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  variants: ProductVariant[];
}

const generateRandomId = () => Math.random().toString(36).substr(2, 9);
const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const baseProducts = [
  { title: "Ivory Silk Embroidered Lehenga", categoryId: "c-1", price: 25000, isNew: true, featured: true, colors: ["Ivory", "Gold"], sizes: ["S", "M", "L", "Custom"], images: ["https://images.unsplash.com/photo-1610030469983-98e550d615e1?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"] },
  { title: "Midnight Blue Velvet Anarkali", categoryId: "c-2", price: 18000, compareAtPrice: 22000, isBestSeller: true, colors: ["Midnight Blue"], sizes: ["M", "L", "XL"], images: ["https://images.unsplash.com/photo-1583391733958-d259728c1c46?auto=format&fit=crop&w=800&q=80"] },
  { title: "Emerald Green Georgette Saree", categoryId: "c-3", price: 12000, isNew: false, colors: ["Emerald Green"], sizes: ["Free Size"], images: ["https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=800&q=80"] },
  { title: "Blush Pink Organza Gown", categoryId: "c-7", price: 28000, featured: true, isBestSeller: true, colors: ["Blush Pink"], sizes: ["S", "M", "L"], images: ["https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=800&q=80"] },
  { title: "Charcoal Grey Silk Kurti", categoryId: "c-6", price: 8500, colors: ["Charcoal Grey"], sizes: ["M", "L", "XL", "XXL"], images: ["https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80"] },
  { title: "Mustard Yellow Haldi Co-ord", categoryId: "c-5", price: 9000, isNew: true, colors: ["Mustard Yellow"], sizes: ["S", "M", "L"], images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"] },
  { title: "Classic Black Evening Dress", categoryId: "c-4", price: 15000, featured: true, colors: ["Black"], sizes: ["S", "M", "L"], images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"] },
  { title: "Crimson Red Bridal Lehenga", categoryId: "c-1", price: 45000, compareAtPrice: 55000, isBestSeller: true, colors: ["Crimson Red", "Gold"], sizes: ["Custom"], images: ["https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=800&q=80"] },
  { title: "Pastel Mint Cocktail Dress", categoryId: "c-4", price: 14000, colors: ["Mint"], sizes: ["XS", "S", "M"], images: ["https://images.unsplash.com/photo-1515347619362-e67ebf8d4e7b?auto=format&fit=crop&w=800&q=80"] },
  { title: "Royal Blue Draped Saree", categoryId: "c-3", price: 19000, colors: ["Royal Blue"], sizes: ["Free Size"], images: ["https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=800&q=80"] }
];

export const products: Product[] = [];

// Generate 35 products by extending the base ones
for (let i = 0; i < 35; i++) {
  const base = baseProducts[i % baseProducts.length];
  const title = `${base.title} ${i < baseProducts.length ? '' : `Edition ${Math.floor(i / baseProducts.length) + 1}`}`.trim();
  const slug = generateSlug(title);
  
  const variants: ProductVariant[] = [];
  base.sizes.forEach(size => {
    base.colors.forEach(color => {
      variants.push({
        id: `var-${generateRandomId()}`,
        size,
        color,
        inventory: Math.floor(Math.random() * 20) + 1
      });
    });
  });

  products.push({
    id: `prod-${i + 1}`,
    slug,
    title,
    description: `Experience the luxury and elegance of this ${title.toLowerCase()}. Handcrafted with premium fabrics to give you the perfect fit and a sophisticated look for your special occasions.`,
    price: base.price,
    compareAtPrice: base.compareAtPrice,
    images: base.images,
    categoryId: base.categoryId,
    collectionId: i % 2 === 0 ? "col-1" : "col-2",
    fabricId: "fab-1",
    colors: base.colors,
    sizes: base.sizes,
    occasions: ["occ-1", "occ-2"],
    tags: ["luxury", "designer", "ethnic"],
    featured: base.featured || (i % 5 === 0),
    isNew: base.isNew || (i % 4 === 0),
    isBestSeller: base.isBestSeller || (i % 6 === 0),
    variants
  });
}
