// src/pages/SearchPage.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { Search, Filter, Star, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  searchProducts,
  filterByCategory,
  sortProducts,
  getUniqueCategories,
  getUniqueBrands,
  type Product
} from "@/data/products";



export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterBrand, setFilterBrand] = useState("all");
  const [currentQuery, setCurrentQuery] = useState(query);

  // البحث الذكي المحسن
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      if (query.trim() === "") {
        setSearchResults([]);
      } else {
        // البحث الذكي باستخدام الدالة المحسنة
        let results = searchProducts(query);

        // تطبيق فلتر الفئة
        results = filterByCategory(results, filterCategory);

        // تطبيق فلتر العلامة التجارية
        if (filterBrand !== "all") {
          results = results.filter(product =>
            product.brand.toLowerCase() === filterBrand.toLowerCase()
          );
        }

        // ترتيب النتائج
        results = sortProducts(results, sortBy);

        setSearchResults(results);
      }
      setLoading(false);
    }, 400); // تقليل وقت التأخير للاستجابة السريعة

    return () => clearTimeout(timer);
  }, [query, sortBy, filterCategory, filterBrand]);

  // تحديث البحث عند تغيير النص
  const handleSearchChange = (newQuery: string) => {
    setCurrentQuery(newQuery);
    const newParams = new URLSearchParams(searchParams);
    if (newQuery.trim()) {
      newParams.set("q", newQuery);
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  // الحصول على الفئات والعلامات التجارية الفريدة
  const categories = getUniqueCategories();
  const brands = ["all", ...getUniqueBrands()];

  return (
    <div className="min-h-screen bg-gray-50 pb-24" dir="rtl">
      <Header title="نتائج البحث" showBack={true} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex flex-wrap gap-2 w-full justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 min-w-[120px] rounded-xl border-gray-200 shadow-sm">
                  <Filter className="h-4 w-4 text-primary" />
                  <span className="font-bold">{filterCategory === "all" ? "جميع الفئات" : filterCategory}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={filterCategory === category ? "bg-primary/10 text-primary font-bold" : ""}
                  >
                    {category === "all" ? "جميع الفئات" : category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 min-w-[120px] rounded-xl border-gray-200 shadow-sm">
                  <Filter className="h-4 w-4 text-primary" />
                  <span className="font-bold">{filterBrand === "all" ? "جميع الماركات" : filterBrand}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {brands.map((brand) => (
                  <DropdownMenuItem
                    key={brand}
                    onClick={() => setFilterBrand(brand)}
                    className={filterBrand === brand ? "bg-primary/10 text-primary font-bold" : ""}
                  >
                    {brand === "all" ? "جميع الماركات" : brand}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 min-w-[120px] rounded-xl border-gray-200 shadow-sm">
                  <span className="font-bold">ترتيب حسب</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem
                  onClick={() => setSortBy("relevance")}
                  className={sortBy === "relevance" ? "bg-primary/10 text-primary font-bold" : ""}
                >
                  الأكثر صلة
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("price-low")}
                  className={sortBy === "price-low" ? "bg-primary/10 text-primary font-bold" : ""}
                >
                  السعر: من الأقل إلى الأعلى
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("price-high")}
                  className={sortBy === "price-high" ? "bg-primary/10 text-primary font-bold" : ""}
                >
                  السعر: من الأعلى إلى الأقل
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("rating")}
                  className={sortBy === "rating" ? "bg-primary/10 text-primary font-bold" : ""}
                >
                  الأعلى تقييماً
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("name")}
                  className={sortBy === "name" ? "bg-primary/10 text-primary font-bold" : ""}
                >
                  الاسم (أ-ي)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : searchResults.length > 0 ? (
        <>
          {/* معلومات النتائج */}
          <div className="mb-6 p-4 bg-muted/30 rounded-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">تم العثور على</span>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {searchResults.length}
                </Badge>
                <span>منتج</span>
              </div>

              {/* إحصائيات سريعة */}
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>أقلام برافو: {searchResults.filter(p => p.brand === 'برافو').length}</span>
                <span>أقلام روتو: {searchResults.filter(p => p.brand === 'روتو').length}</span>
                <span>أقلام بريما: {searchResults.filter(p => p.brand === 'بريما').length}</span>
              </div>
            </div>
          </div>

          {/* شبكة المنتجات */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={{ ...product, id: String(product.id) }} variant="grid" />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="mb-6 text-muted-foreground">
            <Search className="h-16 w-16 mx-auto mb-4 opacity-30" />
          </div>
          <h3 className="text-2xl font-bold mb-4">لا توجد نتائج للبحث</h3>
          <p className="text-muted-foreground mb-8 text-lg">
            لم نتمكن من العثور على منتجات تطابق بحثك عن "{query}"
          </p>

          {/* اقتراحات البحث */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-muted/50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold mb-4">جرب البحث عن:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {['ليكويد بول', 'برافو', 'روتو', 'بريما', 'فرنساوي', 'أقلام حبر سائل'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSearchChange(suggestion)}
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h5 className="font-medium">نصائح للبحث:</h5>
                <ul className="text-muted-foreground space-y-1">
                  <li>• تحقق من تهجئة الكلمات</li>
                  <li>• استخدم كلمات أكثر عمومية</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium">أمثلة على البحث:</h5>
                <ul className="text-muted-foreground space-y-1">
                  <li>• "ليكويد" للبحث عن أقلام سائلة</li>
                  <li>• "برافو" لجميع أقلام برافو</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium">فئات شائعة:</h5>
                <ul className="text-muted-foreground space-y-1">
                  <li>• أقلام حبر سائل</li>
                  <li>• أقلام جاف</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
}
