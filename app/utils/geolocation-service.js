
const POSITION_OPTIONS = {
  enableHighAccuracy:true,
  maximumAge: 30000,
  timeout: 27000
};

export default class GeolocationService {
  trackLocation = (success, error) => {
    if (navigator && navigator.geolocation) {
      if (this.watchId) {
        navigator.geolocation.clearWatch(this.watchId);
      }

      this.watchId = navigator.geolocation.watchPosition(
        success,
        error,
        POSITION_OPTIONS
      )
    } else {
      //geolocation not supported, use google geolaction api
    }
  }
}
