import React from "react";
import "./index.scss";

const Footer = props => (
  <footer className="footer">
    <div className="footer__logo-box">
      <picture className="footer__logo">
        <img alt="Full logo" src="./client/images/logo.png" />
      </picture>
    </div>
    <div className="row">
      <div className="col">
        <div className="footer__navigation">
          <ul className="footer__list">
            <li className="footer__item">
              <a href="#" className="footer__link">
                About Project
              </a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link">
                Contact us
              </a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col">
        <p className="footer__copyright">
          Built by{" "}
          <a href="#" className="footer__link">
            Cuong Thinh Dao,
          </a>{" "}
          <a href="#" className="footer__link">
            Harmanjot Singh,
          </a>{" "}
          <a href="#" className="footer__link">
            Wanqi Zhao,
          </a>{" "}
          <a href="#" className="footer__link">
            Hoang Mai
          </a>{" "}
          for 4495 Course{" "}
          <a href="#" className="footer__link">
            Applied Research
          </a>
          . Copyright &copy; 2019 FoodByMe
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
