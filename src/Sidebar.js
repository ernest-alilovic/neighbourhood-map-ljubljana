import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div id="map-sidebar">
      <div id="search-field">
          <input
              className='search-bar'
              type='text'
              placeholder='Search locations'
          />
        </div>
        <ul className="locations-list">
          {
            this.props.venues
              .map((myVenue) =>(
                <li key={myVenue.venue.id}>
                  {myVenue.venue.name + ` `}
                  <button
                    type="button"
                    key={myVenue.venue.id}
                    data-index={this.props.markers}
                    className={`${[myVenue.venue.location.lng, myVenue.venue.location.lat]}`}
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
