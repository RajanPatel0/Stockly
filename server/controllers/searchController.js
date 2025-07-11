import Product from "../models/Product.js";
import User from "../models/User.js";

// GET /api/products/search?name=iphone
export const searchProducts = async (req, res) => {
  const query = req.query.name;

  if (!query) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    // Find matching products with quantity > 0
    const products = await Product.find({
      name: { $regex: query, $options: "i" },  // case-insensitive
      quantity: { $gt: 0 }
    }).populate("vendor", "storeName location address"); // get vendor info

    res.status(200).json({ products });
  } catch (err) {
    console.error("Search Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
