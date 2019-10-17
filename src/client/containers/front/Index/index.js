import React from "react";
import "./index.scss";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withLayout from "../../../hocs/front/Layout";
import Banner from "../../../components/Banner";
import ProductCard, { VIEW_STATUSES } from "../../../components/ProductCard";
import HowItWorks from "../../../components/HowItWorks";
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
  callbackHandler = (type, data) => {
    switch (type) {
      case VIEW_STATUSES.ADD_TO_CART:
        this.props.addToCart({ foodId: data.foodId, quantity: 1 });
        break;
      default:
        break;
    }
  };
  render() {
    const foods = this.props.foods ? this.props.foods : {};
    let displayProducts;
    //console.log(foods.get("list"));

    displayProducts = foods.get("list").map(food => (
      <div className="col-lg-4 col-md-6">
        <ProductCard food={food} callbackHandler={this.callbackHandler} />
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
