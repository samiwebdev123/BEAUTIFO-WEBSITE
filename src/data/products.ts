import { Product } from '../types';

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'face', label: 'For face' },
  { id: 'body', label: 'For body' },
  { id: 'hair', label: 'For hair' },
  { id: 'accessories', label: 'Accessories' },
] as const;

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Gentle Foaming Face Wash',
    category: 'body',
    secondaryCategory: 'face',
    price: 2299,
    originalPrice: 2800,
    rating: 5,
    reviewsCount: 38,
    image: '/images/pink-pump-bottle.jpg',
    description: 'A gentle botanical cleansing formula infused with wild rose extract, clarifying peptides, and soothing botanical actives to revive dull skin.',
    volume: '150 ml',
    inStock: true,
    ingredients: ['Rose Flower Water', 'Botanical Cleanser Complex', 'Glycerin', 'Niacinamide'],
  },
  {
    id: 'prod-2',
    name: 'Matte Finish BB Cream',
    category: 'face',
    secondaryCategory: 'accessories',
    price: 2299,
    originalPrice: 3200,
    rating: 5,
    reviewsCount: 94,
    image: '/images/round-compact.jpg',
    badge: 'NEW',
    badgeColor: 'bg-[#2EB5B3]',
    badges: [
      { text: 'NEW', color: 'bg-[#2EB5B3]' },
      { text: 'OUT OF STOCK', color: 'bg-[#666666]' },
      { text: 'SALE', color: 'bg-[#E3889B]' },
    ],
    description: 'Breathable cushion compact that delivers a velvety featherlight finish with 24-hour hydration and weightless natural skin coverage.',
    volume: '15 g',
    inStock: false,
    ingredients: ['Hyaluronic Acid', 'Pearl Powder', 'Squalane', 'Mineral Pigments'],
  },
  {
    id: 'prod-3',
    name: 'Hydrating Toner & Essence Set',
    category: 'hair',
    secondaryCategory: 'body',
    price: 2899,
    originalPrice: 3500,
    rating: 5,
    reviewsCount: 62,
    image: '/images/two-standing-bottles.jpg',
    description: 'Enriched with botanical extracts and restorative peptides to deeply rehydrate, balance pH, and deliver luminous glass-skin glow.',
    volume: '250 ml x 2',
    inStock: true,
    ingredients: ['Centella Asiatica', 'Ferment Filtrate', 'Biotin', 'Hyaluronic Acid'],
  },
  {
    id: 'prod-4',
    name: 'Daily Glow Face Wash',
    category: 'face',
    secondaryCategory: 'accessories',
    price: 3999,
    originalPrice: 4800,
    rating: 5,
    reviewsCount: 45,
    image: '/images/beige-tube.jpg',
    badge: 'SALE',
    badgeColor: 'bg-[#E3889B]',
    description: 'A multi-tasking liquid glow enhancer and face wash that sculpts natural high points while feeding the skin barrier with nourishing peptides.',
    volume: '50 ml',
    inStock: true,
    ingredients: ['Copper Tripeptide-1', 'Botanical Extracts', 'Sodium Hyaluronate', 'Vitamin E'],
  },
  {
    id: 'prod-5',
    name: 'Moisturizing Face Cream',
    category: 'face',
    secondaryCategory: 'body',
    price: 2599,
    originalPrice: 3000,
    rating: 5,
    reviewsCount: 118,
    image: '/images/white-green-jar.jpg',
    description: 'Rich whipped cream delivering instant replenishment for dry and sensitive complexions with 3 essential ceramides and nourishing plant oils.',
    volume: '60 ml',
    inStock: true,
    ingredients: ['Ceramide NP', 'Shea Butter', 'Panthenol', 'Centella Asiatica'],
  },
  {
    id: 'prod-6',
    name: 'Brightening Face Scrub',
    category: 'body',
    secondaryCategory: 'hair',
    price: 4599,
    originalPrice: 5500,
    rating: 5,
    reviewsCount: 29,
    image: '/images/pink-tube.jpg',
    description: 'Micro-fine exfoliating polish infusing skin with jasmine water, French plum seed oil, and gentle natural smoothing particles.',
    volume: '100 ml',
    inStock: true,
    ingredients: ['Plum Kernel Oil', 'Jasmine Flower Extract', 'Sweet Almond Oil', 'Jojoba Beads'],
  },
  {
    id: 'prod-7',
    name: 'Matte Liquid Lipstick',
    category: 'face',
    secondaryCategory: 'accessories',
    price: 2799,
    originalPrice: 3500,
    rating: 5,
    reviewsCount: 88,
    image: '/images/matte-liquid-lipstick.jpg',
    badge: 'NEW',
    badgeColor: 'bg-[#2EB5B3]',
    description: 'Luxurious velvety matte liquid lipstick in a flattering soft rose-nude shade that glides on smoothly, providing high-impact color payoff and all-day comfortable hydration without flaking.',
    volume: '6 ml',
    inStock: true,
    ingredients: ['Jojoba Seed Oil', 'Vitamin E', 'Shea Butter', 'Mineral Pigments', 'Hyaluronic Spheres'],
  },
  {
    id: 'prod-8',
    name: 'Sunscreen SPF 50+',
    category: 'accessories',
    secondaryCategory: 'face',
    price: 2299,
    originalPrice: 2600,
    rating: 5,
    reviewsCount: 84,
    image: '/images/white-tube.jpg',
    description: 'Ultra-sheer zinc oxide broad-spectrum mineral shield and brightening botanical applicator that leaves zero white cast.',
    volume: '50 ml',
    inStock: true,
    ingredients: ['Zinc Oxide 18%', 'Ectoin', 'Aloe Barbadensis Leaf Juice', 'Niacinamide'],
  },
];

