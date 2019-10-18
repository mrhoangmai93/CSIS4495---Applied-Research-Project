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
import RegisterSeller from "./front/RegisterSeller";
import Login from "./front/Login";
import About from "./front/About";
import Contact from "./front/Contact";
import Cart from "./cart";
import UserProfile from "./userProfile";
import EditAddress from "./userProfile/edit-account/EditAddress";
import EditPayment from "./userProfile/edit-account/EditPayment";
import ChangePassword from "./userProfile/edit-account/ChangePassword";
import FoodDetails from "./food/FoodDetails";
import Checkout from "./checkout";
import CreateSellerProfile from "./sellerProfile/CreateSellerProfile";
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
    title: "Register a new Seller",
    path: "/register/seller",
    exact: true,
    component: RegisterSeller
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
  },
  {
    title: "User Account",
    path: "/account",
    exact: true,
    component: UserProfile
  },
  {
    title: "Edit Your Address",
    path: "/account/edit-address",
    exact: true,
    component: EditAddress
  },
  {
    title: "Edit Your Payment",
    path: "/account/edit-payment",
    exact: true,
    component: EditPayment
  },
  {
    title: "Change Password",
    path: "/account/change-password",
    exact: true,
    component: ChangePassword
  },
  {
    title: "Food Details",
    path: "/food/:id",
    exact: true,
    component: FoodDetails
  },
  {
    title: "Check out",
    path: "/checkout",
    exact: true,
    component: Checkout
  },
  {
    title: "Create Seller Profile",
    path: "/seller/create-profile",
    exact: true,
    component: CreateSellerProfile
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
