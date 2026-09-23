import { MARKET_PRODUCTS, MarketProduct } from './qalqan-data';

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  variant: string;
  price: number;
  product: MarketProduct;
};

export type OrderStatus = 'оформлен' | 'собирается' | 'в доставке' | 'готов к выдаче' | 'завершён';

export type MarketOrder = {
  id: string;
  createdAt: string;
  total: number;
  items: CartItem[];
  recipient: {
    name: string;
    phone: string;
  };
  delivery: {
    type: 'courier' | 'pickup';
    city: string;
    address?: string;
    comment?: string;
    pickupName?: string;
    pickupAddress?: string;
    pickupHours?: string;
  };
  paymentMethod: 'card' | 'kaspi' | 'cash';
  status: OrderStatus;
};

const CART_KEY = 'qalqan-cart';
const FAVORITES_KEY = 'qalqan-favorites';
const ORDERS_KEY = 'qalqan-orders';

export const readCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeCart = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const readFavorites = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeFavorites = (items: string[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
};

export const readOrderHistory = (): MarketOrder[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MarketOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeOrderHistory = (orders: MarketOrder[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const buildCartItems = (items: Array<{ product: MarketProduct; quantity: number; variant?: string }>): CartItem[] => items.map((item) => ({
  id: `${item.product.id}-${item.variant ?? item.product.variants[0]?.name ?? 'base'}`,
  productId: item.product.id,
  quantity: item.quantity,
  variant: item.variant ?? item.product.variants[0]?.name ?? 'База',
  price: item.product.price,
  product: item.product,
}));

export const getProductById = (productId: string) => MARKET_PRODUCTS.find((product) => product.id === productId);

export const getCartTotal = (items: CartItem[]) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
