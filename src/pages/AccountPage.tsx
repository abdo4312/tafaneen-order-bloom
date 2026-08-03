
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, ShieldCheck, Heart, Package, Star } from "lucide-react";

const AccountPage = () => {
    const { user } = useAuth();

    const stats = [
        { label: "طلباتي", count: 1, icon: Package, color: "bg-blue-50 text-blue-500" },
        { label: "المفضلة", count: 0, icon: Heart, color: "bg-red-50 text-red-500" },
        { label: "النقاط", count: 150, icon: Star, color: "bg-yellow-50 text-yellow-500" },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col pb-24">
            <Header title="حسابي" showBack={true} />

            <main className="flex-1 p-4">
                {/* Profile Card */}
                <div className="bg-primary rounded-3xl p-6 text-white shadow-lg relative overflow-hidden mb-6">
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center mb-4 overflow-hidden">
                            {user?.avatar_url ? (
                                <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 opacity-50" />
                            )}
                        </div>
                        <h2 className="text-xl font-black">{user?.name || "زائر"}</h2>
                        <div className="flex items-center gap-1 opacity-80 mt-1">
                            <Mail className="w-3 h-3" />
                            <span className="text-xs font-medium">{user?.email || "guest@tafaneen.com"}</span>
                        </div>
                    </div>
                    {/* Background elements */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-5 top-5 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center gap-2">
                            <div className={`p-2 rounded-xl ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-black text-gray-800 leading-none">{stat.count}</span>
                            <span className="text-[10px] font-bold text-gray-400">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Account Security / Tier */}
                <div className="bg-green-50 rounded-2xl p-4 flex items-center justify-between border border-green-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 text-green-600 rounded-xl">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="text-right">
                            <h4 className="text-sm font-black text-green-800">حساب موثق</h4>
                            <p className="text-[10px] text-green-600 font-bold">تم تأكيد رقم الهاتف والبريد</p>
                        </div>
                    </div>
                    <span className="bg-green-600 text-white text-[10px] px-3 py-1 rounded-full font-black">نشط</span>
                </div>

                {/* Verification Status Banner if needed */}
            </main>

            <BottomNav />
        </div>
    );
};

export default AccountPage;
