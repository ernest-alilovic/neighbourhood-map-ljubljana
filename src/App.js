import React, { Component } from 'react';
import './App.css';
import MapPage from './MapPage.js';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import Sidebar from './Sidebar';
import axios from 'axios'

class App extends Component {
  state = {
      venues: [],
      markerProps: {
        color: "crimson",
        className: "my-markers"
      },
      markers: [],
      id: []
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
        const popup = new mapboxgl.Popup({offset: 40, className: 'my-class'})
          .setLngLat([myVenue.venue.location.lng, myVenue.venue.location.lat])
          .setHTML(
            `<h1>${myVenue.venue.name}</h1>
            <p>${myVenue.venue.location.formattedAddress}</p>`
          )
          let index = this.state.markers.length
          this.state.id.push(index)
        let marker = new mapboxgl.Marker({
          color: this.state.markerProps.color,
          className: this.state.markerProps.className,
          index: this.state.id
        })
        .setLngLat([myVenue.venue.location.lng, myVenue.venue.location.lat])
        .addTo(this.map);
        return this.state.markers.push(marker)
    }, console.log(this.state.markers));
  }

  handleClick(e) {
      e.preventDefault();
      console.log(this.props)
      /*console.log(e.target);
      const index = e.target.dataset.index;
      console.log(e.target.dataset.index);
      this.state.locations[index-1].marker.togglePopup()
      console.log(this.state.locations[index-1].marker);*/
    }

  componentDidMount() {
        this.getVenues()
        this.initMap()
        this.createMarkers()
  }

  render() {
    return (
      <div className="App">
        <main className="container">
          <aside id="sidebar">
            <Sidebar
              venues={this.state.venues}
              hansleClick={this.handleClick}
              markers={this.state.markers}
            />
          </aside>
          <section>
            <MapPage
              color={this.state.color}
              venues={this.state.venues}
              initMap={this.initMap}
              createMarkers={this.createMarkers}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
