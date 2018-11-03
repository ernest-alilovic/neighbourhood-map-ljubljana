import React, { Component } from 'react';
import './App.css';
import MapPage from './MapPage.js';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import Sidebar from './Sidebar';
import axios from 'axios';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {
  state = {
      venues: [],
      markerProps: {
        color: "crimson"
      },
      markers: [],
      activeMarker: null,
      query: '',
      displayedMarkers: []
  }

  componentDidMount() {
    this.fetchVenues()
  }

/* fetches venues from Foursquare using Axios
I followed a YouTube tutorial mentioned in my ReadMe to achieve this */
  fetchVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "LBUCBJIQ2WGFMXELGJSAGKFN5ULLVMOSW2YNYAJIERFYBUVL",
      client_secret: "TVQ20TZSFGB03F3VFH20BBJJEP2KRNCZCLP0CNREHXONIQOH",
      query: "top",
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

/* initialises map */
  initMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWVybmVzdCIsImEiOiJjamtjbGR0MHIybGRrM3dwMmdnNWk1cnNsIn0.d7eL4cynPRQ2t7TETKh3yw';
    this.map = new mapboxgl.Map({
     container: 'map',
     style: 'mapbox://styles/mapbox/streets-v10',
     center: [14.5061463, 46.0513639],
     zoom: 13
   });
   window.map = this.map;
/* creates markers upon map initialisation */
   this.map.on('load', () => {
     this.createMarkers();
   })
  }

/* creates markers */
  createMarkers = () => {
    const allMarkers = this.state.venues
      .map(myVenue => {
/* creates popups and sets their content*/
        const infoWindow = new mapboxgl.Popup({
          offset: 25,
          className: `${[myVenue.venue.location.lng, myVenue.venue.location.lat]}`
        })
          .setLngLat([myVenue.venue.location.lng, myVenue.venue.location.lat])
          .setHTML(
            `<h3>${myVenue.venue.name}</h3>
            <p>${myVenue.venue.categories[0].name}</p>
            <p>${myVenue.venue.location.formattedAddress[0]}</p>`
          )
        let marker = new mapboxgl.Marker({
          color: this.state.markerProps.color,
          className: myVenue.venue.name
        })
        .setLngLat([myVenue.venue.location.lng, myVenue.venue.location.lat])
        .setPopup(infoWindow)
        .addTo(this.map)
        marker.getElement().data = myVenue.venue.name;
        marker.getElement().classList.add("animated")
        marker.getElement().addEventListener('click', this.activateMarker)
        return marker;
    })
   this.setState({ markers: allMarkers, displayedMarkers: allMarkers });
  }

  activateMarker = (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle("flash")
  }

/* ensures click on button/marker toggles the popup of location linked
to button/marker */

  handleClick = (e, currentCoord) => {
    e.preventDefault();
      const markersArray = this.state.displayedMarkers;
      const currentCoordStr = currentCoord.join(",");
      let markerPopup;
        for (let i = 0; i < markersArray.length; i++) {
          markerPopup = this.state.displayedMarkers[i].getPopup();
          if (markerPopup.options.className === currentCoordStr) {
            const activeMarker = this.state.displayedMarkers[i];
            activeMarker.getElement().classList.toggle("flash");
            activeMarker.togglePopup();
          } else {
            markerPopup._onClickClose();
          }
        }
      };

/* search logic */
  updateQuery = (query) => {
    this.setState({ query: query })
    this.updateMarkers(query);
  }

  updateMarkers = (query) => {
      let displayedMarkers = this.state.markers;

      if (query) {
          const match = new RegExp(escapeRegExp(query.toLowerCase(), 'i'))
          displayedMarkers = this.state.markers.filter((myMarker) => {
              return match.test(
                  myMarker.getElement().data.toLowerCase()
              )
            }
          )
          this.setState({
              displayedMarkers: displayedMarkers
          })
      } else {
          this.setState({ displayedMarkers: this.state.markers })
      }
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
              activateMarker={this.activateMarker}
              query={this.state.query}
              updateQuery={this.updateQuery}
              displayedMarkers={this.state.displayedMarkers}
            />
          </aside>
          <section>
            <MapPage
              initMap={this.initMap}
              mapElement={this.map}
              venues={this.state.venues}
              createMarkers={this.createMarkers}
              activateMarker={this.activateMarker}
              query={this.state.query}
              updateQuery={this.updateQuery}
              markers={this.state.markers}
              updateMarkers={this.updateMarkers}
              displayedMarkers={this.state.displayedMarkers}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
