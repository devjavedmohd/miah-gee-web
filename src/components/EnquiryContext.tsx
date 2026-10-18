'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product, EnquiryProductItem } from '@/lib/types';
import { PRODUCTS } from '@/data/products';

interface Ctx {
  items: EnquiryProductItem[];
  selected: string[]; // names for compatibility
  has: (n: string) => boolean;
  toggle: (n: string) => void;
  toggleProduct: (p: Product) => void;
  removeById: (id: number) => void;
  clear: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalCount: number;
}

const EnquiryCtx = createContext<Ctx | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EnquiryProductItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mg_enquiry_items');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem('mg_enquiry_items', JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  }, [items, hydrated]);

  const has = (n: string) => items.some((i) => i.name.toLowerCase() === n.toLowerCase());

  const toggle = (n: string) => {
    const existing = items.find((i) => i.name.toLowerCase() === n.toLowerCase());
    if (existing) {
      setItems((prev) => prev.filter((i) => i.name.toLowerCase() !== n.toLowerCase()));
    } else {
      const found = PRODUCTS.find((p) => p.name.toLowerCase() === n.toLowerCase());
      if (found) {
        setItems((prev) => [
          ...prev,
          {
            id: found.id,
            name: found.name,
            pack: found.pack,
            category: found.category,
            image: found.image,
          },
        ]);
      } else {
        setItems((prev) => [
          ...prev,
          { id: Date.now(), name: n, pack: '', category: 'vitamins', image: '/products/001-max-cran-sachet-tablets.jpg' },
        ]);
      }
    }
  };

  const toggleProduct = (p: Product) => {
    const exists = items.some((i) => i.id === p.id);
    if (exists) {
      setItems((prev) => prev.filter((i) => i.id !== p.id));
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: p.id,
          name: p.name,
          pack: p.pack,
          category: p.category,
          image: p.image,
        },
      ]);
    }
  };

  const removeById = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clear = () => setItems([]);

  const value: Ctx = {
    items,
    selected: items.map((i) => i.name),
    has,
    toggle,
    toggleProduct,
    removeById,
    clear,
    isDrawerOpen,
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
    totalCount: items.length,
  };

  return <EnquiryCtx.Provider value={value}>{children}</EnquiryCtx.Provider>;
}

export function useEnquiry() {
  const c = useContext(EnquiryCtx);
  if (!c) throw new Error('useEnquiry must be used inside EnquiryProvider');
  return c;
}
