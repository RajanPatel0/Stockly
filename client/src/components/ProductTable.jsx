import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Mac Book Pro",
    price: "$20.00",
    quantity: 5,
    description: "Apple Laptop",
    image: "https://via.placeholder.com/40"
  },
  {
    id: 2,
    name: "Samsung s26",
    price: "$75.57",
    quantity: 10,
    description: "Samsung Flagship",
    image: "https://via.placeholder.com/40"
  },
  {
    id: 3,
    name: "Sonata AC",
    price: "$35.35",
    quantity: 2,
    description: "Cool AC",
    image: "https://via.placeholder.com/40"
  }
];

export default function ProductTable({ onEdit }) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-center text-3xl font-bold mb-8 text-white bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
        Your Products
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-xl shadow-blue-800/40">
        <table className="min-w-full bg-[#1c1c3c] text-white rounded-xl">
          <thead className="bg-[#26264f] text-cyan-300">
            <tr>
              <th className="py-4 px-6 text-left">Product</th>
              <th className="py-4 px-6 text-left">Price</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-700 hover:bg-[#2e2e5e] transition-colors duration-300"
              >
                <td className="flex items-center gap-4 py-4 px-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-white">
                    {product.name}
                  </span>
                </td>
                <td className="py-4 px-6">{product.price}</td>
                <td className="py-4 px-6 flex gap-4">
                  <button
                    className="text-green-400 hover:text-green-500 hover:scale-110 transition-transform"
                    title="Edit"
                    onClick={() => onEdit(product)}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-500 hover:scale-110 transition-transform"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
