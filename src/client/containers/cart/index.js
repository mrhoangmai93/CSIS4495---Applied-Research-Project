import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import withLayout from "../../hocs/front/Layout";
import {
  loadCart,
  addToCart,
  deleteFromCart
} from "../../redux/actions/cart.action";
import "./index.scss";
//import { getCart, deleteFromCart, updateCart } from "../../actions/";

//import Spinner from "../common/Spinner";
import CartSummary from "../../components/Cart/CartSummary";
import isEmpty from "../../../validation/is-empty";

import CartItem from "../../components/Cart/CartItem";
import ButtonWithOnclick from "../../components/utilities/buttons/ButtonWithOnclick";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.props.loadCart();
  }
  componentDidMount() {
    //this.props.getCart();
  }
  render() {
    const { cart } = this.props;
    const foods = cart.get("foods");
    let cartItems;
    let subTotal = cart.get("subTotal");
    if (!isEmpty(foods)) {
      cartItems = (
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image">Item</td>
                <td className="description" colspan="5" />
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {foods.map(item => {
                return (
                  <CartItem
                    key={item._id}
                    item={item.foodId}
                    quantity={item.quantity}
                    deleteFromCart={this.props.deleteFromCart}
                    // updateCart={this.props.updateCart}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      cartItems = <h4>No products found...</h4>;
    }

    return (
      <section className="cart-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-9">
              <div className="cart_table">
                <div className="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="active">Shopping Cart</li>
                  </ol>
                </div>
                {cartItems}
                <ButtonWithOnclick className="float-right">
                  Update Cart
                </ButtonWithOnclick>
              </div>
            </div>
            <div className="col-12 col-lg-3 cart_summary">
              <CartSummary subTotal={subTotal} />
            </div>
          </div>

          {/* <DoActions items={items} /> */}
        </div>
      </section>
    );
  }
}

Cart.propTypes = {
  loadCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  //   updateCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});
export default withRouter(
  connect(
    mapStateToProps,
    { loadCart, deleteFromCart }
  )(withLayout(Cart))
);
