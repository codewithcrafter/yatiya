export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: "NEW ARRIVALS",
    href: "/new-arrivals",
  },
  {
    title: "MODERN MUSE",
    href: "/collections/modern-muse",
    items: [
      { title: "Tops & Shirts", href: "/categories/tops-shirts" },
      { title: "Dresses", href: "/categories/dresses" },
      { title: "Midi", href: "/categories/midi" },
      { title: "Maxi", href: "/categories/maxi" },
      { title: "Jumpsuits", href: "/categories/jumpsuits" },
      { title: "Drapes", href: "/categories/drapes" },
      { title: "Co-Ord Sets", href: "/categories/co-ord-sets" },
      { title: "Kaftans", href: "/categories/kaftans" },
      { title: "Lounge Wear", href: "/categories/lounge-wear" },
      { title: "Pants & Palazzo", href: "/categories/pants-palazzo" },
      { title: "Shorts & Skirts", href: "/categories/shorts-skirts" },
      { title: "Winter Collection", href: "/categories/winter-collection" },
    ],
  },
  {
    title: "TIMELESS TRADITIONS",
    href: "/collections/timeless-traditions",
    items: [
      { title: "Lehenga", href: "/categories/lehenga" },
      { title: "Casual Suits", href: "/categories/casual-suits" },
      { title: "Party Wear Suits", href: "/categories/party-wear-suits" },
      { title: "Kurti", href: "/categories/kurti" },
      { title: "Anarkali", href: "/categories/anarkali" },
      { title: "Saree", href: "/categories/saree" },
      { title: "Gowns", href: "/categories/gowns" },
      { title: "Ethnic Drapes", href: "/categories/ethnic-drapes" },
      { title: "Bridal Lehenga", href: "/categories/bridal-lehenga" },
      { title: "Blouse", href: "/categories/blouse" },
      { title: "Dupatta", href: "/categories/dupatta" },
      { title: "Ethnic Co-Ord Sets", href: "/categories/ethnic-coord-sets" },
      { title: "Children's Collection", href: "/categories/childrens-collection" },
      { title: "Winter Ethnic", href: "/categories/winter-ethnic" },
    ],
  },
  {
    title: "SHOP BY OCCASION",
    href: "/occasions",
    items: [
      { title: "Wedding", href: "/occasions/wedding" },
      { title: "Haldi", href: "/occasions/haldi" },
      { title: "Mehendi", href: "/occasions/mehendi" },
      { title: "Cocktail / Sufi Night", href: "/occasions/cocktail" },
      { title: "Pre Wedding", href: "/occasions/pre-wedding" },
      { title: "Maternity", href: "/occasions/maternity" },
      { title: "Birthday", href: "/occasions/birthday" },
      { title: "Vacation", href: "/occasions/vacation" },
      { title: "Valentine", href: "/occasions/valentine" },
      { title: "Lohri", href: "/occasions/lohri" },
      { title: "Holi", href: "/occasions/holi" },
      { title: "Rakhi", href: "/occasions/rakhi" },
      { title: "Teej", href: "/occasions/teej" },
      { title: "Karvachauth", href: "/occasions/karvachauth" },
      { title: "Diwali", href: "/occasions/diwali" },
    ],
  },

  {
    title: "BUY FABRIC",
    href: "/fabrics",
    items: [
      { title: "Cotton", href: "/fabrics/cotton" },
      { title: "Rayon", href: "/fabrics/rayon" },
      { title: "Georgette", href: "/fabrics/georgette" },
      { title: "Double Georgette", href: "/fabrics/double-georgette" },
      { title: "Crepe", href: "/fabrics/crepe" },
      { title: "Designer Fabric", href: "/fabrics/designer-fabric" },
      { title: "Chiffon", href: "/fabrics/chiffon" },
    ],
  },
  {
    title: "BOOK AN APPOINTMENT",
    href: "/appointment",
  },
];
