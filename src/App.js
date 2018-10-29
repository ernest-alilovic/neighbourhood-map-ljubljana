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
      activeMarker: null
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
        const popup = new mapboxgl.Popup({
          offset: 40, className: `${[myVenue.venue.location.lng, myVenue.venue.location.lat]}`
        })
          .setLngLat([myVenue.venue.location.lng, myVenue.venue.location.lat])
          .setHTML(
            `<h1>${myVenue.venue.name}</h1>
            <p>${myVenue.venue.location.formattedAddress}</p>`
          )
        //console.log(myVenue.venue.id)
        //console.log(this.state.markers.length)
        //console.log(this.state.id)
        let marker = new mapboxgl.Marker({
          color: this.state.markerProps.color,
          className: myVenue.venue.id
        })
        .setLngLat([myVenue.venue.location.lng, myVenue.venue.location.lat])
        .setPopup(popup)
        .addTo(this.map);
        return this.state.markers.push(marker)
    }, console.log(this.state.markers));
  }

  activateMarker = () => {
      this.setState({
          isActiveMarker: true,
          markerProperties: {color: "crimson"}
      })
      console.log(this.state.activeMarker)
      console.log(this.state.markerProps)
  }

  handleClick(e) {
      e.preventDefault();
      console.log(e.target.className)
      console.log(e.target)
      let markersArray = this.props.markers
        for (let i = 0; i < markersArray.length; i++) {
          if (this.props.markers[i].getPopup().options.className === e.target.className) {
              console.log("You did it! You are a genius!");
              const activeMarker = this.props.markers[i]
              activeMarker.togglePopup()
                  /*if (this.props.markers[i] === activeMarker) {
                      activeMarker.togglePopup()
                      console.log(`Active Marker: ${this.props.isActiveMarker}`)
                      this.props.activateMarker
                  }*/
              this.props.activateMarker()
          } else {
            markersArray[i].getPopup()._onClickClose();
          }
      }
  }

  componentDidMount() {
        this.getVenues()
  }

  render() {
    return (
      <div className="App">
        <main className="container">
          <aside id="sidebar">
            <Sidebar
              venues={this.state.venues}
              handleClick={this.handleClick}
              markers={this.state.markers}
            />
          </aside>
          <section>
            <MapPage
              color={this.state.color}
              venues={this.state.venues}
              initMap={this.initMap}
              createMarkers={this.createMarkers}
              activateMarker={this.activateMarker}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
