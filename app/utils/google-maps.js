import querystring from 'querystring';

const API_KEY = 'AIzaSyBpNRJLpleKBQ5_mOT1Gy1Q_9YWkhBjR2E';
const options = {
  key:API_KEY,
  v:'3.exp'
}

let _promise;

export default {
  load() {
    //check if we already loaded!
    if (_promise) {
      return _promise;
    }

    console.log('calling google-maps.load()');
    _promise = new Promise((resolve, reject) => {
      if (window.google) {
        this.maps = window.google.maps;
        resolve(this);
      } else {
        window.initMaps = () => {
          delete window.initMaps;
          this.maps = window.google.maps;
          resolve(this);
        }
        let src='https://maps.googleapis.com/maps/api/js';
        src+='?callback=initMaps&'
        src+= querystring.stringify(options);
        const script = document.createElement('script');
        script.async = 1;
        script.setAttribute('src', src);
        document.body.appendChild(script);
        console.log('script appended');
      }
    })
    return _promise;
  }
}
