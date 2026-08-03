
export const Hero = () => {
  return (
    <section className="container py-2 space-y-4">
      {/* Top Banner Text */}
      <div className="text-center">
        <h3 className="text-[#DAA520] font-bold text-lg">
          خصم لحد 10.0% علي جميع الاقسام
        </h3>
      </div>

      {/* Main Banner Area */}
      <div className="flex items-stretch justify-center h-48 rounded-2xl overflow-hidden shadow-sm">

        {/* Left Side Panel */}
        <div className="w-1/4 bg-[#FFD700] flex flex-col items-center justify-between py-3 px-1 text-center border-r-2 border-white/50">
          <span className="text-sm font-bold text-gray-800">وفري حتي</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-gray-900 leading-none">10.0%</span>
            <span className="text-sm font-bold text-gray-800">خصم</span>
          </div>
          <div className="bg-primary text-white text-[10px] w-full py-1 font-bold">
            سعر رائع
          </div>
        </div>

        {/* Center Panel (Product) */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-2 text-center">
          <div className="h-24 w-full bg-gray-50 rounded-lg overflow-hidden mb-2">
            <img
              src="https://images.unsplash.com/photo-1542319630-55fb7f7c944a?q=80&w=2070&auto=format&fit=crop"
              alt="ادوات هندسيه"
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-bold text-gray-900 text-sm">ادوات هندسيه</h4>
          <p className="text-[10px] text-primary font-medium mt-1">استمتعي بطعم الطبيعة الطازجة</p>
        </div>

        {/* Right Side Panel */}
        <div className="w-1/4 bg-[#FFD700] flex flex-col items-center justify-between py-3 px-1 text-center border-l-2 border-white/50">
          <span className="text-sm font-bold text-gray-800">وفري حتي</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-gray-900 leading-none">7.0%</span>
            <span className="text-sm font-bold text-gray-800">خصم</span>
          </div>
          <div className="bg-primary text-white text-[10px] w-full py-1 font-bold">
            سعر رائع
          </div>
        </div>

      </div>
    </section>
  );
};
