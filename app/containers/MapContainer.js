import React from 'react';
import ReactDOM from 'react-dom';
import objectAssign from 'object-assign';
import GoogleMaps from '../utils/google-maps';
import GeolocationServiceModule from '../utils/geolocation-service';

import Loading from '../components/Loading';
import Map from '../components/Map';

const DEFAULT_CENTER = {
  lat: 40.730610,
  lng:-73.935242
}

const GeolocationService = new GeolocationServiceModule();

export default class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    //
    this.state = {
      mapLoaded:false
    }
  }
  componentDidMount = () => {
    console.log('MapContainer.js componentDidMount()');
    if (!this.state.mapLoaded) {
      GoogleMaps.load().then(this.createMap);
    }

  }
  createMap = (maps) => {
    if (this.state.mapLoaded) {
      return;
    }
    const node = ReactDOM.findDOMNode(this);
    this.map = new GoogleMaps.maps.Map(node, {
      ...this.props,
      center:new GoogleMaps.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
      styles: [
        {
          featureType: 'poi.business',
          elementType: 'labels',
          stylers: [
            { visibility: 'off' }
          ]
        }
      ]
    });
    this.setState({
      mapLoaded:true
    });
    console.log(this.state);
    GeolocationService.trackLocation(this.updateCurrentPosition, this.geolocationError);
    /*if (navigator && navigator.geolocation) {
      var position_options = {
        enableHighAccuracy:true,
        maximumAge: 30000,
        timeout: 27000
      };
      this.watchId = navigator.geolocation.watchPosition(
        this.updateCurrentPosition,
        this.geolocationError,
        position_options
      )
    }*/
    var layer = new GoogleMaps.maps.FusionTablesLayer({
      query: {
        select: 'Lat',
        from:'1qM0t69-tvRWXbZO6plmZH-UKY05qSKmjb7K6FoO6'
      },
      styles:[{
        markerOptions: {
          iconName:"small_blue"
        }
      }]
    });
    layer.setMap(this.map);
  }
  updateCurrentPosition = (pos) => {
    console.log(pos);
    var currentLocation = new GoogleMaps.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    if (!this.userLocation) {
      this.userLocation = new GoogleMaps.maps.Marker({
             map : this.map,
             position : currentLocation,
             title : "You are here",
             icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillOpacity: 1.0,
                fillColor: '#408aff',
                strokeOpacity: 1.0,
                strokeColor: '#ffffff',
                strokeWeight: 3.0,
                scale: 10 //pixels
              }
             /*icon: {
               anchor: new google.maps.Point(0, 0),
               url: 'data:image/svg+xml;utf-8, \
                    <svg version="1.1"\
                      xmlns="http://www.w3.org/2000/svg">\
                      <circle cx="0" cy="0" r="8" stroke="skyblue" fill="skyblue"/>\
                      <circle cx="0" cy="0" r="10" stroke="white" stroke-width="2" fill="none" />\
                    </svg>'
             }*/
     });
    } else {
      this.userLocation.setPosition(currentLocation);
    }

    // scroll to userLocation
    this.map.panTo(currentLocation);
  }
  geolocationError = (err) => {
    console.log('geolocationError!');
  }
  getChildren = () => {
    return React.Children.map(this.props.children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      return React.cloneElement(child, {
        ref: child.ref,
        map: this.map
      });
    });
  }

  render = () => {
    console.log("MapContainer render, loaded state is " + this.state.mapLoaded);
    const style = objectAssign({
      width: this.props.width,
      height: this.props.height,
      margin: 'auto'
    }, this.props.style);
    //if (this.state.mapLoaded) {
      return (
        <div style={style} className={this.props.className}>
          <Loading hide={this.state.mapLoaded} className={this.props.className} />
          <div ref="google-map" width={'100%'} height={'100%'}>
            {this.props.children}
            {/*<Map ref="google-map" width={'100%'} height={'100%'} />*/}
          </div>
        </div>
      )
    //} else {
  //    return (
    //    <div style={style} className={this.props.className}>
      //    <Loading hide={this.state.mapLoaded} className={this.props.className} />
        //</div>
      //)
    //}
  }
}
