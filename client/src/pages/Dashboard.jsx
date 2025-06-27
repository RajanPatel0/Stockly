import React, { useState } from "react";
import AddProduct from "../components/AddProduct";
import ProductTable from "../components/productTable";
import UpdateProduct from "../components/UpdateProduct";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ for edit modal

  const handleSaveUpdatedProduct = (updatedData) => {
    console.log("Send updated data to backend here", updatedData);
    setSelectedProduct(null); // close modal
  };

  const renderSection = () => {
    switch (activeSection) {
      case "products":
        return <ProductTable onEdit={(product) => setSelectedProduct(product)} />;
      case "add":
        return <AddProduct />;
      case "analytics":
        return (
          <div className="text-white text-xl">
            Analytics Section (Component will render here)
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#0f0f3d] to-[#141457] p-4 md:p-10 text-white">
      <h1 className="text-center text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
        Vendor Dashboard
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => setActiveSection("products")}
          className={`px-6 py-3 rounded-xl ${
            activeSection === "products"
              ? "bg-cyan-500"
              : "bg-[#2b2b4a] hover:bg-cyan-700"
          } transition-all duration-300 shadow-md shadow-cyan-800/40 font-medium`}
        >
          🛒 All Products
        </button>

        <button
          onClick={() => setActiveSection("add")}
          className={`px-6 py-3 rounded-xl ${
            activeSection === "add"
              ? "bg-purple-500"
              : "bg-[#2b2b4a] hover:bg-purple-700"
          } transition-all duration-300 shadow-md shadow-purple-800/40 font-medium`}
        >
          ➕ Add Product
        </button>

        <button
          onClick={() => setActiveSection("analytics")}
          className={`px-6 py-3 rounded-xl ${
            activeSection === "analytics"
              ? "bg-green-500"
              : "bg-[#2b2b4a] hover:bg-green-700"
          } transition-all duration-300 shadow-md shadow-green-800/40 font-medium`}
        >
          📊 Analytics
        </button>
      </div>

      <div>{renderSection()}</div>

      {/* ✅ Modal for editing product */}
      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleSaveUpdatedProduct}
        />
      )}
    </div>
  );
}
