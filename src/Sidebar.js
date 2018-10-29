import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'

class Sidebar extends Component {

  state = {
      searchedLocations: []
  }

  render() {
    let displayedLocations;
    if (this.props.query) {
        const match = new RegExp(escapeRegExp(this.props.query, 'i'))
        displayedLocations = this.props.venues.filter((myVenue) => match.test(myVenue.venue.name.toLowerCase()))
    } else {
        displayedLocations = this.props.venues
    }

    displayedLocations.sort(sortBy('venue.name'))

    return (
      <div id="map-sidebar">
      <div id="search-field">
          <input
              className='search-bar'
              type='text'
              placeholder='Search locations'
              value={this.state.query}
              onChange={(event) => this.props.updateQuery(event.target.value)}
          />
        </div>
        <ul className="locations-list">
          {
            displayedLocations
              .map((myVenue) => (
                <li 
                  key={myVenue.venue.id}
                  className="location-list-item"
                >
                  {myVenue.venue.name + ` `}
                  <button
                    type="button"
                    key={myVenue.venue.id}
                    data-buttoncoord={`${[myVenue.venue.location.lng, myVenue.venue.location.lat]}`}
                    className="sidebar-button"
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
