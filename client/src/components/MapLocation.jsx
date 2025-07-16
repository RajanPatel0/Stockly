import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function MapLocation({ location, storeName, address }) {
  if (!location || location.length !== 2) return <p>Invalid location</p>;

  const [lng, lat] = location;

  return (
    <div className="w-full h-[80vh] rounded-xl shadow-md overflow-hidden">
      <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={false} className="w-full h-full z-10">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <strong>{storeName}</strong><br />
            📍 {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
