export type Category = 'all' | 'face' | 'body' | 'hair' | 'accessories';

export interface Product {
  id: string;
  name: string;
  category: 'face' | 'body' | 'hair' | 'accessories';
  secondaryCategory?: 'face' | 'body' | 'hair' | 'accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: 'NEW' | 'SALE' | 'OUT OF STOCK';
  badgeColor?: string;
  badges?: Array<{ text: string; color: string }>;
  description: string;
  volume?: string;
  inStock: boolean;
  stockCount?: number;
  status?: 'Active' | 'Draft' | 'Out of Stock';
  ingredients?: string[];
  isBestSeller?: boolean;
  isTopRated?: boolean;
  isOnSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume?: string;
}

export interface Announcement {
  text: string;
  linkText?: string;
  countryNotice?: string;
}
