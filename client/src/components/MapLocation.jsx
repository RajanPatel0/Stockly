import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// fix for missing marker icons (required for correct display)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url),
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url),
});

function Routing({ userLocation, vendorLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !vendorLocation) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(vendorLocation.lat, vendorLocation.lng),
      ],
      lineOptions: { styles: [{ color: "red", weight: 5 }] },
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      routeWhileDragging: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [userLocation, vendorLocation, map]);

  return null;
}

const MapLocation = ({ vendors, selectedVendor, userLocation }) => {
  const validSelectedVendor = selectedVendor && selectedVendor.lat && selectedVendor.lng;
  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : validSelectedVendor
      ? [selectedVendor.lat, selectedVendor.lng]
      : [0, 0]; // fallback to [0,0] if no valid location

  return (
    <MapContainer center={center} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='© OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>You are here</Popup>
          <Tooltip direction="top" offset={[0, -20]} permanent>
            <span style={{ color: "blue", fontWeight: "bold" }}>You</span>
          </Tooltip>
        </Marker>
      )}
      {vendors.map((v, idx) => (
        <Marker key={idx} position={[v.lat, v.lng]}>
          <Popup>
            <strong>{v.name}</strong><br />
            {v.address}
          </Popup>
          <Tooltip direction="top" offset={[0, -20]} permanent>
            <span style={{ color: "purple", fontWeight: "bold" }}>{v.name}</span>
          </Tooltip>
        </Marker>
      ))}
      {userLocation && validSelectedVendor && (
        <Routing userLocation={userLocation} vendorLocation={selectedVendor} />
      )}
    </MapContainer>
  );
};

export default MapLocation;
