import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div id="map-sidebar">
        <ul className="location-list">
          {
            this.props.venues
              .map((myVenue) =>(
                <li key={myVenue.venue.id}>
                  {myVenue.venue.name + ` `}
                  <button
                    type="button"
                    key={myVenue.venue.id}
                    data-index={myVenue.venue.id}
                    className={`button ${myVenue.venue.name}`}
                  >
                    &#128270;
                  </button>
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}

export default Sidebar;
