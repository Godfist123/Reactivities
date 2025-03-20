import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  position: [number, number];
  venue: string;
}

const MapComponent: React.FC<MapComponentProps> = (props) => {
  const { position, venue } = props;

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>{venue} </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
