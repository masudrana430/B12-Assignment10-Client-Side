import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  A11y,
  EffectFade,
} from "swiper/modules";
import { motion as Motion } from "framer-motion";

// import bow from "../assets/pozk9x87tf7z6u2pw8oxcudvlb1rtvuezhmygukm-removebg-preview.png";
// import scribble from "../assets/pngtree-medical-waste-concept-color-png-image_15643100-removebg-preview.png";
// import bone from "../assets/cdn.i.haymarketmedia-removebg-preview.png";

import Lottie from "lottie-react";
// import errorImg from '../assets/error-404.png';
import Camera from "./../animation/CCTV Camera.json";
import Earth from "./../animation/Greenify the Earth (1).json";
import Report from "./../animation/Ai Report card.json";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import SnowOverlay from "./SnowOverlay";

// Framer Motion
const textContainer = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};
const textItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const rightCard = {
  hidden: { opacity: 0, scale: 0.98, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Swiper component
const WinterHeroSwiper = ({ slides = [] }) => {
  const [active, setActive] = useState(0);

  const data = slides.length
    ? slides
    : [
        {
          title: "Snug & Stylish",
          subtitle:
            "Keep them warm with fleece coats, booties, and cozy accessories.",
          img: "",
          cta: "Shop Winter",
          to: "/apps",
          badge: "Winter Care",
        },
        {
          title: "Grooming for Cold Days",
          subtitle:
            "Hydrating treatments to prevent dry skin & static in winter.",
          img: "",
          cta: "Book Grooming",
          to: "/apps",
          badge: "Hydration",
        },
        {
          title: "Safe Winter Walks",
          subtitle: "Short routes, booties fitting, and insulated jackets.",
          img: "",
          cta: "Find Services",
          to: "/apps",
          badge: "Outdoor",
        },
      ];

  return (
    <section className="bg-slate-50 py-8 md:py-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, A11y, EffectFade]}
          slidesPerView={1}
          loop
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          onSwiper={(sw) => setActive(sw.realIndex)}
          onSlideChange={(sw) => setActive(sw.realIndex)}
          className="rounded-2xl shadow-lg overflow-hidden"
        >
          {data.map((s, i) => {
            const isActive = active === i;
            return (
              <SwiperSlide key={i}>
                <div className="relative grid grid-cols-1 md:grid-cols-2 items-center bg-white">
                  {/* LEFT: text (animated) */}
                  <Motion.div
                    className="p-8 sm:p-12"
                    variants={textContainer}
                    initial="hidden"
                    animate={isActive ? "show" : "hidden"}
                  >
                    <Motion.div
                      variants={textItem}
                      className="inline-flex items-center gap-2 rounded-full bg-yellow-100 text-yellow-900 px-3 py-1 text-xs font-semibold"
                    >
                      <span>❄️ {s.badge || "Winter Care"}</span>
                    </Motion.div>

                    <Motion.h2
                      variants={textItem}
                      className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900"
                    >
                      {s.title}
                    </Motion.h2>

                    <Motion.p
                      variants={textItem}
                      className="mt-3 text-slate-600 max-w-xl"
                    >
                      {s.subtitle}
                    </Motion.p>

                    <Motion.div
                      variants={textItem}
                      className="mt-6 inline-block"
                    >
                      <Motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to={s.to || "/"}
                          className="
    btn border-0 rounded-full
    bg-gradient-to-r from-[#36B864] to-[#1A6A3D]
    text-white font-semibold
    transition-colors duration-300
    hover:from-[#48D978] hover:to-[#2B8C4A]
  "
                        >
                          {s.cta || "Explore"}
                        </Link>
                      </Motion.div>
                    </Motion.div>
                  </Motion.div>

                  {/* RIGHT: yellow card + image + floating items */}
                  <Motion.div
                    className="relative h-[320px] md:h-[420px]"
                    variants={rightCard}
                    initial="hidden"
                    animate={isActive ? "show" : "hidden"}
                  >
                    <div
                      className="absolute inset-4 rounded-[28px]
    bg-gradient-to-r from-[#36B864] to-[#1A6A3D]
    shadow-lg overflow-hidden"
                    >
                      {s.img ? (
                        <Motion.img
                          src={s.img}
                          alt=""
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 max-h-[85%] object-contain drop-shadow-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            isActive
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 20 }
                          }
                          transition={{ duration: 0.55, ease: "easeOut" }}
                          whileHover={{ scale: 1.02 }}
                        />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center text-slate-700/70">
                          <span className="text-sm">(image URL)</span>
                        </div>
                      )}

                      {/* doodles with subtle floating keyframes*/}
                      <Lottie
                        animationData={Camera}
                        loop={true}
                        className="absolute top-0 right-1 w-20 h-20 object-contain drop-shadow pointer-events-none select-none opacity-80"
                      />

                      <Lottie
                        animationData={Earth}
                        loop={true}
                        className="absolute left-0 top-1/4 -translate-y-1/2 w-20 h-20 object-contain drop-shadow pointer-events-none select-none opacity-80"
                      />
                      <Lottie
                        animationData={Report}
                        loop={true}
                        className="absolute right-1 sm:right-0 bottom-0 w-20 h-20 object-contain drop-shadow pointer-events-none select-none opacity-80"
                      />  

                      {/* snow overlay (kept as CSS animation for perf) */}
                      <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        {[...Array(18)].map((_, k) => (
                          <span
                            key={k}
                            className="absolute bg-white/70 rounded-full animate-fall"
                            style={{
                              left: `${Math.random() * 100}%`,
                              width: `${Math.random() * 4 + 2}px`,
                              height: `${Math.random() * 4 + 2}px`,
                              animationDelay: `${Math.random() * 4}s`,
                              animationDuration: `${Math.random() * 6 + 6}s`,
                            }}
                          />
                        ))}
                      </div>

                      {/* <SnowOverlay count={28} /> */}
                    </div>
                  </Motion.div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* tiny CSS helpers (snow + swiper ui) */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10%); opacity: .95 }
          100% { transform: translateY(110%); opacity: .95 }
        }
        .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }
        .swiper-pagination-bullet { background: #C7CBD1; opacity: 1; }
        .swiper-pagination-bullet-active { background: #111827; width: 26px; border-radius: 9999px; }
        .swiper-button-next, .swiper-button-prev { color: #111827; }
      `}</style>
    </section>
  );
};

export default WinterHeroSwiper;
