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
                    className={`button ${myVenue.venue.name} ${myVenue.venue.id}`}
                    onClick={this.props.handleClick.bind(this)}
                  >
                    <span role="img" aria-label="search-button">&#128270;</span>
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
