import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Scissors, 
  Palette, 
  Brush, 
  FileText,
  Layers,
  PaintBucket,
  Sparkles
} from "lucide-react";

export function ArtSuppliesCategories() {
  const artCategories = [
    // Cutting & Pasting Tools
    {
      id: 1,
      name: "قص و لصق",
      englishName: "Cutting & Pasting",
      description: "أدوات القص واللصق والتجليد",
      icon: Scissors,
      color: "bg-gradient-to-br from-red-500 to-red-600",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      count: "45+ منتج",
      route: "/art-supplies/cutting-pasting",
      emoji: "✂️"
    },
    {
      id: 2,
      name: "مقاصات",
      englishName: "Scissors",
      description: "مقاصات بأحجام وأنواع مختلفة",
      icon: Scissors,
      color: "bg-gradient-to-br from-gray-500 to-gray-600",
      textColor: "text-gray-600",
      bgColor: "bg-gray-50",
      count: "25+ منتج",
      route: "/art-supplies/scissors",
      emoji: "✂️"
    },
    
    // Drawing & Coloring Tools
    {
      id: 3,
      name: "أقلام ألوان الخشب",
      englishName: "Wooden Colored Pencils",
      description: "أقلام ألوان خشبية بجودة عالية",
      icon: Brush,
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
      count: "80+ منتج",
      route: "/art-supplies/wooden-pencils",
      emoji: "🖍️"
    },
    {
      id: 4,
      name: "ألوان الشمع",
      englishName: "Wax Crayons",
      description: "ألوان شمعية ناعمة وزاهية",
      icon: Palette,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      count: "60+ منتج",
      route: "/art-supplies/wax-crayons",
      emoji: "🖍️"
    },
    {
      id: 5,
      name: "ألوان فلوماستر",
      englishName: "Felt-tip Markers",
      description: "ألوان فلوماستر بألوان متنوعة",
      icon: Brush,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      count: "70+ منتج",
      route: "/art-supplies/felt-markers",
      emoji: "🖍️"
    },
    
    // Professional Paints
    {
      id: 6,
      name: "ألوان مية",
      englishName: "Watercolors",
      description: "ألوان مائية للرسم الفني",
      icon: PaintBucket,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      count: "50+ منتج",
      route: "/art-supplies/watercolors",
      emoji: "🎨"
    },
    {
      id: 7,
      name: "ألوان جواش",
      englishName: "Gouache Colors",
      description: "ألوان جواش غير شفافة",
      icon: PaintBucket,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      count: "40+ منتج",
      route: "/art-supplies/gouache",
      emoji: "🎨"
    },
    {
      id: 8,
      name: "ألوان أكريليك",
      englishName: "Acrylic Colors",
      description: "ألوان أكريليك سريعة الجفاف",
      icon: PaintBucket,
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
      textColor: "text-teal-600",
      bgColor: "bg-teal-50",
      count: "55+ منتج",
      route: "/art-supplies/acrylic",
      emoji: "🎨"
    },
    {
      id: 9,
      name: "ألوان زيت",
      englishName: "Oil Colors",
      description: "ألوان زيتية للرسم الاحترافي",
      icon: PaintBucket,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      count: "35+ منتج",
      route: "/art-supplies/oil-colors",
      emoji: "🎨"
    },
    
    // Paper & Canvas
    {
      id: 10,
      name: "كانسون",
      englishName: "Canson Paper",
      description: "ورق كانسون عالي الجودة",
      icon: FileText,
      color: "bg-gradient-to-br from-slate-500 to-slate-600",
      textColor: "text-slate-600",
      bgColor: "bg-slate-50",
      count: "30+ منتج",
      route: "/art-supplies/canson",
      emoji: "📄"
    },
    {
      id: 11,
      name: "سكتش كانسون",
      englishName: "Canson Sketch",
      description: "دفاتر سكتش كانسون للرسم",
      icon: FileText,
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      textColor: "text-cyan-600",
      bgColor: "bg-cyan-50",
      count: "25+ منتج",
      route: "/art-supplies/canson-sketch",
      emoji: "📓"
    },
    {
      id: 12,
      name: "كراسة رسم كبيرة",
      englishName: "Large Drawing Notebook",
      description: "كراسات رسم بحجم كبير",
      icon: FileText,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      count: "20+ منتج",
      route: "/art-supplies/large-sketch",
      emoji: "📔"
    },
    {
      id: 13,
      name: "كراسة رسم صغيرة",
      englishName: "Small Drawing Notebook",
      description: "كراسات رسم بحجم صغير",
      icon: FileText,
      color: "bg-gradient-to-br from-lime-500 to-lime-600",
      textColor: "text-lime-600",
      bgColor: "bg-lime-50",
      count: "18+ منتج",
      route: "/art-supplies/small-sketch",
      emoji: "📒"
    },
    {
      id: 14,
      name: "كراسات تلوين",
      englishName: "Coloring Books",
      description: "كراسات تلوين للأطفال والكبار",
      icon: FileText,
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
      textColor: "text-pink-600",
      bgColor: "bg-pink-50",
      count: "40+ منتج",
      route: "/art-supplies/coloring-books",
      emoji: "📚"
    },
    
    // Foam Materials
    {
      id: 16,
      name: "فوم لاصق",
      englishName: "Adhesive Foam",
      description: "فوم لاصق للتطبيقات المختلفة",
      icon: Layers,
      color: "bg-gradient-to-br from-rose-500 to-rose-600",
      textColor: "text-rose-600",
      bgColor: "bg-rose-50",
      count: "30+ منتج",
      route: "/art-supplies/adhesive-foam",
      emoji: "🟠"
    },
    {
      id: 17,
      name: "فوم جليتر",
      englishName: "Glitter Foam",
      description: "فوم بريق للأعمال الفنية",
      icon: Sparkles,
      color: "bg-gradient-to-br from-violet-500 to-violet-600",
      textColor: "text-violet-600",
      bgColor: "bg-violet-50",
      count: "25+ منتج",
      route: "/art-supplies/glitter-foam",
      emoji: "✨"
    },
    {
      id: 18,
      name: "فوم جليتر لاصق",
      englishName: "Adhesive Glitter Foam",
      description: "فوم بريق لاصق للديكور",
      icon: Sparkles,
      color: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-600",
      textColor: "text-fuchsia-600",
      bgColor: "bg-fuchsia-50",
      count: "20+ منتج",
      route: "/art-supplies/adhesive-glitter-foam",
      emoji: "🌟"
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            فئات أدوات الرسم والأعمال الفنية
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            اكتشف مجموعة شاملة من أدوات الرسم والألوان والمواد الفنية لجميع احتياجاتك الإبداعية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`${category.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-3xl mb-2">{category.emoji}</div>
                      <IconComponent className="h-6 w-6 mb-2 mx-auto" />
                      <div className="text-xs opacity-90 mb-1">{category.count}</div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-base font-bold mb-1 text-center">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1 text-center font-medium">
                      {category.englishName}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed text-center">
                      {category.description}
                    </p>
                    
                    <Button 
                      asChild
                      variant="outline" 
                      className={`w-full text-xs ${category.textColor} border-current hover:bg-current hover:text-white transition-colors`}
                    >
                      <Link to={category.route}>تصفح المنتجات</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
