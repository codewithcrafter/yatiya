
export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface MockCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface MockProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  collectionIds: string[];
  price: number;
  salePrice?: number;
  discount?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  tags: string[];
  fabric?: string;
  care?: string;
  fit?: string;
  details?: string[];
}

export const mockCategories: MockCategory[] = [
  { id: 'cat-1', name: 'Bridal', slug: 'bridal', description: 'Exquisite bridal wear for your special day.', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=800&q=80' },
  { id: 'cat-2', name: 'Wedding', slug: 'wedding', description: 'Stunning outfits for wedding guests and family.', image: 'https://images.unsplash.com/photo-1594938298596-189f31b53e77?w=800&q=80' },
  { id: 'cat-3', name: 'Festive', slug: 'festive', description: 'Celebrate in style with our festive collection.', image: 'https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?w=800&q=80' },
  { id: 'cat-4', name: 'Party Wear', slug: 'party-wear', description: 'Glamorous evening and party wear.', image: 'https://images.unsplash.com/photo-1583391733958-d259728c1c46?w=800&q=80' },
  { id: 'cat-5', name: 'Designer', slug: 'designer', description: 'Exclusive designer pieces.', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80' },
];

export const mockCollections: MockCollection[] = [
  { id: 'col-1', name: 'New Arrivals', slug: 'new-arrivals', description: 'Discover our latest premium creations.', image: 'https://images.unsplash.com/photo-1610030469983-98e550d615e1?w=800&q=80' },
  { id: 'col-2', name: 'The Wedding Edit', slug: 'the-wedding-edit', description: 'Curated for the perfect wedding season.', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=800&q=80' },
  { id: 'col-3', name: 'Festive Gold', slug: 'festive-gold', description: 'Rich traditional tones for festive celebrations.', image: 'https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?w=800&q=80' },
];

const manualProducts: MockProduct[] = [
  {
    id: "f1",
    name: "Royal Embroidered Lehenga",
    slug: "royal-embroidered-lehenga",
    description: "A masterpiece of traditional craftsmanship blended with modern elegance.",
    categoryId: "cat-1",
    collectionIds: ["col-1", "col-2"],
    price: 14999,
    salePrice: 11999,
    discount: 20,
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d615e1?auto=format&fit=crop&w=800&q=80"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Customise Size'],
    colors: ['Gold', 'Maroon'],
    rating: 5,
    reviews: 120,
    featured: true,
    trending: true,
    newArrival: true,
    stockStatus: 'IN_STOCK',
    tags: ['bridal', 'premium'],
    fabric: 'Silk Organza',
    care: 'Dry clean only',
    fit: 'True to size',
    details: ['Zari work', 'Includes blouse piece']
  },
  {
    id: "f2",
    name: "Velvet Bridal Lehenga",
    slug: "velvet-bridal-lehenga",
    description: "Exquisite velvet lehenga for bridal elegance.",
    categoryId: "cat-1",
    collectionIds: ["col-2"],
    price: 18999,
    salePrice: 14999,
    discount: 21,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Customise Size'],
    colors: ['Maroon'],
    rating: 5,
    reviews: 89,
    featured: true,
    trending: false,
    newArrival: true,
    stockStatus: 'IN_STOCK',
    tags: ['bridal', 'velvet'],
    fabric: 'Premium Velvet',
    care: 'Dry clean only',
    fit: 'True to size',
    details: ['Heavy embroidery']
  },
  {
    id: "f3",
    name: "Designer Zari Lehenga",
    slug: "designer-zari-lehenga",
    description: "Stunning designer lehenga with heavy zari embroidery.",
    categoryId: "cat-5",
    collectionIds: ["col-1"],
    price: 21999,
    salePrice: 16999,
    discount: 22,
    images: ["https://images.unsplash.com/photo-1583391733958-d259728c1c46?auto=format&fit=crop&w=800&q=80"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Customise Size'],
    colors: ['Gold'],
    rating: 5,
    reviews: 55,
    featured: true,
    trending: true,
    newArrival: false,
    stockStatus: 'IN_STOCK',
    tags: ['designer', 'zari'],
    fabric: 'Banarasi Silk',
    care: 'Dry clean only',
    fit: 'True to size',
    details: ['Designer series']
  },
  {
    id: "f4",
    name: "Festive Couture Lehenga",
    slug: "festive-couture-lehenga",
    description: "Couture lehenga perfectly crafted for festive occasions.",
    categoryId: "cat-3",
    collectionIds: ["col-3"],
    price: 13999,
    salePrice: 10999,
    discount: 21,
    images: ["https://images.unsplash.com/photo-1610189044238-7bb79e0004cc?auto=format&fit=crop&w=800&q=80"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Customise Size'],
    colors: ['Red'],
    rating: 5,
    reviews: 77,
    featured: true,
    trending: true,
    newArrival: false,
    stockStatus: 'IN_STOCK',
    tags: ['festive', 'couture'],
    fabric: 'Silk',
    care: 'Dry clean only',
    fit: 'True to size',
    details: ['Limited edition']
  },
  {
    id: "f5",
    name: "Pastel Pink Bridal Lehenga",
    slug: "pastel-pink-bridal-lehenga",
    description: "A soft pastel pink bridal masterpiece.",
    categoryId: "cat-1",
    collectionIds: ["col-2"],
    price: 19999,
    salePrice: 15999,
    discount: 20,
    images: ["https://images.unsplash.com/photo-1594938298596-189f31b53e77?auto=format&fit=crop&w=800&q=80"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Customise Size'],
    colors: ['Pink'],
    rating: 5,
    reviews: 44,
    featured: true,
    trending: false,
    newArrival: true,
    stockStatus: 'IN_STOCK',
    tags: ['bridal', 'pastel'],
    fabric: 'Organza',
    care: 'Dry clean only',
    fit: 'True to size',
    details: ['Hand crafted pastel tones']
  }
];

export const mockProducts: MockProduct[] = [...manualProducts, ...Array.from({ length: 48 }).map((_, i): MockProduct => {
  const cat = mockCategories[i % mockCategories.length];
  const isSale = i % 3 === 0;
  const price = 15000 + (i * 1000);
  const salePrice = isSale ? price * 0.8 : undefined;
  
  return {
    id: `prod-${i + 1}`,
    name: `Premium ${cat.name} ${i % 2 === 0 ? 'Lehenga' : 'Saree'} ${i + 1}`,
    slug: `premium-${cat.slug}-${i % 2 === 0 ? 'lehenga' : 'saree'}-${i + 1}`,
    description: 'A masterpiece of traditional craftsmanship blended with modern elegance. Perfect for your most special occasions.',
    categoryId: cat.id,
    collectionIds: [mockCollections[i % mockCollections.length].id, mockCollections[(i + 1) % mockCollections.length].id],
    price,
    salePrice,
    discount: isSale ? 20 : undefined,
    images: [
      cat.image,
      mockCategories[(i + 1) % mockCategories.length].image
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Customise Size'],
    colors: ['Gold', 'Ivory', 'Maroon', 'Champagne'],
    rating: 4 + (Math.random() * 1),
    reviews: Math.floor(Math.random() * 100) + 5,
    featured: i % 5 === 0,
    trending: i % 4 === 0,
    newArrival: i % 6 === 0,
    stockStatus: i % 10 === 0 ? 'LOW_STOCK' : 'IN_STOCK',
    tags: ['premium', cat.name.toLowerCase(), 'luxury'],
    fabric: i % 2 === 0 ? 'Premium Silk Organza' : 'Handwoven Banarasi Silk',
    care: 'Dry clean only. Do not bleach. Store in a cool, dry place away from direct sunlight.',
    fit: `True to size. The model is 5'8" and is wearing a size S.`,
    details: [
      'Hand-embroidered zari work',
      'Intricate traditional motifs',
      'Includes matching unstitched blouse piece',
      'Premium inner lining for comfort'
    ],
  };
})];

export const getProducts = () => mockProducts;
export const getCategories = () => mockCategories;
export const getCollections = () => mockCollections;
export const getCategoryBySlug = (slug: string) => mockCategories.find(c => c.slug === slug);
export const getCollectionBySlug = (slug: string) => mockCollections.find(c => c.slug === slug);
export const getProductBySlug = (slug: string) => mockProducts.find(p => p.slug === slug);
