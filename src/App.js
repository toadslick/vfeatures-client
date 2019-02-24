import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

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
        <Link to={ path }>
          { title }
        </Link>
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
      <div>
        <nav>
          <ul>
            { this.links() }
          </ul>
        </nav>
        <aside>
          <LoginForm/>
        </aside>
        <Switch>
          { this.routes() }
        </Switch>
      </div>
    );
  }
};
