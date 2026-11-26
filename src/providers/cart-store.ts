import { CartItem } from "@/providers/cart-context";

/**
 * The cart in the localStorage of the browser, so a reload, a new page or another tab sees the same cart.
 * It is read with useSyncExternalStore: the server (and the first render in the browser) sees an empty cart.
 */

const STORAGE_KEY = "dh-cart";
const EMPTY: CartItem[] = [];

const listeners = new Set<() => void>();

// the parsed cart of the last stored text, so a snapshot is the same object until the cart changes
let cachedText: string | null = null;
let cachedItems: CartItem[] = EMPTY;

const parse = (text: string | null): CartItem[] => {
  try {
    const items = JSON.parse(text ?? "[]");

    return Array.isArray(items) ? items : EMPTY;
  } catch {
    return EMPTY;
  }
};

export const cartStore = {
  subscribe(listener: () => void) {
    // another tab changed the cart
    const onStorage = (event: StorageEvent) => event.key === STORAGE_KEY && listener();

    listeners.add(listener);
    window.addEventListener("storage", onStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },

  getSnapshot(): CartItem[] {
    const text = localStorage.getItem(STORAGE_KEY);

    if (text !== cachedText) {
      cachedText = text;
      cachedItems = parse(text);
    }

    return cachedItems;
  },

  getServerSnapshot: (): CartItem[] => EMPTY,

  update(change: (items: CartItem[]) => CartItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(change(cartStore.getSnapshot())));
    listeners.forEach((listener) => listener());
  },
};
