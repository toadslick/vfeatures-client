import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';

import Silos from './components/routes/silos';
import Releases from './components/routes/releases';
import Features from './components/routes/features';
import Feature from './components/routes/feature';
import History from './components/routes/history';
import Home from './components/routes/home';
import Fallback from './components/routes/fallback';

const navMenuRoutes = [
  { path: '/', title: 'Home', component: Home },
  { path: '/silos', title: 'Silos', component: Silos },
  { path: '/releases', title: 'Releases', component: Releases },
  { path: '/features', title: 'Features', component: Features },
  { path: '/history', title: 'History', component: History },
];

const secondaryRoutes = [
  { path: '/features/:id', component: Feature },
  { component: Fallback },
];

export default class App extends Component {
  render() {

    const links = navMenuRoutes.map(({ path, title }) => (
      <li key={ path }>
        <Link to={ path }>
          { title }
        </Link>
      </li>
    ));

    const routes = navMenuRoutes.concat(secondaryRoutes).map(({ path, component }) => (
      <Route
        exact
        path={ path }
        component={ component }
        key={ '' + path }
      />
    ));

    return (
      <div>
        <h1>vfeatures</h1>
        <nav>
          <ul>{ links }</ul>
        </nav>
        <hr/>
        <Switch>
          { routes }
        </Switch>
      </div>
    );
  }
};
