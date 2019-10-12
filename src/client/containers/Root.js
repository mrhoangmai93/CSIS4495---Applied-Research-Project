import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
//components
import DevTools from "./DevTools";
import Index from "./front/Index";
import history from "../config/initializers/history";
import FancyRoute from "../components/utilities/FancyRoutes";
import Register from "./front/Register";
import Login from "./front/Login";
import About from "./front/About";
import Contact from "./front/Contact";
import Cart from "./cart";
//helpers
import setAuthToken from "../helpers/setAuthToken";
//actions
import { loadUser } from "../redux/actions/auth.action";
// import { loadCart } from "../redux/actions/cart.action";

const routes = [
  {
    title: "Home",
    path: "/",
    exact: true,
    component: Index
  },
  {
    title: "Register a new User",
    path: "/register",
    exact: true,
    component: Register
  },
  {
    title: "Login",
    path: "/login",
    exact: true,
    component: Login
  },
  {
    title: "About Project",
    path: "/about",
    exact: true,
    component: About
  },
  {
    title: "Contact Us",
    path: "/contact",
    exact: true,
    component: Contact
  },
  {
    title: "Cart",
    path: "/cart",
    exact: true,
    component: Cart
  }
];

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Root = ({ store }) => {
  useEffect(() => {
    store.dispatch(loadUser());
    // store.dispatch(loadCart());
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {/* eslint-disable-next-line react/no-array-index-key,react/jsx-props-no-spreading */}
          {routes.map((route, i) => (
            <FancyRoute key={i} {...route} />
          ))}
          <DevTools />
          {/* <Redirect path="*" to="/" /> */}
        </Switch>
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired
};

export default Root;
