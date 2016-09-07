import React from 'react';
import {Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router';
import App from './containers/App';
import Main from './containers/Main';
import Login from './containers/Login';

export default function() {
  return (
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  )

}
