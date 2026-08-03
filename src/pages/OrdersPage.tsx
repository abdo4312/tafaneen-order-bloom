
import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState("all");

    const orders = [
        {
            id: "4708dd42-ee9a",
            date: "2025-12-18",
            status: "تم الطلب",
            paymentMethod: "دفع عند الاستيلام",
            itemsCount: 2,
            total: 238.50,
            isCancelled: false
        }
    ];

    const tabs = [
        { id: "all", label: "كل طلباتي" },
        { id: "shipping", label: "قيد الشحن" },
        { id: "cancelled", label: "تم الالغاء" }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col pb-24">
            <Header title="طلبياتي" showBack={true} />

            <main className="p-4 space-y-4">
                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 ${activeTab === tab.id
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-gray-500 border-gray-100"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 shadow-sm relative">
                            {/* Cancel Icon */}
                            <button className="absolute top-4 left-4 text-red-300 hover:text-red-500">
                                <span className="text-xl">×</span>
                            </button>

                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs text-gray-400 font-medium">{order.date}</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-black text-gray-800">رقم الطلبيه</span>
                                    <span className="text-sm font-bold text-gray-600">#{order.id}</span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-700">{order.paymentMethod}</span>
                                    <span className="text-sm font-bold text-gray-400">الدفع</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-blue-600">{order.status}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-900">{order.itemsCount}</span>
                                        <span className="text-sm font-bold text-gray-400">المنتجات</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-end border-t border-dashed border-gray-200 pt-4">
                                <button className="px-6 py-1.5 border-2 border-primary text-primary rounded-full text-sm font-black hover:bg-primary/5 transition-colors">
                                    التفاصيل
                                </button>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-black text-gray-900">{order.total.toFixed(2)}</span>
                                    <span className="text-xs font-bold text-gray-500">ج.م</span>
                                    <span className="text-sm font-bold text-gray-400">المجموع الكلي</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default OrdersPage;
