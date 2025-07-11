import React from "react";

export default function ProductCard({ product }) {
  const { name, price, quantity, image, vendor } = product;
  const { storeName, address, location } = vendor || {};

  const mapLink = location
    ? `https://www.google.com/maps?q=${location.lat},${location.lng}`
    : "#";

  return (
    <div className="bg-[#1f1f3b] text-white p-4 rounded-2xl shadow-lg shadow-indigo-700/30 w-full md:w-[47%] lg:w-[30%]">
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
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline mt-2 inline-block"
          >
            Open in Google Maps
          </a>
        </>
      )}
    </div>
  );
}