"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Marquee() {
  const items = [
    "NEW ARRIVALS: CERAMIC BLUE",
    "WEEKLY FEATURE: MODERN GEOMETRICS",
    "JOIN THE EXCLUSIVE COMMUNITY",
    "COMPLIMENTARY SHIPPING OVER $500",
    "DISCOVER HAND-CRAFTED TERRACOTTA",
  ];

  return (
    <div className="bg-[#111111] text-[#ffffff] py-4 overflow-hidden border-b border-[#222]">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView="auto"
        loop={true}
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        className="continuous-slider"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="!w-auto px-8 font-light tracking-[0.2em] text-xs flex items-center text-gray-300">
            <span className="inline-block mx-8 opacity-30">/</span>
            {item}
          </SwiperSlide>
        ))}
        {items.map((item, index) => (
          <SwiperSlide key={`dup-${index}`} className="!w-auto px-8 font-light tracking-[0.2em] text-xs flex items-center text-gray-300">
            <span className="inline-block mx-8 opacity-30">/</span>
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Required for smooth continuous marquee with Swiper */}
      <style jsx global>{`
        .continuous-slider .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
}
