import React, { Component } from 'react';
import './App.css';
import MapPage from './MapPage.js';
import axios from 'axios'

class App extends Component {

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
      console.log(response)
    })
    .catch(error => {
      console.log(`An error occurred: ${error}`)
    })
  }

  componentDidMount() {
        this.getVenues()
    }

  render() {
    return (
      <div className="App">
        <main>
          <MapPage />
        </main>
      </div>
    );
  }
}

export default App;
