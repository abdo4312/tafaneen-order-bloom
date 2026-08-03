import { Home, ShoppingBasket, User, Settings, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { name: "الاعدادات", icon: Settings, path: "/settings" },
        { name: "طلبياتي", icon: Package, path: "/orders" },
        { name: "الرئيسية", icon: Home, path: "/" },
        { name: "العربة", icon: ShoppingBasket, path: "/cart" },
        { name: "حسابي", icon: User, path: "/account" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 md:hidden">
            {/* Modern Glassmorphism Container */}
            <nav className="w-full max-w-md md:max-w-2xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.1)] border border-gray-100/50 px-2 py-2">
                <div className="flex items-center justify-around">
                    {navItems.map((item, index) => {
                        const active = isActive(item.path);
                        const isCenter = index === 2;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`
                  flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300
                  ${isCenter
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30 -mt-8 px-5 py-3 rounded-2xl border-4 border-white'
                                        : active
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-500 hover:text-primary hover:bg-primary/5'
                                    }
                `}
                            >
                                <item.icon className={`${isCenter ? 'w-7 h-7' : 'w-6 h-6'} transition-transform ${active && !isCenter ? 'scale-110' : ''}`} />
                                <span className={`text-[10px] font-bold whitespace-nowrap ${isCenter ? 'text-white' : ''}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};
