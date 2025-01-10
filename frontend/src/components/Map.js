import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import "../css/Map.css";

// Associer L à l'objet global
const L = window.L;

const Map = () => {
    useEffect(() => {
        // Initialiser la carte après que le composant soit monté
        const map = L.map("map").setView([51.505, -0.09], 13);

        // Ajouter une couche de tuiles OpenStreetMap
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
    }, []); // Le tableau vide [] assure que l'effet ne s'exécute qu'une fois au montage

    return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default Map;
