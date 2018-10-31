import React, { Component } from 'react';

class MapPage extends Component {

  componentDidMount() {
    this.props.initMap()
  }

  displayMarkers = () => {
      this.props.markers.forEach(marker => marker.remove());
      this.props.displayedMarkers.forEach(marker => {
          marker.addTo(this.props.mapElement)
      })
  }

  render() {
    this.displayMarkers();
    return (
      <div
        id="map"
        className="map-container"
        role="application"
        tabIndex="0">
      </div>
    );
  }
}

export default MapPage;
