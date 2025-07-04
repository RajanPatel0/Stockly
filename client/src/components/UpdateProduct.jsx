import React, { useState, useEffect } from "react";

export default function UpdateProduct({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    file: null, // base64 encoded image
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.quantity || "",
        image: product.image || "",
        file: null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result, // preview and send base64
          file: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData });
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1c1c3c] p-8 rounded-3xl shadow-2xl shadow-blue-800/40 w-full max-w-xl animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full px-4 py-2 bg-[#2b2b4a] rounded-md text-white"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="w-full px-4 py-2 bg-[#2b2b4a] rounded-md text-white"
          ></textarea>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full px-4 py-2 bg-[#2b2b4a] rounded-md text-white"
          />

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full px-4 py-2 bg-[#2b2b4a] rounded-md text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-white"
          />

          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
