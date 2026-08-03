
import { ShoppingCart, Heart, Bell, Menu, ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { EnhancedSearch } from "./EnhancedSearch";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  isHome?: boolean;
}

export const Header = ({ title = "الأقسام", showBack = false, isHome = false }: HeaderProps) => {
  const { cartCount } = useCart();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const mainNavItems = [
    { label: "الرئيسية", path: "/" },
    { label: "الأقسام", path: "/categories" },
    { label: "العروض", path: "/offers" },
    { label: "طلبياتي", path: "/orders" },
    { label: "الاعدادات", path: "/settings" },
    { label: "حسابي", path: "/account" },
  ];
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b shadow-sm pb-2">
      <div className="container pt-3 px-4">
        {/* Top Row: Icons and Logo */}
        <div className="flex items-center justify-between gap-4 mb-3">

          {isHome ? (
            <>
              {/* RIGHT SIDE (RTL): Logo */}
              <Link to="/">
                <div className="w-12 h-12 flex-shrink-0 border border-primary/10 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-sm">
                  <img
                    src="/tafaneen-logo.jpg"
                    alt="Tafaneen Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              {/* LEFT SIDE: Cart + Favorites + Notifications + Menu */}
              <div className="flex items-center gap-3">
                {/* Cart Icon */}
                <Link to="/cart" className="relative p-1 hover:bg-accent/10 rounded-full transition-colors">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold animate-bounce-in">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Heart/Favorites Icon */}
                <Link
                  to="/favorites"
                  className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100/50"
                >
                  <Heart className="w-5 h-5" />
                </Link>

                {/* Notification Bell */}
                <Link to="/notifications" className="p-1 hover:bg-accent/10 rounded-full transition-colors relative">
                  <Bell className="h-6 w-6 text-primary" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
                </Link>

                {/* Menu/Hamburger */}
                <Link to="/categories" className="p-1 hover:bg-accent/10 rounded-full transition-colors">
                  <Menu className="h-7 w-7 text-primary" />
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* SUB-PAGE MODE: Back Arrow (Right) + Title (Center) + Cart (Left) */}
              <div className="flex items-center gap-2">
                {showBack && (
                  <button onClick={() => navigate(-1)} className="p-1 hover:bg-accent/10 rounded-full transition-colors">
                    <ChevronRight className="h-7 w-7 text-primary" />
                  </button>
                )}
                {!showBack && <div className="w-10"></div>}
              </div>

              <h1 className="text-xl font-bold text-primary flex-1 text-center">{title}</h1>

              <Link to="/cart" className="relative p-2 hover:bg-accent/10 rounded-full transition-colors">
                <ShoppingCart className="h-6 w-6 text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce-in">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>

        {/* Search Bar - Conditional Placeholder/Background */}
        <div className="w-full mb-1">
          <EnhancedSearch
            placeholder={isHome ? "أقلام / دفاتر / طابعات" : "ماذا الذي تود شراؤه اليوم؟"}
            className={!isHome ? "bg-yellow-50/50 rounded-2xl" : ""}
          />
        </div>

        <nav className="hidden md:flex items-center justify-between mt-1 text-sm font-semibold text-gray-700">
          <div className="flex items-center gap-4">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`pb-2 border-b-2 transition-colors ${
                  isActive(item.path)
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary hover:border-primary/40"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header >
  );
};
