import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';

import SilosList from './components/routes/silos';
import ReleasesList from './components/routes/releases';
import FeaturesList from './components/routes/features';
import FeatureDetail from './components/routes/feature';
import History from './components/routes/history';
import Home from './components/routes/home';
import Fallback from './components/routes/fallback';

const navMenuRoutes = [
  { path: '/', title: 'Home', component: Home },
  { path: '/silos', title: 'Silos', component: SilosList },
  { path: '/releases', title: 'Releases', component: ReleasesList },
  { path: '/features', title: 'Features', component: FeaturesList },
  { path: '/history', title: 'History', component: History },
];

const secondaryRoutes = [
  { path: '/features/:id', component: FeatureDetail },
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
