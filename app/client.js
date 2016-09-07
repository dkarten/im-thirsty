import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router';
import routes from './routes';

let rootElement = document.getElementById("app");

ReactDOM.render(
  <Router routes={routes()} history={hashHistory}/>,
  rootElement
);
