
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ChevronLeft, User, MapPin, Bell, Globe, Moon, HelpCircle, Phone, LogOut } from "lucide-react";

const SettingsPage = () => {
    const sections = [
        {
            title: "الحساب",
            items: [
                { icon: User, label: "تعديل الملف الشخصي", color: "text-blue-500" },
                { icon: MapPin, label: "عناوين الشحن", color: "text-red-500" },
            ]
        },
        {
            title: "التفضيلات",
            items: [
                { icon: Bell, label: "الاشعارات", color: "text-yellow-500" },
                { icon: Globe, label: "اللغة", value: "العربية", color: "text-green-500" },
                { icon: Moon, label: "الوضع الليلي", isToggle: true, color: "text-purple-500" },
            ]
        },
        {
            title: "الدعم",
            items: [
                { icon: HelpCircle, label: "الأسئلة الشائعة", color: "text-cyan-500" },
                { icon: Phone, label: "اتصل بنا", color: "text-indigo-500" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
            <Header title="الاعدادات" showBack={true} />

            <main className="flex-1 p-4 space-y-6">
                {sections.map((section) => (
                    <div key={section.title} className="space-y-2">
                        <h3 className="text-sm font-bold text-gray-400 px-2">{section.title}</h3>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            {section.items.map((item, idx) => (
                                <button
                                    key={item.label}
                                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${idx !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-300" />
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <span className="text-sm font-bold text-gray-800 block">{item.label}</span>
                                            {item.value && <span className="text-[10px] text-primary font-bold">{item.value}</span>}
                                        </div>
                                        <div className={`p-2 rounded-xl bg-gray-50 ${item.color}`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <button className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-500 rounded-2xl font-black border border-red-100 mt-4 active:scale-[0.98] transition-all">
                    <LogOut className="w-5 h-5" />
                    <span>تسجيل الخروج</span>
                </button>
            </main>

            <BottomNav />
        </div>
    );
};

export default SettingsPage;
