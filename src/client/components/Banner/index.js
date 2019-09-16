import React from 'react';
import './index.scss';
const Banner = ({ appName }) => {
  return (
    <div className="banner pt-5 pb-5">
      <div className="container">
        <h1 className="logo-font text-white mt-0">
          {appName.toLowerCase()}
        </h1>
        <p>Modern way to buy homemade food.</p>
      </div>
    </div>
  );
};

export default Banner;
