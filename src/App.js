import React, { Component } from 'react';
import './App.css';
import MapPage from './MapPage.js';
import axios from 'axios'

class App extends Component {
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
