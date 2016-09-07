import React from 'react';
import MapContainer from '../containers/MapContainer';
import Sidebar from '../components/Sidebar';


export default function (props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <MapContainer className="col-md-10 col-md-push-2" height={'80vh'} zoom={16}/>
        <Sidebar className="col-md-2 col-md-pull-10" />
      </div>
    </div>
  )
}
