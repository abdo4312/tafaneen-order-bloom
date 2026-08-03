import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MegaOfferBanner = () => {
    return (
        <div className="px-3 h-full">
            <Link
                to="/offers"
                className="block relative w-full h-full rounded-[3rem] overflow-hidden group shadow-2xl transition-all duration-500 hover:scale-[1.005]"
            >
                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Mega Offer"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute top-12 right-12 flex flex-col items-end gap-3 text-right z-20">
                    <div className="bg-yellow-400 text-black px-7 py-2.5 rounded-2xl font-black text-sm md:text-lg shadow-xl -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                        عرض محدود جداً ⏳
                    </div>
                    <div className="bg-white/15 backdrop-blur-xl border border-white/20 text-white px-5 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg">
                        موسم العودة للمدارس ٢٠٢٤
                    </div>
                </div>

                {/* Main Content */}
                <div className="absolute inset-0 flex items-center justify-end px-8 md:px-24 text-right z-10">
                    <div className="max-w-xl space-y-8 flex flex-col items-end">
                        <div className="flex items-center justify-end gap-3 text-primary mb-4">
                            <Sparkles className="w-8 h-8 animate-pulse text-yellow-400" />
                            <span className="font-black text-xl md:text-2xl tracking-[0.2em] leading-none drop-shadow-lg">تخفيضات الكبرى</span>
                        </div>

                        <h2 className="text-3xl md:text-6xl font-black text-white leading-[2] drop-shadow-2xl">
                            اشتري <span className="text-primary">قطعة</span> واحصل على <span className="text-yellow-400">واحدة مجاناً</span>
                        </h2>

                        <p className="text-white/90 text-sm md:text-xl font-bold leading-relaxed max-w-sm md:max-w-lg drop-shadow-md mt-6">
                            أقوى العروض بانتظارك.. جودة استثنائية وأسعار لا تُقاوم لجميع الأدوات الفنية والمكتبية.
                        </p>

                        <div className="flex items-center justify-end gap-6 pt-8">
                            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-2xl rounded-[1.5rem] p-5 border border-white/10 min-w-[110px] shadow-2xl">
                                <span className="text-yellow-400 font-black text-4xl">50%</span>
                                <span className="text-white text-xs font-bold uppercase tracking-tighter">خصم فوري</span>
                            </div>

                            <button className="flex items-center gap-3 bg-primary hover:bg-yellow-400 hover:text-black text-white px-14 py-6 rounded-[2.5rem] font-black text-xl transition-all duration-500 transform group-hover:scale-105 shadow-[0_15px_40px_rgba(206,32,40,0.4)]">
                                <span>اقتنيها الآن</span>
                                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
