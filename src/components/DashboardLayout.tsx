import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Image,
    FolderTree,
    Package,
    Settings,
    Menu,
    X,
    Bell
} from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

const navItems = [
    { name: 'لوحة التحكم', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'البانرات', icon: Image, path: '/dashboard/banners' },
    { name: 'الأقسام', icon: FolderTree, path: '/dashboard/categories' },
    { name: 'المنتجات', icon: Package, path: '/dashboard/products' },
    { name: 'الإشعارات', icon: Bell, path: '/dashboard/notifications' },
    { name: 'إعدادات الصفحة', icon: Settings, path: '/dashboard/homepage' },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed top-4 right-4 z-50 md:hidden bg-primary text-white p-3 rounded-xl shadow-lg"
            >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside className={`
        fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-40
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        md:translate-x-0
      `}>
                {/* Logo/Header */}
                <div className="p-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-xl">T</span>
                        </div>
                        <div className="text-right">
                            <h1 className="text-lg font-black text-gray-800">تفانين</h1>
                            <p className="text-xs text-gray-500">لوحة التحكم</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive(item.path)
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                }
              `}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-bold text-sm">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold">A</span>
                        </div>
                        <div className="flex-1 text-right">
                            <p className="text-sm font-bold text-gray-800">المدير</p>
                            <p className="text-xs text-gray-500">admin@tafaneen.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:mr-64 min-h-screen">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="text-sm font-bold text-primary hover:text-primary/80 transition-colors px-4 py-2 bg-primary/5 rounded-full hover:bg-primary/10"
                            >
                                العودة للموقع ←
                            </Link>
                        </div>
                        <h2 className="text-xl font-black text-gray-800">
                            {navItems.find(item => isActive(item.path))?.name || 'لوحة التحكم'}
                        </h2>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-6">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};
