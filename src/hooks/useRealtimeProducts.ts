import { useEffect, useState } from 'react';
// import { supabase } from '@/integrations/supabase/client';

import { Product } from '@/pages/DashboardAdmin/pages/ProductsManagement';

export const useRealtimeProducts = (initialProducts: Product[] = []) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  return products;
};