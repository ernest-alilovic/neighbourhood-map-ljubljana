import React, { Component } from 'react';

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
