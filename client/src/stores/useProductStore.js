import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],

	setProducts: (products) => set({ products }),

	
  fetchProducts: async () => {
    try {
      const res = await axios.get("/products"); // or remove vendor id if not using
      set({ products: res.data.products });
    } catch (error) {
      toast.error("Failed to load products");
    }
  },
	createProduct: async (productData) => {
		try {
			const res = await axios.post("/products/add", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				// loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			// set({ loading: false });
		}
	},

	updateProduct: async (id, updatedData) => {
  try {
    const res = await axios.put(`/products/update/${id}`, updatedData);
    const updatedProduct = res.data;

    set((state) => ({
      products: state.products.map((p) =>
        p._id === id ? updatedProduct : p
      ),
    }));
  } catch (error) {
    toast.error(error.response?.data?.message || "Update failed");
  }
},

deleteProduct: async (id) => {
  try {
    await axios.delete(`/products/delete/${id}`);
    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    }));
    toast.success("Product deleted successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete failed");
  }
}


}));
