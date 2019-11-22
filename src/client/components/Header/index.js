import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/auth.action";
import "./index.scss";
import Logo from "../Logo";

const Header = ({ auth, cart, logout }) => {
  const isAuthenticated = auth.get("isAuthenticated");
  const loading = auth.get("loading");
  const userName = auth.getIn(["user", "name"]);
  const foods = cart.get("foods") ? cart.get("foods") : [];
  const user = auth.get("user");
  let numberItem = 0;
  foods.forEach(food => (numberItem += food.quantity));
  let authLink;
  if (user && user.role === "seller") {
    authLink = (
      <ul className="header__icon__list ">
        <li className="header__icon__item">
          <Link
            className="header__icon__link"
            to={"/seller/profile/" + user._id}
          >
            My Profile
          </Link>
        </li>
        <li className="header__icon__item">
          <Link className="header__icon__link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="header__icon__item">
          <Link className="header__icon__link" to="/account">
            <i className="fa fa-user" /> {userName}
          </Link>
        </li>
        <li className="header__icon__item">
          <Link to="/cart" className="header__icon__link">
            <i className="fa fa-shopping-cart" /> Cart ({numberItem})
          </Link>
        </li>
        <li className="header__icon__item">
          <a onClick={logout} href="#!" className="header__icon__link">
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
    );
  } else {
    //const user = auth
    authLink = (
      <ul className="header__icon__list ">
        <li className="header__icon__item">
          <Link className="header__icon__link" to="/account">
            <i className="fa fa-user" /> {userName}
          </Link>
        </li>
        <li className="header__icon__item">
          <Link to="/cart" className="header__icon__link">
            <i className="fa fa-shopping-cart" /> Cart ({numberItem})
          </Link>
        </li>
        <li className="header__icon__item">
          <Link onClick={logout} to="/" className="header__icon__link">
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hide-sm">Logout</span>
          </Link>
        </li>
      </ul>
    );
  }
  const guestLink = (
    <ul className="nav pull-xs-right">
      <li className="nav-item">
        <Link to="/register/seller" className="nav-link">
          Become a Cook
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Sign in
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Sign up
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <Logo theme="black" />
        </Link>

        {!loading && (
          <Fragment>{isAuthenticated ? authLink : guestLink}</Fragment>
        )}
      </div>
    </nav>
  );
};
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(mapStateToProps, { logout })(Header);
