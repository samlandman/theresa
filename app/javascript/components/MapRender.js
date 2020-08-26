import React from "react";
import PropTypes from "prop-types";
require('dotenv').config();
import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import { Button, ButtonGroup, Container, Row, Col} from 'reactstrap';

class MapRender extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      walks: this.props.walks,
      mapState : {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        zoom: 8,
        circle: {
          radius: 50000,
          strokeColor: "#FF0000",
          strokeOpacity: 0.6,
          strokeWeight: 1,
          fillColor: "#FF0000",
          fillOpacity: 0.05,
        }
      }
    }
  }

  incrementRadius = () => {
    let tempState = this.state;
    tempState.mapState.circle.radius += 25000;
    this.setState({tempState});
  }

  decreaseRadius = () => {
    let tempState = this.state;
    tempState.mapState.circle.radius -= 25000;
    this.setState({tempState});
  }

  zoomout = () => {
    let tempState = this.state;
    tempState.mapState.zoom -= 1;
    this.setState({tempState})
  }

  zoomin = () => {
    let tempState = this.state;
    tempState.mapState.zoom += 1;
    this.setState({tempState})
  }

  setLocation = () => {
    let tempState = this.state;
    tempState.mapState.longitude = this.props.longitude;
    tempState.mapState.latitude = this.props.latitude;
    this.setState({tempState});
  }

  setNewLocation = (latitude,longitude) => {
    let tempState = this.state;
    tempState.mapState.longitude = longitude;
    tempState.mapState.latitude = latitude;
    this.setState({tempState});
  }

  resetmap = (latitude,longitude) => {
    let tempState = this.state
    tempState.mapState.longitude = longitude;
    tempState.mapState.latitude = latitude;
    this.setState({tempState});
    }

  calculateDistance(pointA, pointB) {

    const lat1 = pointA.latitude;
    const lon1 = pointA.longitude;
  
    const lat2 = pointB.latitude;
    const lon2 = pointB.longitude;
  
    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);
  
    const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
              ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    return distance; // in meters
  }

  displayMarkers = () => {
    var latLngB = { 
      latitude: this.state.mapState.latitude,
      longitude: this.state.mapState.longitude
    }

    return this.state.walks.map((walk, index) => {
      var latLngA = {
        latitude: walk.latitude, 
        longitude: walk.longitude
      }
      if (this.calculateDistance(latLngA, latLngB) < this.state.mapState.circle.radius) {
      return <Marker key={index} id={index} position={{
       lat: walk.latitude,
       lng: walk.longitude
     }}
     
     onClick={() => this.displayPlace(walk)} />
      }
    })
  }

  displayPlace(walk){
    let tempState = this.state;
    tempState.placeId = walk.id;
    tempState.mapState.latitude = walk.latitude;
    tempState.mapState.longitude = walk.longitude;
    this.setState({tempState});
  }

  displayWalks() {
    
    var latLngB = { 
      latitude: this.state.mapState.latitude,
      longitude: this.state.mapState.longitude
    }

    return this.state.walks.map((walk, index) => {
      var latLngA = {
        latitude: walk.latitude, 
        longitude: walk.longitude
      }
      if (this.calculateDistance(latLngA, latLngB) < this.state.mapState.circle.radius) {
      console.log("Show walk"+index)
      return (
        <div id={"walk"+index}>
        <p> {walk.title}</p>
        </div>
        );
      }
    })
  }

  getcoordinate(event) {
    
    var HttpClient = function() {
      this.get = function(aUrl, aCallback) {
          var anHttpRequest = new XMLHttpRequest();
          anHttpRequest.onreadystatechange = function() { 
              if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                  aCallback(anHttpRequest.responseText);
          }
  
          anHttpRequest.open( "GET", aUrl, true );            
          anHttpRequest.send( null );
      }
    }

    console.log(event.target.value.length > 6)
      if (event.target.value.length >= 5) {
        var testweb = "http://api.postcodes.io/postcodes/"+event.target.value+"/validate"
        var website = "http://api.postcodes.io/postcodes/"+event.target.value
        console.log(website)

        new HttpClient().get(testweb, function(response) {
          console.log(response);
          if (response != '{"status":200,"result":true}') {
            return
          }
        })

        new HttpClient().get(website, function(response) {
              console.log(response)
              if (response.split(",")[8].split(":")[1] > 0) {
                console.log("Latitude: "+response.split(",")[8].split(":")[1])
                console.log("Longitude:"+response.split(",")[7].split(":")[1])
                this.resetmap(response.split(",")[8].split(":")[1],response.split(",")[7].split(":")[1])
              }
          })
      }
        
        
    
      
      
    }

  render () {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <ButtonGroup aria-label="Set Radius">
              <Button onClick={() => this.incrementRadius()}>Increase Drive Time: 15 mins</Button>
              <Button onClick={() => this.decreaseRadius()}>Decrease Drive Time: 15 mins</Button>
              <Button onClick={() => this.zoomin()}>Zoom In</Button>
              <Button onClick={() => this.zoomout()}>Zoom Out</Button>
            </ButtonGroup>
            <br></br>
            <label>Time in Car </label>
              <input
                type="text"
                name="radius"
                value={this.state.mapState.circle.radius/100000+" hrs"}
                disabled={true}
              />
              <br></br>
              <ButtonGroup aria-label="Reset Location">
              
              <input
                type="text"
                name="new coordinates"
                value={this.state.postcode}
                onChange={this.getcoordinate.bind(this)}
                disabled={false}
              />
              <Button onClick={() => this.setLocation()}>Reset Location</Button>
            </ButtonGroup>
          </Row>
          <br></br>
          <Row>
          <Map
            google={this.props.google}
            zoom={this.state.mapState.zoom}
            class = "mapStyles"
            initialCenter={{ lat: 51.51736, lng: -0.073328}}
            >

            {this.displayMarkers()}
            <Circle
                  center={{
                    lat: this.state.mapState.latitude,
                    lng: this.state.mapState.longitude
                  }}
                  radius={this.state.mapState.circle.radius}
                  strokeColor={this.state.mapState.circle.strokeColor}
                  strokeOpacity={this.state.mapState.circle.strokeOpacity}
                  strokeWeight={this.state.mapState.circle.strokeWeight}
                  fillColor={this.state.mapState.circle.fillColor}
                  fillOpacity={this.state.mapState.circle.fillOpacity}
                />  
          </Map>
          </Row>
          <Row>
            {this.displayWalks()}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

  MapRender.propTypes = {
    name: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    walks: PropTypes.array
  };

  export default GoogleApiWrapper ({
      apiKey: 'AIzaSyBKnQLJroZD38eJhiGpdrhIlmZCynrg9l4'
  })(MapRender);