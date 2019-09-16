import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import DevTools from './DevTools';
import Index from './front/Index';
import history from '../config/initializers/history';
import FancyRoute from '../components/utilities/FancyRoutes';


const routes = [
  {
    title: 'Home',
    path: '/',
    exact: true,
    component: Index,
  },
];
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        {/* eslint-disable-next-line react/no-array-index-key,react/jsx-props-no-spreading */}
        {routes.map((route, i) => <FancyRoute key={i} {...route} />)}
        <DevTools />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  </Provider>
);

Root.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};

export default Root;
