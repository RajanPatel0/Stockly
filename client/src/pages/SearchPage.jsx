import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { useSearchStore } from "../stores/useSearchStore";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { searchResults, searchProducts, loading, clearResults } = useSearchStore();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.trim()) {
        searchProducts(query);
      } else {
        clearResults();
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#0f0f3d] to-[#141457] relative overflow-hidden">
      {/* Background and Search */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 opacity-10 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 pt-10">
        <SearchBar value={query} setValue={setQuery} enableVoice={true} />

        <div className="w-full flex justify-center mt-6">
          <div className="w-full max-w-7xl px-4">
            {loading ? (
              <p className="text-white text-center">🔄 Loading results...</p>
            ) : searchResults.length === 0 && query ? (
              <p className="text-gray-400 text-center">No products found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {searchResults.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
