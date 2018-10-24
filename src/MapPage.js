import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

class MapPage extends Component {

  componentDidMount() {
    this.props.initMap()
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
