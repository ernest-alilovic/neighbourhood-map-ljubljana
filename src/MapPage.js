import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

class MapPage extends Component {

  initMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWVybmVzdCIsImEiOiJjamtjbGR0MHIybGRrM3dwMmdnNWk1cnNsIn0.d7eL4cynPRQ2t7TETKh3yw';
    this.map = new mapboxgl.Map({
     container: 'map',
     style: 'mapbox://styles/mapbox/streets-v10',
     center: [14.5061463, 46.0513639],
     zoom: 13
   });
  }

  createMarkers = () => {
        this.marker = new mapboxgl.Marker({color: "red", className: 'my-marker'})
        .setLngLat([14.5061463, 46.0513639])
        .addTo(this.map)
    }

  componentDidMount() {
    this.initMap()
    this.createMarkers()
  }

  render() {
    return (
      <div id="map" className="map-container">
          {/* Initialize map here*/}
      </div>
    );
  }
}

export default MapPage;
