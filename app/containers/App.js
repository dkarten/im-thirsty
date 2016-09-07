import React from 'react';
import Navbar from '../components/Navbar';

export default class App extends React.Component {
  componentDidMount(){
    console.log("APP MOUNT");
  }
  render(){
    const bodyStyle = {'paddingTop':'60px'};
    return (
      <div style={bodyStyle}>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}
