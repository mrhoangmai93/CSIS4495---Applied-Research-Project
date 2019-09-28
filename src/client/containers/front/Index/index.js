import React from "react";
import "./index.scss";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withLayout from "../../../hocs/front/Layout";
import Banner from "../../../components/Banner";
import ProductCard from "../../../components/ProductCard";
import HowItWorks from "../../../components/HowItWorks";
<<<<<<< HEAD
import Categories from "../../../components/Categories"
=======
import Testimonial from "../../../components/Testimonial";
>>>>>>> 6499fa63b481c1d2a2c301d95cde7e7ac4add995
// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  componentDidMount() {
    document.title = "FoodByMe - New way to enjoy your food";
  }

  render() {
    return (
      <>
        <Banner appName="FoodByMe" />
        <section className="container products mt-5">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <ProductCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <ProductCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <ProductCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <ProductCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <ProductCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <ProductCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <ProductCard />
            </div>
          </div>
        </section>
<<<<<<< HEAD
        <hr/>
        <Categories />
        <HowItWorks />
=======
        <HowItWorks />
        <Testimonial />
>>>>>>> 6499fa63b481c1d2a2c301d95cde7e7ac4add995
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(withLayout(Index))
);
