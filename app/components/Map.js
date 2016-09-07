import React from 'react';
import objectAssign from 'object-assign';

export default class Map extends React.Component {
  constructor(props) {
    super(props)
  }
  shouldComponentUpdate() {
    return false; // disable react on this div
  }
  render = () => {
    const style = objectAssign({
      width: this.props.width,
      height: this.props.height,
      margin: 'auto'
    }, this.props.style);
    return (
        <div style={style}>
          {this.props.children}
        </div>
    )
  }
}
