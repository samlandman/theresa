import React from "react";
import PropTypes from "prop-types";
require('dotenv').config();
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const { REACT_APP_GOOGLE_MAP_KEY } = process.env;

console.log('Enviroment Key');
console.log(process.env.NODE_ENV);
console.log('Google Map Key'+REACT_APP_GOOGLE_MAP_KEY)

class MapRender extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      walks: this.props.walks
    }
  }

  displayMarkers = () => {
    return this.state.walks.map((walk, index) => {
      return <Marker key={index} id={index} position={{
       lat: walk.latitude,
       lng: walk.longitude
     }}
     onClick={() => console.log("You clicked me! index: "+index)} />
    })
  }

  render () {
    return (
      <div>
        <h1>Hello {this.props.name}, </h1>
        <h3>Wow! This is a Map!</h3>
        <Map
          google={this.props.google}
          zoom={8}
          class = "mapStyles"
          initialCenter={{ lat: 51.51736, lng: -0.073328}}
          >

          {this.displayMarkers()}
          <Marker position={{ lat: this.props.latitude, lng: this.props.longitude}} />

        </Map>
      </div>
    );
  }
}

  MapRender.propTypes = {
    name: PropTypes.string,
    latitude: PropTypes.integer,
    longitude: PropTypes.integer,
    walks: PropTypes.array
  };

  export default GoogleApiWrapper ({
      apiKey: googlemapkey
  })(MapRender);