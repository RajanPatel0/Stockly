import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { name, price, quantity, image, vendor } = product;

  const storeName = vendor?.name || "Unknown Vendor";
  const address = vendor?.storeAddress || "Not Provided";
  const coordinates = vendor?.storeLocation?.coordinates || [];

  const mapLink =
    coordinates.length === 2
      ? `https://www.google.com/maps?q=${coordinates[1]},${coordinates[0]}`
      : "#";

  return (
    <div className="bg-[#1f1f3b] text-white p-4 rounded-2xl shadow-lg shadow-indigo-700/30 w-full md:w-[47%] lg:w-[100%]">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-xl font-bold mb-2 text-cyan-300">{name}</h3>
      <p className="text-sm mb-1">💵 Price: ₹{price}</p>
      <p className="text-sm mb-1">📦 In Stock: {quantity}</p>
      {vendor && (
        <>
          <p className="text-sm mb-1">🏪 Store: {storeName}</p>
          <p className="text-sm mb-1">📍 Address: {address}</p>
          <Link
  to={`/map/${vendor._id}`}
  className="text-blue-400 hover:underline mt-2 inline-block"
>
  🗺️ View Store on Map
</Link>
        </>
      )}
    </div>
  );
}
