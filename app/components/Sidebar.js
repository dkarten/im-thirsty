import React from 'react';

class Sidebar extends React.Component {
  componentDidMount(){
    console.log("sidebar mounting!");
  }

  render() {
    return (
      <div className={this.props.className}>
        <ul className="nav nav-pills nav-stacked">
          <li><button type="button" className="btn btn-primary btn-block">{'I\'m Thirsty!'}</button></li>
        </ul>
      </div>
    )
  }
}


export default Sidebar;
