import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import './App.css';

import SilosList from './components/routes/silos-list';
import ReleasesList from './components/routes/releases-list';
import FeaturesList from './components/routes/features-list';
import FeatureDetail from './components/routes/feature-detail';
import ChangesList from './components/routes/changes-list';
import FlagDetail from './components/routes/flag-detail';
import Home from './components/routes/home';
import Fallback from './components/routes/fallback';
import LoginForm from './components/login-form';

const navMenuRoutes = [
  { path: '/', title: 'Home', component: Home },
  { path: '/silos', title: 'Silos', component: SilosList },
  { path: '/releases', title: 'Releases', component: ReleasesList },
  { path: '/features', title: 'Features', component: FeaturesList },
  { path: '/history', title: 'History', component: ChangesList },
];

const secondaryRoutes = [
  { path: '/features/:id', component: FeatureDetail },
  { path: '/flags/:id', component: FlagDetail },
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
        <LoginForm/>
        <Switch>
          { routes }
        </Switch>
      </div>
    );
  }
};
