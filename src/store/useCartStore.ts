import { create } from "zustand";
import { Product } from "../types/product/product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Increase quantity if already in cart
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Add new item with quantity 1
        return {
          items: [...state.items, { ...product, quantity: 1 }],
        };
      }
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      return { items: newItems };
    }),

  increaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),

  clearCart: () => set({ items: [] }),
}));
