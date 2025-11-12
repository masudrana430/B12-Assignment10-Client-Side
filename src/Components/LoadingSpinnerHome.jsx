// LoadingSpinner.jsx
import React, { useMemo } from "react";

const AYAT = [
  {
    ar: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    tr: "Yā ayyuhā alladhīna āmanū istaʿīnū biṣ-ṣabri waṣ-ṣalāh; inna llāha maʿa aṣ-ṣābirīn.",
    en: "Seek help through patience and prayer; indeed Allah is with the patient. (2:153)",
  },
  {
    ar: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ",
    tr: "Innamā yuwaffā aṣ-ṣābirūna ajrahum bighayri ḥisāb.",
    en: "The patient will be given their reward without measure. (39:10)",
  },
  {
    ar: "فَاصْبِرْ صَبْرًا جَمِيلًا",
    tr: "Fa-ṣbir ṣabran jamīlā.",
    en: "So be patient with beautiful patience. (70:5)",
  },
  {
    ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا • إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    tr: "Fa-inna maʿa l-ʿusri yusrā. Inna maʿa l-ʿusri yusrā.",
    en: "With hardship comes ease — indeed, with hardship comes ease. (94:5–6)",
  },
  {
    ar: "وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ",
    tr: "Wa-ṣbir wa mā ṣabruka illā bi-llāh.",
    en: "Be patient; your patience is only through Allah. (16:127)",
  },
  {
    ar: "وَاصْبِرُوا ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    tr: "Wa-ṣbirū; inna llāha maʿa aṣ-ṣābirīn.",
    en: "Be patient; indeed Allah is with the patient. (8:46)",
  },
];


const LoadingSpinnerHome = () => {
  const verse = useMemo(
    () => AYAT[Math.floor(Math.random() * AYAT.length)],
    []
  );

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/60 dark:bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <svg
          viewBox="0 0 48 48"
          className="h-32 w-32"
          role="status"
          aria-label="Loading"
        >
          <defs>
            <linearGradient
              id="brandGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#632EE3" />
              <stop offset="100%" stopColor="#9F62F2" />
            </linearGradient>
          </defs>

          



          <path
            d="M16,24
       C16,16 8,16 8,24
       C8,32 16,32 24,24
       C32,16 40,16 40,24
       C40,32 32,32 24,24"
            fill="none"
            stroke="url(#brandGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="60 40"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-200"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        <div className="text-center">
          <span
            className="mt-2 inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl"
            aria-hidden="true"
          >
            🕌
          </span>
          

          <p
            lang="ar"
            dir="rtl"
            className="mt-2 text-[30px] md:text-[30px] font-bold bg-gradient-to-r from-[#A7F3D0] to-[#34D399]  bg-clip-text text-transparent"
          >
            السَّلامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكاتُهُ
          </p>
          <p className="text-[20px] md:text-[20px] font-semibold text-white">
            Peace and mercy and blessings of Allah be upon you
          </p>

          
          <p
            lang="ar"
            dir="rtl"
            className="mt-4   text-[30px] md:text-[30px] font-bold bg-gradient-to-r from-[#632EE3] to-[#9F62F2]  bg-clip-text text-transparent"
          >
            {verse.ar}
          </p>
          
          
          <p className="mt-1 text-[20px] md:text-[20px] font-semibold text-white/100">
            {verse.tr}
          </p>
          {/* Translation */}
          <p className="mt-2 text-[20px] md:text-[20px] font-semibold text-white">
            {verse.en}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinnerHome;
