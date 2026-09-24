import { FEATURED_PRODUCTS } from '../data/products';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  date: string;
  total: number; // in PKR
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Completed' | 'Cancelled';
  paymentMethod: 'Cash on Delivery' | 'Bank Transfer' | 'Card';
  itemsCount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface AdminOwnerInfo {
  role: 'OWNER';
  name: string;
  phone: string;
}

export const DEFAULT_ADMIN_OWNER: AdminOwnerInfo = {
  role: 'OWNER',
  name: 'Sami Raza',
  phone: '03112989025',
};

export function getAdminOwner(): AdminOwnerInfo {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('beautifo_admin_owner');
      if (saved) return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load admin owner info', e);
  }
  return DEFAULT_ADMIN_OWNER;
}

export function saveAdminOwner(info: AdminOwnerInfo): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('beautifo_admin_owner', JSON.stringify(info));
      window.dispatchEvent(new CustomEvent('beautifo_owner_updated', { detail: info }));
    }
  } catch (e) {
    console.error('Failed to save admin owner info', e);
  }
}

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: '#BTF-8942',
    customerName: 'Ayesha Khan',
    email: 'ayesha.k@gmail.com',
    phone: '+92 301 8472911',
    city: 'Lahore',
    date: '2026-09-21',
    total: 5598,
    status: 'Pending',
    paymentMethod: 'Cash on Delivery',
    itemsCount: 2,
    items: [
      { name: 'Matte Liquid Lipstick', quantity: 1, price: 2799 },
      { name: 'Matte Finish BB Cream', quantity: 1, price: 2799 },
    ],
  },
  {
    id: 'ord-102',
    orderNumber: '#BTF-8941',
    customerName: 'Zainab Fatima',
    email: 'zainab.f@outlook.com',
    phone: '+92 321 4452109',
    city: 'Karachi',
    date: '2026-09-21',
    total: 3999,
    status: 'Pending',
    paymentMethod: 'Cash on Delivery',
    itemsCount: 1,
    items: [{ name: 'Daily Glow Face Wash', quantity: 1, price: 3999 }],
  },
  {
    id: 'ord-103',
    orderNumber: '#BTF-8940',
    customerName: 'Sana Tariq',
    email: 'sana.tariq@yahoo.com',
    phone: '+92 333 9912044',
    city: 'Islamabad',
    date: '2026-09-20',
    total: 8097,
    status: 'Processing',
    paymentMethod: 'Bank Transfer',
    itemsCount: 3,
    items: [
      { name: 'Hydrating Toner & Essence Set', quantity: 1, price: 2899 },
      { name: 'Moisturizing Face Cream', quantity: 1, price: 2599 },
      { name: 'Matte Liquid Lipstick', quantity: 1, price: 2799 },
    ],
  },
  {
    id: 'ord-104',
    orderNumber: '#BTF-8939',
    customerName: 'Maryam Bilal',
    email: 'maryam.b@gmail.com',
    phone: '+92 345 5583921',
    city: 'Rawalpindi',
    date: '2026-09-19',
    total: 4599,
    status: 'Confirmed',
    paymentMethod: 'Cash on Delivery',
    itemsCount: 1,
    items: [{ name: 'Brightening Face Scrub', quantity: 1, price: 4599 }],
  },
  {
    id: 'ord-105',
    orderNumber: '#BTF-8938',
    customerName: 'Hira Siddiqui',
    email: 'hira.siddiqui@gmail.com',
    phone: '+92 300 1239847',
    city: 'Faisalabad',
    date: '2026-09-18',
    total: 6898,
    status: 'Completed',
    paymentMethod: 'Cash on Delivery',
    itemsCount: 2,
    items: [
      { name: 'Gentle Foaming Face Wash', quantity: 1, price: 2299 },
      { name: 'Brightening Face Scrub', quantity: 1, price: 4599 },
    ],
  },
  {
    id: 'ord-106',
    orderNumber: '#BTF-8937',
    customerName: 'Mahnoor Ali',
    email: 'mahnoor.ali@gmail.com',
    phone: '+92 312 7784019',
    city: 'Peshawar',
    date: '2026-09-17',
    total: 2299,
    status: 'Completed',
    paymentMethod: 'Cash on Delivery',
    itemsCount: 1,
    items: [{ name: 'Sunscreen SPF 50+', quantity: 1, price: 2299 }],
  },
];

export const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'c-1',
    name: 'Ayesha Khan',
    email: 'ayesha.k@gmail.com',
    phone: '+92 301 8472911',
    city: 'Lahore',
    ordersCount: 4,
    totalSpent: 18450,
    lastOrderDate: '2026-09-21',
  },
  {
    id: 'c-2',
    name: 'Zainab Fatima',
    email: 'zainab.f@outlook.com',
    phone: '+92 321 4452109',
    city: 'Karachi',
    ordersCount: 2,
    totalSpent: 7998,
    lastOrderDate: '2026-09-21',
  },
  {
    id: 'c-3',
    name: 'Sana Tariq',
    email: 'sana.tariq@yahoo.com',
    phone: '+92 333 9912044',
    city: 'Islamabad',
    ordersCount: 5,
    totalSpent: 26390,
    lastOrderDate: '2026-09-20',
  },
  {
    id: 'c-4',
    name: 'Maryam Bilal',
    email: 'maryam.b@gmail.com',
    phone: '+92 345 5583921',
    city: 'Rawalpindi',
    ordersCount: 1,
    totalSpent: 4599,
    lastOrderDate: '2026-09-19',
  },
  {
    id: 'c-5',
    name: 'Hira Siddiqui',
    email: 'hira.siddiqui@gmail.com',
    phone: '+92 300 1239847',
    city: 'Faisalabad',
    ordersCount: 3,
    totalSpent: 14200,
    lastOrderDate: '2026-09-18',
  },
  {
    id: 'c-6',
    name: 'Mahnoor Ali',
    email: 'mahnoor.ali@gmail.com',
    phone: '+92 312 7784019',
    city: 'Peshawar',
    ordersCount: 2,
    totalSpent: 5198,
    lastOrderDate: '2026-09-17',
  },
];
