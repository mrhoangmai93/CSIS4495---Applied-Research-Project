import React from 'react';
import './index.scss';

const Logo = (props) => (
  <div className="brand-container">
    <span className={`brand-first d-inline mr-1 ${props.theme}`}>FoodBy</span>
    <span className="brand-second d-inline">Me</span>
  </div>
);

export default Logo;