export const BEST_SELLERS: Product[] = [
  {
    id: 'bs-1',
    name: 'Organic High-Curcumin Turmeric Powder',
    category: 'face',
    price: 2249,
    originalPrice: 2800,
    rating: 5,
    reviewsCount: 142,
    image: '/images/beige-tube.jpg',
    description: 'Concentrated restorative golden turmeric drops for clear, blemish-free luminescence.',
    inStock: true,
    isBestSeller: true,
  },
  {
    id: 'bs-2',
    name: 'Organic High-Curcumin Turmeric Powder',
    category: 'face',
    price: 2249,
    originalPrice: 2800,
    rating: 5,
    reviewsCount: 88,
    image: '/images/white-green-jar.jpg',
    description: 'Rich velvety moisture jar with firming botanicals.',
    inStock: true,
    isBestSeller: true,
  },
  {
    id: 'bs-3',
    name: 'Organic High-Curcumin Turmeric Powder',
    category: 'body',
    price: 2249,
    originalPrice: 2800,
    rating: 5,
    reviewsCount: 67,
    image: '/images/pink-pump-bottle.jpg',
    description: 'Gentle exfoliating foaming cleanser with soothing aloe.',
    inStock: true,
    isBestSeller: true,
  },
];

export const TOP_RATED: Product[] = [
  {
    id: 'tr-1',
    name: 'Organic High-Curcumin Turmeric Powder',
    category: 'hair',
    price: 2249,
    originalPrice: 2900,
    rating: 5,
    reviewsCount: 210,
    image: '/images/two-standing-bottles.jpg',
    description: 'Gold-standard botanical hair care duo for silkiness and density.',
    inStock: true,
    isTopRated: true,
  },
  {
    id: 'tr-2',
    name: 'Matte Liquid Lipstick',
    category: 'face',
    price: 2799,
    originalPrice: 3500,
    rating: 5,
    reviewsCount: 154,
    image: '/images/matte-liquid-lipstick.jpg',
    description: 'Velvety matte liquid lipstick in flattering soft rose-nude.',
    inStock: true,
    isTopRated: true,
  },
  {
    id: 'tr-3',
    name: 'Organic High-Curcumin Turmeric Powder',
    category: 'face',
    price: 2249,
    originalPrice: 2800,
    rating: 5,
    reviewsCount: 96,
    image: '/images/white-tube.jpg',
    description: 'Lightweight soothing moisture fluid with barrier ceramides.',
    inStock: true,
    isTopRated: true,
  },
];

