import React, { Component } from 'react';
import './App.css';
import MapPage from './MapPage.js';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import axios from 'axios'

class App extends Component {
  state = {
      venues: [],
      color: "blue",
      markerProps: {
        color: "blue",
        className: "my-markers"
      }
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "LBUCBJIQ2WGFMXELGJSAGKFN5ULLVMOSW2YNYAJIERFYBUVL",
      client_secret: "TVQ20TZSFGB03F3VFH20BBJJEP2KRNCZCLP0CNREHXONIQOH",
      query: "sights",
      near: "Ljubljana",
      v: 20182507
  }

  axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      })
    })
    .catch(error => {
      console.log(`An error occurred: ${error}`)
    })
  }

  initMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWVybmVzdCIsImEiOiJjamtjbGR0MHIybGRrM3dwMmdnNWk1cnNsIn0.d7eL4cynPRQ2t7TETKh3yw';
    this.map = new mapboxgl.Map({
     container: 'map',
     style: 'mapbox://styles/mapbox/streets-v10',
     center: [14.5061463, 46.0513639],
     zoom: 13
   });
   window.map = this.map;

   this.map.on('load', () => {
     this.createMarkers();
   })
  }

  createMarkers = () => {
    this.state.venues
      .map(myVenue => {
        return this.marker = new mapboxgl.Marker(this.state.markerProperties)
        .setLngLat([myVenue.venue.location.lng, myVenue.venue.location.lat])
        .addTo(this.map);
    })
  }

  componentDidMount() {
        this.getVenues()
        this.initMap()
        this.createMarkers()
  }

  render() {
    return (
      <div className="App">
        <main>
          <MapPage
            color={this.state.color}
            venues={this.state.venues}
            initMap={this.initMap}
            createMarkers={this.createMarkers}
          />
        </main>
      </div>
    );
  }
}

export default App;
