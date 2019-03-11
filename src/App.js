import React, { Component, Fragment } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import './App.css';
import LoginForm from './components/login-form';

import SilosList from './components/routes/silos-list';
import SiloDetail from './components/routes/silo-detail';
import ReleasesList from './components/routes/releases-list';
import ReleaseDetail from './components/routes/release-detail';
import FeaturesList from './components/routes/features-list';
import FeatureDetail from './components/routes/feature-detail';
import ChangesList from './components/routes/changes-list';
import FlagDetail from './components/routes/flag-detail';
import Home from './components/routes/home';
import Fallback from './components/routes/fallback';

const navItems = [
  { path: '/', title: 'Home', component: Home },
  { path: '/silos', title: 'Silos', component: SilosList },
  { path: '/releases', title: 'Releases', component: ReleasesList },
  { path: '/features', title: 'Features', component: FeaturesList },
  { path: '/history', title: 'History', component: ChangesList },
];

const allItems = navItems.concat([
  { path: '/features/:id', component: FeatureDetail },
  { path: '/silos/:id', component: SiloDetail },
  { path: '/releases/:id', component: ReleaseDetail },
  { path: '/flags/:id', component: FlagDetail },
  { component: Fallback },
]);

export default class App extends Component {

  links() {
    return navItems.map(({ path, title }) => (
      <li key={ path }>
        <NavLink
          exact={ path === '/' }
          to={ path }
        >
          { title }
        </NavLink>
      </li>
    ));
  }

  routes() {
    return allItems.map(({ path, component }) => (
      <Route
        exact
        path={ path }
        component={ component }
        key={ '' + path }
      />
    ));
  }

  render() {
    return (
      <Fragment>
        <nav>
          <LoginForm/>
          <ul>
            { this.links() }
          </ul>
        </nav>
        <main>
          <Switch>
            { this.routes() }
          </Switch>
        </main>
      </Fragment>
    );
  }
};
