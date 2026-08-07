import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function NearbyMap() {
  const [farmers, setFarmers] = useState([]);
  const [userLocation, setUserLocation] =
    useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        setUserLocation([lat, lng]);

        const { data } = await api.get(
          `/products/nearby?latitude=${lat}&longitude=${lng}&distance=50`
        );

        setFarmers(data);
      }
    );
  }, []);

  if (!userLocation) {
    return <h2>Loading Map...</h2>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        Nearby Farmers Map 📍
      </h1>

      <MapContainer
        center={userLocation}
        zoom={10}
        style={{
          height: "600px",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={userLocation}>
          <Popup>
            📍 You Are Here
          </Popup>
        </Marker>

        {farmers.map((product) => {
          const farmer =
            product.farmerId;

          if (
            !farmer?.location?.latitude ||
            !farmer?.location?.longitude
          )
            return null;

          return (
            <Marker
              key={product._id}
              position={[
                farmer.location.latitude,
                farmer.location.longitude,
              ]}
            >
              <Popup>
                <strong>
                  {product.title}
                </strong>

                <br />

                Farmer:
                {" "}
                {farmer.name}

                <br />

                ₹{product.price}

                <br />

                {product.distance}
                {" "}
                km away
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default NearbyMap;