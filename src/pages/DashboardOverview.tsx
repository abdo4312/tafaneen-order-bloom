import { DashboardLayout } from '@/components/DashboardLayout';
import { Image, FolderTree, Package, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
    const stats = [
        { label: 'البانرات النشطة', value: '3', icon: Image, color: 'bg-blue-500' },
        { label: 'الأقسام', value: '6', icon: FolderTree, color: 'bg-green-500' },
        { label: 'المنتجات', value: '24', icon: Package, color: 'bg-purple-500' },
        { label: 'الأكثر مبيعاً', value: '8', icon: TrendingUp, color: 'bg-orange-500' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome */}
                <div className="bg-gradient-to-br from-primary to-red-600 rounded-2xl p-8 text-white">
                    <h1 className="text-3xl font-black mb-2">مرحباً بك! 👋</h1>
                    <p className="text-white/90">إدارة محتوى موقع تفانين</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-3xl font-black text-gray-800">{stat.value}</span>
                            </div>
                            <p className="text-sm font-bold text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-black text-gray-800 mb-4">إجراءات سريعة</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            to="/dashboard/banners"
                            className="group p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-right"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Image className="w-5 h-5 text-white" />
                                </div>
                                <p className="font-bold text-gray-700 group-hover:text-primary transition-colors">إضافة بانر جديد</p>
                            </div>
                            <p className="text-xs text-gray-500">إضافة عرض ترويجي للصفحة الرئيسية</p>
                        </Link>

                        <Link
                            to="/dashboard/categories"
                            className="group p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-right"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <FolderTree className="w-5 h-5 text-white" />
                                </div>
                                <p className="font-bold text-gray-700 group-hover:text-primary transition-colors">إضافة قسم</p>
                            </div>
                            <p className="text-xs text-gray-500">قسم جديد للمنتجات</p>
                        </Link>

                        <Link
                            to="/dashboard/products"
                            className="group p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-right"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Package className="w-5 h-5 text-white" />
                                </div>
                                <p className="font-bold text-gray-700 group-hover:text-primary transition-colors">إضافة منتج</p>
                            </div>
                            <p className="text-xs text-gray-500">منتج جديد للبيع</p>
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardOverview;
