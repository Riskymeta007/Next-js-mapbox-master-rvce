import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";

export default function Home() {
  const [map, setMap] = useState(null);
  const [pageIsMounted, setPageIsMounted] = useState(false);

  const stores = {
    'type': 'FeatureCollection',
    'features': [
      // Your store data here
    ]
  };

  useEffect(() => {
    setPageIsMounted(true);

    mapboxgl.accessToken = 'your-mapbox-access-token';

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-77.034084, 38.909671],
        zoom: 13
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-left');

      map.on('load', () => {
        setMap(map);
        map.addSource('places', {
          type: 'geojson',
          data: stores
        });
        buildLocationList(stores);
        addMarkers();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer: 'map' });

  }, [map]);

  function addMarkers() {
    stores.features.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(marker.svg)';
      el.style.width = '30px';
      el.style.height = '30px';

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);

      el.addEventListener('click', () => {
        flyToStore(marker);
        createPopUp(marker);
      });
    });
  }

  function flyToStore(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }

  function createPopUp(currentFeature) {
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>Store Name</h3><p>${currentFeature.properties.address}</p>`
      )
      .addTo(map);
  }

  function buildLocationList(data) {
    const listings = document.getElementById('listings');
    data.features.forEach((store, i) => {
      const listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = `listing-${i}`;

      const link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.innerHTML = store.properties.address;

      link.addEventListener('click', () => {
        flyToStore(store);
        createPopUp(store);
      });
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Mapbox Store Location</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
        <div className="sidebar">
          <div className="heading">
            <h1>Our locations</h1>
          </div>
          <div id="listings" className="listings"></div>
        </div>
        <div id="map" className="map"></div>
      </main>
    </div>
  );
}
