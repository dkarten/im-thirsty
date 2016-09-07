import React from 'react';
import { Link, IndexLink } from 'react-router'

class Navbar extends React.Component {
  render() {
    const floatRight = {'float':'right'};
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#user-nav" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <IndexLink to="#" className="navbar-brand">WtrFntn</IndexLink>
          </div>

          <div className="collapse navbar-collapse" id="user-nav" style={floatRight}>
            <ul className="nav navbar-nav">
              <li><Link to="login">Login</Link></li>
              <li><a>Sign Up</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div> {/* end container-fluid */}
      </nav>
    )
  }
}

export default Navbar;
