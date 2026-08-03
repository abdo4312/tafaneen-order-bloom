
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUserNotifications, mockUserOrders, UserNotification, UserOrder, mockProducts } from "@/data/mockData";
import {
    Bell,
    ShoppingBag,
    CheckCircle2,
    Clock,
    ChevronLeft,
    Gift,
    AlertCircle,
    PackageCheck,
    Truck,
    Store,
    Star,
    Coins,
    Trophy,
    X,
    ExternalLink
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const UserNotificationsPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'notifications' | 'orders'>('notifications');
    const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);

    const getStatusStep = (status: UserOrder['status']) => {
        switch (status) {
            case 'pending': return 1;
            case 'processing': return 2;
            case 'ready': return 3;
            case 'delivered': return 4;
            default: return 1;
        }
    };

    const StatusTracker = ({ status }: { status: UserOrder['status'] }) => {
        const step = getStatusStep(status);
        const steps = [
            { id: 1, label: 'قيد المراجعة', icon: Clock },
            { id: 2, label: 'قيد التجهيز', icon: PackageCheck },
            { id: 3, label: 'جاهز للاستلام', icon: Store },
            { id: 4, label: 'تم التسليم', icon: CheckCircle2 },
        ];

        return (
            <div className="w-full py-6">
                <div className="relative flex items-center justify-between">
                    <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
                    <div
                        className="absolute left-0 top-1/2 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000"
                        style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((s) => (
                        <div key={s.id} className="relative z-10 flex flex-col items-center">
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
                                ${step >= s.id ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-white text-gray-400 border-2 border-gray-100'}
                            `}>
                                <s.icon className="w-4 h-4" />
                            </div>
                            <span className={`text-[10px] font-bold mt-2 whitespace-nowrap ${step >= s.id ? 'text-primary' : 'text-gray-400'}`}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
            <Header title="تنبيهاتك وطلباتك" showBack={true} />

            <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full space-y-6">
                {/* Custom Modern Tabs */}
                <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`flex-1 py-3 rounded-xl font-black text-sm transition-all duration-300 ${activeTab === 'notifications' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        التنبيهات
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex-1 py-3 rounded-xl font-black text-sm transition-all duration-300 ${activeTab === 'orders' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        متابعة الطلبات
                    </button>
                </div>

                {/* Notifications Content */}
                {activeTab === 'notifications' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        {mockUserNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                onClick={() => notif.type === 'offer' && navigate('/offers')}
                                className={`
                                    relative p-4 rounded-[1.5rem] border transition-all hover:shadow-lg cursor-pointer group
                                    ${notif.isRead ? 'bg-white border-gray-100' : 'bg-white border-primary/20 shadow-sm'}
                                `}
                            >
                                {!notif.isRead && (
                                    <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                )}

                                <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.type === 'offer' ? 'bg-orange-50 text-orange-500 group-hover:scale-110 transition-transform' : 'bg-primary/5 text-primary group-hover:scale-110 transition-transform'}`}>
                                        {notif.type === 'offer' ? <Gift className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                                    </div>
                                    <div className="flex-1 text-right">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-bold text-gray-400">{notif.date}</span>
                                            <h3 className="font-black text-gray-900 group-hover:text-primary transition-colors">{notif.title}</h3>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed font-medium">
                                            {notif.message}
                                        </p>
                                        {notif.image && (
                                            <div className="relative mt-3 rounded-xl overflow-hidden h-32">
                                                <img src={notif.image} alt="Offer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="bg-white text-primary px-4 py-1.5 rounded-full text-[10px] font-black">اذهب للعرض 🚀</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Orders Content */}
                {activeTab === 'orders' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
                        {mockUserOrders.map((order) => (
                            <div key={order.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                        <span className="text-xs font-black text-gray-500">#{order.id}</span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">{order.date}</span>
                                </div>

                                {/* Order Progress Tracker */}
                                <StatusTracker status={order.status} />

                                <div className="mt-4 pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex -space-x-2 rtl:space-x-reverse">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                                                    <PackageCheck className="w-3.5 h-3.5 text-gray-400" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500">+{order.itemsCount - 3} أصناف أخرى</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-bold text-gray-400 block">الإجمالي</span>
                                        <span className="text-lg font-black text-primary">{order.total.toFixed(2)} ج.م</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="w-full mt-5 py-3 rounded-xl border-2 border-primary/10 text-primary font-black text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>تفاصيل الطلب الكاملة</span>
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Promo Card at bottom of notifications */}
                {activeTab === 'notifications' && (
                    <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl shadow-primary/20 group">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-2">انضم لبرنامج الولاء! ⭐</h3>
                            <p className="text-white/80 text-xs font-medium leading-relaxed mb-4">اجمع النقاط مع كل عملية شراء واستبدلها بخصومات حقيقية.</p>
                            <button
                                onClick={() => setShowLoyaltyModal(true)}
                                className="bg-white text-primary px-5 py-2.5 rounded-xl font-black text-xs hover:scale-105 transition-transform"
                            >
                                اكتشف المزيد
                            </button>
                        </div>
                        <CheckCircle2 className="absolute -bottom-4 -left-4 w-32 h-32 text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                )}
            </main>

            <BottomNav />

            {/* Loyalty Modal */}
            <Dialog open={showLoyaltyModal} onOpenChange={setShowLoyaltyModal}>
                <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
                    <div className="bg-gradient-to-br from-primary to-primary-dark p-8 text-white relative">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-right mb-2">برنامج ولاء تفانين ✨</DialogTitle>
                            <p className="text-white/80 text-right text-sm leading-relaxed">كل جنيه بتصرفه في تفانين بيرجع لك في شكل نقاط تقدر تشتري بيها اللي تحبه!</p>
                        </DialogHeader>
                        <Trophy className="absolute -bottom-6 -left-6 w-32 h-32 text-white/10 -rotate-12" />
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="space-y-4">
                            {[
                                { title: 'اجمع النقاط', desc: 'بتاخد نقطة واحدة قصاد كل 10 جنيه بتصرفها.', icon: <Coins className="w-5 h-5 text-yellow-500" /> },
                                { title: 'ارتقِ بمستواك', desc: 'كل ما تشتري أكتر، مستواك بيزيد وهداياك بتضاعف.', icon: <Star className="w-5 h-5 text-blue-500" /> },
                                { title: 'استبدل واستمتع', desc: 'استمتع بخصومات فورية ومنتجات مجانية.', icon: <Gift className="w-5 h-5 text-orange-500" /> },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start text-right">
                                    <div className="flex-1">
                                        <h4 className="font-black text-gray-900 text-sm">{item.title}</h4>
                                        <p className="text-gray-500 text-[10px] mt-0.5">{item.desc}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                                        {item.icon}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={() => setShowLoyaltyModal(false)}
                            className="w-full bg-primary py-6 rounded-2xl font-black text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            فهمت، ابدأ الرحلة! 🚀
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Order Details Modal */}
            <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
                    <div className="bg-gray-50 p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="text-right">
                            <h3 className="font-black text-gray-900 text-lg">تفاصيل الطلب #{selectedOrder?.id}</h3>
                            <p className="text-[10px] text-gray-400 font-bold">{selectedOrder?.date}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black ${selectedOrder?.status === 'ready' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                            }`}>
                            {selectedOrder?.status === 'ready' ? 'جاهز للاستلام' : 'قيد التجهيز'}
                        </div>
                    </div>

                    <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                        {/* Summary Items Table */}
                        <div className="space-y-3">
                            {mockProducts.slice(0, 4).map((p, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 group">
                                    <div className="text-left">
                                        <p className="font-black text-primary text-sm">{(p.price || 0).toFixed(2)} ج.م</p>
                                        <p className="text-[10px] text-gray-400">الكمية: 1</p>
                                    </div>
                                    <div className="flex-1 text-right">
                                        <p className="font-bold text-gray-800 text-xs truncate">{p.name}</p>
                                        <p className="text-[8px] text-gray-400">ID: {p.id}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="bg-gray-50 p-5 rounded-[1.5rem] border border-gray-100 space-y-2">
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                                <span>{(selectedOrder?.total || 0).toFixed(2)} ج.م</span>
                                <span>المجموع الفرعي</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                                <span className="text-green-600">مجاني</span>
                                <span>مصاريف التجهيز</span>
                            </div>
                            <div className="pt-2 mt-2 border-t border-dashed border-gray-200 flex justify-between items-center">
                                <span className="text-xl font-black text-primary">{(selectedOrder?.total || 0).toFixed(2)} ج.م</span>
                                <span className="font-black text-gray-900">الإجمالي الكلي</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <Button
                            onClick={() => setSelectedOrder(null)}
                            className="w-full bg-gray-900 py-6 rounded-2xl font-black text-white hover:bg-gray-800 transition-all shadow-lg"
                        >
                            إغلاق التفاصيل
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserNotificationsPage;
