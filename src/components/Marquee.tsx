"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Marquee() {
  const items = [
    "New Arrivals: Ceramic Blue Tile",
    "Weekly Feature: Modern Geometric Patterns",
    "Join the Community",
    "Free Shipping on Orders Over $500",
    "Discover Hand-crafted Terracotta",
  ];

  return (
    <div className="bg-primary text-primary-content py-3 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView="auto"
        loop={true}
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        className="continuous-slider"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="!w-auto px-8 font-medium tracking-wider flex items-center">
            <span className="inline-block mx-4 opacity-50">•</span>
            {item}
          </SwiperSlide>
        ))}
        {items.map((item, index) => (
          <SwiperSlide key={`dup-${index}`} className="!w-auto px-8 font-medium tracking-wider flex items-center">
            <span className="inline-block mx-4 opacity-50">•</span>
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
