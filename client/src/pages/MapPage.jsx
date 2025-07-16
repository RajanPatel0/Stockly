import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import MapLocation from "../components/MapLocation";

export default function MapPage() {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    async function fetchVendor() {
      try {
        const res = await axios.get(`/auth/vendor/${vendorId}`);
        setVendor(res.data.vendor);
      } catch (err) {
        console.error("Failed to fetch vendor:", err);
      }
    }

    fetchVendor();
  }, [vendorId]);

  if (!vendor) {
    return <p className="text-white text-center mt-10">Loading map...</p>;
  }

  return (
    <div className="min-h-screen bg-[#0f0f3d] text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">{vendor.name}'s Store Location</h2>
      <MapLocation
        lat={vendor.storeLocation.coordinates[1]}  // lat is 2nd
  lng={vendor.storeLocation.coordinates[0]}  // lng is 1st
  storeName={vendor.name}
  address={vendor.storeAddress}
      />
    </div>
  );
}
