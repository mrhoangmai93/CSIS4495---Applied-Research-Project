import React from "react";
import "./index.scss";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withLayout from "../../../hocs/front/Layout";
import Banner from "../../../components/Banner";
import ProductCard from "../../../components/ProductCard";
import HowItWorks from "../../../components/HowItWorks";
import Categories from "../../../components/Categories";
import Testimonial from "../../../components/Testimonial";
import { loadAllFoods } from "../../../redux/actions/food.action";
import { loadCart, addToCart } from "../../../redux/actions/cart.action";

// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadAllFoods();
    this.props.loadCart();
  }
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);
  componentDidMount() {
    document.title = "FoodByMe - New way to enjoy your food";
  }

  render() {
    const foods = this.props.foods ? this.props.foods : [];
    let displayProducts;

    displayProducts = foods.valueSeq().map(food => (
      <div className="col-lg-4 col-md-6">
        <ProductCard food={food} addToCart={this.props.addToCart} />
      </div>
    ));

    return (
      <>
        <Banner appName="FoodByMe" />
        <section className="container products mt-5">
          <div className="row">{displayProducts}</div>
        </section>
        <HowItWorks />
        <Testimonial />
      </>
    );
  }
}
Index.propTypes = {
  loadAllFoods: PropTypes.func.isRequired,
  loadCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  foods: PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
  foods: state.foods
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadAllFoods, loadCart, addToCart }
  )(withLayout(Index))
);
