import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],

	setProducts: (products) => set({ products }),
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
	}
}));
