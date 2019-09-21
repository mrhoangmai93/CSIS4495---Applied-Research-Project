import React from 'react';
import './index.scss';
import Logo from '../Logo';

const Footer = (props) => (
  <footer className="footer">
    <div className="container-fluid pl-5 pr-5">
      <div className="row">
        <div className="col-12 no-gutters pl-0 pr-0">
          <div className="footer-bottom-container d-flex justify-content-lg-between justify-content-center flex-lg-row flex-column align-items-center pt-3 pb-3">
            <Logo theme="white" />
            <ul className="footer__list mt-3 pl-0">
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
            {/*            <span className="footer__list mt-4 footer__copyright">
                Built by
              {' '}
              <a href="#" className="footer__link">
                  Cuong Thinh Dao
                </a>
              {' '}
              <a href="#" className="footer__link">
                  Harmanjot Singh
                </a>
              {' '}
              <a href="#" className="footer__link">
                  Wanqi Zhao
                </a>
              {' '}
              <a href="#" className="footer__link">
                  Hoang Mai
                </a>
              </span> */}
          </div>
        </div>
        <div className="col-12 footer__navigation pt-3 pb-3">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <span className="footer__list mt-4 footer__copyright">
                Built by
              {' '}
              <a href="#" className="footer__link">
                  Cuong Thinh Dao
              </a>
              <span>,</span>
              <a href="#" className="footer__link">
                  Harmanjot Singh
              </a>
              <span>,</span>
              <a href="#" className="footer__link">
                  Wanqi Zhao
              </a>
              <span>,</span>
              <a href="#" className="footer__link">
                  Hoang Mai
              </a>
            </span>
            <span className="mt-3 footer__copyright">Copyright &copy; 2019</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
