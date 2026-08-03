import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MegaOfferBanner } from "./MegaOfferBanner";
import { CreativeOffersBanner } from "./CreativeOffersBanner";
import { StationeryBanner } from "./StationeryBanner";

export const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // All banner components (excluding PromoBanner as it already uses carousel)
  const banners = [
    { id: 1, component: <MegaOfferBanner /> },
    { id: 2, component: <CreativeOffersBanner /> },
    { id: 3, component: <StationeryBanner /> }
  ];

  const totalSlides = banners.length;

  // Safeguard against out-of-range indexes
  const safeIndex = totalSlides > 0
    ? ((currentSlide % totalSlides) + totalSlides) % totalSlides
    : 0;

  // Auto-slide functionality (reset on each slide change)
  useEffect(() => {
    if (totalSlides <= 1) return;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000); // Change slide every 8 seconds

    return () => clearTimeout(timer);
  }, [currentSlide, totalSlides]);

  const nextSlide = () => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative w-full overflow-hidden h-[400px]">
      {/* Banner Display */}
      <div className="h-full w-full transition-transform duration-500 ease-in-out flex items-stretch">
        {totalSlides > 0 && banners[safeIndex].component}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg z-10 transition-all hover:scale-110"
        aria-label="Previous banner"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg z-10 transition-all hover:scale-110"
        aria-label="Next banner"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === safeIndex
                ? 'bg-primary w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
