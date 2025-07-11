import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useSearchStore = create((set) => ({
  searchResults: [],
  loading: false,

  searchProducts: async (query) => {
    if (!query) return;

    set({ loading: true });
    try {
      const res = await axios.get(`/products/search?name=${query}`);
      set({ searchResults: res.data.products || [] });
    } catch (err) {
      toast.error("Search failed");
      console.error("SearchStore error:", err);
      set({ searchResults: [] });
    } finally {
      set({ loading: false });
    }
  },

  clearResults: () => set({ searchResults: [] }),
}));
