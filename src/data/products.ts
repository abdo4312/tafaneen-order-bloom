// Comprehensive Product Database (Cleaned)
import { mockProducts, Product as MockProduct } from './mockData';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string | string[];
  brand: string;
  keywords: string[];
  inStock: boolean;
  rating: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPopular?: boolean;
}

// Map mockProducts to the Product interface used by SearchPage
export const allProducts: Product[] = mockProducts.map(p => ({
  id: p.id,
  name: p.name,
  description: `منتج عالي الجودة من فئة ${p.categoryId}`,
  price: p.price,
  originalPrice: p.originalPrice,
  image: p.image,
  category: p.categoryId,
  brand: 'تفانين',
  keywords: [p.name, p.categoryId, p.subcategoryId || ''].filter(Boolean),
  inStock: p.active,
  rating: 4.8,
  isNew: p.isNewArrival,
  isBestSeller: p.isBestSeller,
}));

// Helper functions for Search and filtering
export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.keywords.some(k => k.toLowerCase().includes(q))
  );
};

export const filterByCategory = (products: Product[], category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(p =>
    Array.isArray(p.category) ? p.category.includes(category) : p.category === category
  );
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-low': return sorted.sort((a, b) => a.price - b.price);
    case 'price-high': return sorted.sort((a, b) => b.price - a.price);
    case 'rating': return sorted.sort((a, b) => b.rating - a.rating);
    case 'name': return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default: return sorted;
  }
};

export const getUniqueCategories = (): string[] => {
  const cats = new Set<string>();
  allProducts.forEach(p => {
    if (Array.isArray(p.category)) p.category.forEach(c => cats.add(c));
    else cats.add(p.category);
  });
  return ['all', ...Array.from(cats)];
};

export const getUniqueBrands = (): string[] => {
  const brands = new Set<string>();
  allProducts.forEach(p => brands.add(p.brand));
  return Array.from(brands);
};
