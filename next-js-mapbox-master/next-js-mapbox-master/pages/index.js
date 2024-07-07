import Head from 'next/head'
import styles from '../styles/Home.module.css'
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import { useState, useEffect } from 'react';

export default function Home() {
  const [Map, setMap] = useState();
  const [pageIsMounted, setPageIsMounted] = useState(false);


  const stores = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.924480, 77.499718]
        },
        'properties': {
          'phoneFormatted': '(91) 234-7336',
          'phone': '2022347336',
          'address': 'Depart of Civil Engineering',
          'city': 'Bengaluru',
          'country': 'India',
          'crossStreet': 'Mysore Road',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.924150, 77.500106]
        },
        'properties': {
          'phoneFormatted': '(91) 507-8357',
          'phone': '2025078357',
          'address': 'Depart of Electrical Engineering',
          'city': 'Bengaluru',
          'country': 'India',
          'crossStreet': 'Mysore Road',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.924578, 77.500568]
        },
        'properties': {
          'phoneFormatted': '(91) 387-9338',
          'phone': '2023879338',
          'address': 'Depart of Computer Science and Engineering',
          'city': 'Bengaluru',
          'country': 'India',
          'crossStreet': 'Mysore Road',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.923719, 77.499937]
        },
        'properties': {
          'phoneFormatted': '(91) 337-9338',
          'phone': '2023379338',
          'address': 'Depart of Electronics and Communication Engineering',
          'city': 'Bengaluru',
          'country': 'India',
          'crossStreet': 'Mysore Road',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.923862, 77.498806]
        },
        'properties': {
          'phoneFormatted': '(91) 547-9338',
          'phone': '2025479338',
          'address': 'Admin Block',
          'city': 'Bengaluru',
          'country': 'India',
          'crossStreet': 'Mysore Road',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.922958, 77.498146]
        },
        'properties': {
          'address': 'Depart of Mechanical Engineering',
          'city': 'Bengaluru',
          'country': 'India',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.922610, 77.498696]
        },
        'properties': {
          'phoneFormatted': '(91) 654-7336',
          'phone': '3016547336',
          'address': 'Biotechnology Engineering',
          'cc': 'India',
          'city': 'Bengaluru',
          'country': 'India',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.922324, 77.498459]
        },
        'properties': {
          'phoneFormatted': '(91) 203-0082',
          'phone': '5712030082',
          'address': 'Depart of AI and ML',
          'city': 'Bengaluru',
          'country': 'India',
          'crossStreet': 'Mysore Road',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.922357, 77.499660]
        },
        'properties': {
          'phoneFormatted': '(91) 522-2016',
          'phone': '7035222016',
          'address': 'Mingos Canteen',
          'city': 'Bengaluru',
          'country': 'India',
          'crossStreet': 'Mysore Road',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.923064, 77.500086]
        },
        'properties': {
          'phoneFormatted': '(91) 642-9400',
          'phone': '6106429400',
          'address': 'Depart of Physics and Chemical Engineering',
          'city': 'Bengaluru',
          'country': 'India',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.923361, 77.499727]
        },
        'properties': {
          'phoneFormatted': '(91) 386-1365',
          'phone': '2153861365',
          'address': 'RV University',
          'city': 'Bengaluru',
          'country': 'India',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [12.923013, 77.501042]
        },
        'properties': {
          'phoneFormatted': '(91) 331-3355',
          'phone': '2023313355',
          'address': 'Information Science and Aerospace Engineering',
          'city': 'Bengaluru',
          'country': 'India',
          'crossStreet': 'Mysore Road',
          'postalCode': '560059',
          'state': 'Karnataka'
        }
      }
    ]
  };

  mapboxgl.accessToken = 'pk.eyJ1Ijoid2FubmFkYyIsImEiOiJjazBja2M1ZzYwM2lnM2dvM3o1bmF1dmV6In0.50nuNnApjrJYkMfR2AUpXA';

  /**
   * Assign a unique id to each store. You'll use this `id`
   * later to associate each point on the map with a listing
   * in the sidebar.
   */
  stores.features.forEach((store, i) => {
    store.properties.id = i;
  });


  useEffect(() => {
    setPageIsMounted(true)
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [12.923208, 77.499850],
      zoom: 12.5,
      // scrollZoom: false
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setMap(map);

  }, []);

  useEffect(() => {
    if (pageIsMounted && stores) {
      Map.on('load', () => {
        Map.addSource('places', {
          'type': 'geojson',
          'data': stores
        });
        buildLocationList(stores);
        addMarkers();
      });
    }

  });


  /**
   * Add a marker to the map for every store listing.
   **/
  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    for (const marker of stores.features) {
      /* Create a div element for the marker. */
      const el = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      el.id = `marker-${marker.properties.id}`;
      /* Assign the `marker` class to each marker for styling. */
      el.className = 'marker';

      /**
       * Create a marker using the div element
       * defined above and add it to the map.
       **/
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(Map);

      /**
       * Listen to the element and when it is clicked, do three things:
       * 1. Fly to the point
       * 2. Close all other popups and display popup for clicked store
       * 3. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      el.addEventListener('click', (e) => {
        /* Fly to the point */
        flyToStore(marker);
        /* Close all other popups and display popup for clicked store */
        createPopUp(marker);
        /* Highlight listing in sidebar */
        const activeItem = document.getElementsByClassName('active');
        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        const listing = document.getElementById(
          `listing-${marker.properties.id}`
        );
        listing.classList.add('active');
      });
    }
  }

  /**
   * Add a listing for each store to the sidebar.
   **/
  function buildLocationList(stores) {
    for (const store of stores.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById('listings');
      const listing = listings.appendChild(document.createElement('div'));
      /* Assign a unique `id` to the listing. */
      listing.id = `listing-${store.properties.id}`;
      /* Assign the `item` class to each listing for styling. */
      listing.className = 'item';

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.id = `link-${store.properties.id}`;
      link.innerHTML = `${store.properties.address}`;

      /* Add details to the individual listing. */
      const details = listing.appendChild(document.createElement('div'));
      details.innerHTML = `${store.properties.city}`;
      if (store.properties.phone) {
        details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
      }

      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the `currentFeature` to the store associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked store
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      link.addEventListener('click', function () {
        for (const feature of stores.features) {
          if (this.id === `link-${feature.properties.id}`) {
            flyToStore(feature);
            createPopUp(feature);
          }
        }
        const activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        this.parentNode.classList.add('active');
      });
    }
  }

  /**
   * Use Mapbox GL JS's `flyTo` to move the camera smoothly
   * a given center point.
   **/
  function flyToStore(currentFeature) {
    Map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }

  /**
   * Create a Mapbox GL JS `Popup`.
   **/
  function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`
      )
      .addTo(Map);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Mapbox Store Location</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <main className={styles.main}>
        <div className='sidebar'>
          <div className='heading'>
            <h1>Our locations</h1>
          </div>
          <div id='listings' className='listings'></div>
        </div>
        <div id="map" className="map"></div>
      </main>
      <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js'></script>
    </div>
  )
}
