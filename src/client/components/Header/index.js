<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import Logo from '../Logo';

const Header = (props) => (
=======
import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import Logo from "../Logo";

const Header = props => (
>>>>>>> 6499fa63b481c1d2a2c301d95cde7e7ac4add995
  <nav className="navbar navbar-light">
    <div className="container">
      <Link to="/" className="navbar-brand">
        <Logo theme="black" />
      </Link>
      <ul className="nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
<<<<<<< HEAD
                        Home
=======
            Home
>>>>>>> 6499fa63b481c1d2a2c301d95cde7e7ac4add995
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
<<<<<<< HEAD
                        Sign in
=======
            Sign in
>>>>>>> 6499fa63b481c1d2a2c301d95cde7e7ac4add995
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
<<<<<<< HEAD
                        Sign up
=======
            Sign up
>>>>>>> 6499fa63b481c1d2a2c301d95cde7e7ac4add995
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
