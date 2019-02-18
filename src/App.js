import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';

import Silos from './components/routes/silos';
import Releases from './components/routes/releases';
import Features from './components/routes/features';
import History from './components/routes/history';
import Home from './components/routes/home';
import Fallback from './components/routes/fallback';

const routing = [
  { path: '', title: 'Home', component: Home },
  { path: 'silos', title: 'Silos', component: Silos },
  { path: 'releases', title: 'Releases', component: Releases },
  { path: 'features', title: 'Features', component: Features },
  { path: 'history', title: 'History', component: History },
];

export default class App extends Component {
  render() {

    const links = routing.map(({ path, title }) => (
      <Link
        to={ '/' + path }
        key={ path }
      >
        { title }
      </Link>
    ));

    const routes = routing.map(({ path, component }) => (
      <Route
        exact
        path={ '/' + path }
        component={ component }
        key={ path }
      />
    ));

    // 404 fallback route
    routes.push(
      <Route
        component={ Fallback }
        key={ '404' }
      />
    );

    return (
      <div>
        <nav>
          { links }
        </nav>
        <Switch>
          { routes }
        </Switch>
      </div>
    );
  }
};
