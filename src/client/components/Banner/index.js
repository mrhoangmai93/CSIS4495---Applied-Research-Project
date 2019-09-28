import React from "react";
import "./index.scss";
import InputWithBorderEffect from "../utilities/inputs/InputWithBorderEffect";
import RippleButton from "../utilities/buttons/RippleButton";

const Banner = ({ appName }) => (
  <div className="banner pt-5 pb-5 d-flex flex-column justify-content-center">
    <div className="container ">
      {/*      <h1 className="logo-font text-white mt-0">
        {appName.toLowerCase()}
      </h1> */}
      <h1 className="mb-5 text-center banner-heading text-white">
        Modern way to buy homemade food.
      </h1>
      <InputWithBorderEffect
        placeholder="Burger, Ramen, Spaghetti..."
        size="big"
      />
      <div className="d-flex justify-content-center mt-3">
        <RippleButton>Find food</RippleButton>
      </div>
    </div>
  </div>
);

export default Banner;