export const ON_SALE: Product[] = [
  {
    id: 'os-1',
    name: 'Organic High-Curcumin Turmeric Powder',
    category: 'face',
    price: 2249,
    originalPrice: 3400,
    rating: 5,
    reviewsCount: 75,
    image: '/images/pink-tube.jpg',
    description: 'Botanical clarifying herbal tube with soothing tea tree & chamomile.',
    inStock: true,
    isOnSale: true,
  },
  {
    id: 'os-2',
    name: 'Organic High-Curcumin Turmeric Powder',
    category: 'face',
    price: 2249,
    originalPrice: 3000,
    rating: 5,
    reviewsCount: 112,
    image: '/images/round-compact.jpg',
    description: 'Cushion powder compact with featherlight soft-focus mineral veil.',
    inStock: true,
    isOnSale: true,
  },
  {
    id: 'os-3',
    name: 'Organic High-Curcumin Turmeric Powder',
    category: 'body',
    price: 2249,
    originalPrice: 2800,
    rating: 5,
    reviewsCount: 58,
    image: '/images/beige-tube.jpg',
    description: 'Travel size glowing peptide tube with rosehip oil.',
    inStock: true,
    isOnSale: true,
  },
];

export const BRANDS = [
  { name: 'Pure Beauty', subtitle: 'YOUR SLOGAN HERE', font: 'font-serif' },
  { name: 'LOUIS JANNE', subtitle: 'PARIS', font: 'font-sans' },
  { name: 'BEAUTY', subtitle: 'ESSENTIALS', font: 'font-serif' },
  { name: 'SPA & BEAUTY', subtitle: 'HOLISTIC LAB', font: 'font-sans' },
  { name: 'D & R', subtitle: 'NATURAL ESSENCE', font: 'font-serif' },
  { name: 'BEAUTY', subtitle: 'ORGANIC BOTANICAL', font: 'font-display' },
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1512290900672-1f5be9419114?auto=format&fit=crop&w=600&q=80',
    likes: 1240,
    comments: 48,
    tag: '#beautiforitual',
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    likes: 2480,
    comments: 92,
    tag: '#dewyskin',
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    likes: 1890,
    comments: 63,
    tag: '#spatreatments',
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1608248597359-216694665476?auto=format&fit=crop&w=600&q=80',
    likes: 3120,
    comments: 114,
    tag: '#botanicalglow',
  },
];

export const CATALOG_STORAGE_KEY = 'beautifo_catalog_products';

/**
 * Returns the central product catalog, reading from persistent localStorage
 * if modified via Admin or falling back to FEATURED_PRODUCTS.
 */
export function getCatalogProducts(): Product[] {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.error('Failed to read catalog from localStorage', e);
  }

  // Initial default catalog with stockCount and status
  return FEATURED_PRODUCTS.map((p, idx) => ({
    ...p,
    stockCount: p.inStock ? 35 + (idx * 7) : 0,
    status: p.inStock ? 'Active' : 'Out of Stock',
  }));
}

/**
 * Saves updated products catalog to localStorage and dispatches an event
 * so all active subscribers (storefront & admin) re-synchronize.
 */
export function saveCatalogProducts(products: Product[]): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(products));
      window.dispatchEvent(new Event('beautifo_catalog_updated'));
    }
  } catch (e) {
    console.error('Failed to save catalog to localStorage', e);
  }
}
