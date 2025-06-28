import React, { useState } from "react";
import {useProductStore} from '../stores/useProductStore';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  });

  const {createProduct}= useProductStore();


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      const reader=new FileReader();

      reader.onloadend=()=>{
        setProduct({...product, image:reader.result});
      }

      reader.readAsDataURL(file);  //it will convert it into base64 format: string representation of image
    }

   }

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Logic to send product data to backend
    console.log(product);
    try{
      await createProduct(product);
      setProduct({name: "", description:"", price:"", quantity:"", image:""})
    }catch{
      console.log("error creating a product");
    }
  };

  return (
    <div className="min-h-xlg-gradient-to-br from-[#0a0a23] via-[#0f0f3d] to-[#141457] p-6 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-[#1f1f3b] p-8 rounded-3xl shadow-2xl shadow-blue-800/40">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Add New Product
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="bg-[#2b2b4a] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="bg-[#2b2b4a] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows={4}
            required
          ></textarea>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="bg-[#2b2b4a] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
            className="bg-[#2b2b4a] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 hover:file:from-purple-600 hover:file:to-pink-600"
          />

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-700/40"
          >
            ➕ Submit Product
          </button>
        </form>

        <div className="text-center mt-6">
          <a
            href="/dashboard"
            className="text-cyan-400 hover:underline hover:text-cyan-300"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
