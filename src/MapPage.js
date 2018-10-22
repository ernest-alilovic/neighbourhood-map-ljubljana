import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiYWVybmVzdCIsImEiOiJjamtjbGR0MHIybGRrM3dwMmdnNWk1cnNsIn0.d7eL4cynPRQ2t7TETKh3yw'
});

class MapPage extends Component {
  render() {
    return (
      <Map
        style="mapbox://styles/aernest/cjnkjw5d23sjz2sk0mvhme8t4"
        containerStyle={{ width: '100vw', height: '100vh'}}
        center={[14.5061463, 46.0513639]}
        zoom={[12]}
      />
    );
  }
}

export default MapPage;
