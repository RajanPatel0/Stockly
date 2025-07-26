import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import MapLocation from "../components/MapLocation";

export default function MapPage() {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [allVendors, setAllVendors] = useState([]); // New state to hold all vendors

  useEffect(() => {
    async function fetchVendor() {
      try {
        const res = await axios.get(`/auth/vendor/${vendorId}`);
        const v = res.data.vendor;
        // Extract lat/lng from storeLocation
        setVendor({
          ...v,
          lat: v?.storeLocation?.coordinates?.[1],
          lng: v?.storeLocation?.coordinates?.[0],
          name: v?.name,
          address: v?.storeAddress,
        });
      } catch (err) {
        console.error("Failed to fetch vendor:", err);
      }
    }

    async function fetchAllVendors() {
      try {
        const res = await axios.get(`/products/search?name=${window.sessionStorage.getItem("lastSearch") || ""}`);
        // Map vendors from products
        const vendors = res.data.products
          .map(p => p.vendor)
          .filter(v => v && v.storeLocation && v.storeLocation.coordinates)
          .map(v => ({
            lat: v.storeLocation.coordinates[1],
            lng: v.storeLocation.coordinates[0],
            name: v.name,
            address: v.storeAddress,
          }));
        console.log("Vendors for map:", vendors); // <-- Add this line
        setAllVendors(vendors);
      } catch (err) {
        console.error("Failed to fetch vendors:", err);
      }
    }

    fetchVendor();
    fetchAllVendors();
  }, [vendorId]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error("Geolocation error:", err)
    );
  }, []);

  if (!vendor) {
    return <p className="text-white text-center mt-10">Loading map...</p>;
  }

  return (
    <div className="min-h-screen bg-[#0f0f3d] text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">{vendor?.name}'s Store Location</h2>
      <MapLocation
        vendors={allVendors}
        selectedVendor={vendor}
        userLocation={userLocation}
      />
    </div>
  );
}
