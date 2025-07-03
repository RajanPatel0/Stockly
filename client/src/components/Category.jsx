import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const categories = [
  { name: "Laptops", color: "from-blue-500 to-indigo-600" },
  { name: "Mobiles", color: "from-purple-500 to-pink-500" },
  { name: "Headphones", color: "from-cyan-500 to-blue-600" },
  { name: "Watches", color: "from-teal-400 to-green-500" },
  { name: "Tablets", color: "from-rose-400 to-purple-500" },
  { name: "Accessories", color: "from-yellow-400 to-orange-500" },
  { name: "Gaming", color: "from-fuchsia-500 to-purple-600" },
  { name: "Smart Home", color: "from-emerald-500 to-teal-600" },
];

export default function Category() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#0a0a23] via-[#0f0f3d] to-[#141457] py-8 px-4 relative overflow-hidden">
      <h2 className="text-white text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
        Explore Categories
      </h2>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#1f1f3d] p-2 rounded-full hover:scale-110 shadow-md shadow-blue-800/30 z-10"
      >
        <FaArrowLeft className="text-cyan-400" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-12 scrollbar-hide scroll-smooth"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`min-w-[180px] h-32 bg-gradient-to-r ${cat.color} text-white rounded-2xl flex items-center justify-center font-semibold text-xl hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-900/40 cursor-pointer`}
          >
            {cat.name}
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1f1f3d] p-2 rounded-full hover:scale-110 shadow-md shadow-blue-800/30 z-10"
      >
        <FaArrowRight className="text-cyan-400" />
      </button>
    </div>
  );
}
