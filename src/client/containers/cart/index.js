import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import withLayout from "../../hocs/front/Layout";
import withAuth from "../../hocs/withAuth";

import {
  loadCart,
  addToCart,
  deleteFromCart,
  updateCart
} from "../../redux/actions/cart.action";
import { createOrder } from "../../redux/actions/currentOrder.action";
import "./index.scss";

import CartSummary, {
  CART_SUMMARY_STATUSES
} from "../../components/Cart/CartSummary";
import isEmpty from "../../../validation/is-empty";

import CartItem, { CART_ITEM_STATUSES } from "../../components/Cart/CartItem";
import ButtonDefault from "../../components/utilities/buttons/ButtonDefault";
import Alert from "../../components/utilities/Alert";
import { setAlert } from "../../redux/actions/alert.action";
class Cart extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   foods: this.props.foods,
    //   cart: this.props.cart
    // };
    this.props.loadCart();
  }
  componentDidMount() {
    //this.props.getCart();
  }
  callbackHandler = (type, data) => {
    switch (type) {
      case CART_ITEM_STATUSES.UPDATE_QUANTITY:
        let newQuantity;
        if (data.qty === "") {
          newQuantity = 0;
        } else {
          newQuantity = parseInt(data.qty);
        }
        this.props.updateCart({ foodId: data.itemId, quantity: newQuantity });
        break;
      case CART_ITEM_STATUSES.DELETE_ITEM:
        this.props.deleteFromCart({ foodId: data.itemId });
        break;
      case CART_SUMMARY_STATUSES.CHECK_OUT:
        if (!isEmpty(this.props.foods)) {
          this.props.createOrder({
            foods: this.props.foods,
            orderSummary: data.orderSummary
          });
          return <Redirect to="/checkout" />;
        } else {
          this.props.setAlert({
            msg: "Cart is Empty!",
            alertType: "danger"
          });
        }

        break;
      default:
        break;
    }
  };
  render() {
    const { foods, cart } = this.props;

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
                    callbackHandler={this.callbackHandler}
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
            <Alert />
            <div className="col-12 col-lg-9">
              <div className="cart_table">
                <div className="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="active">Shopping Cart</li>
                  </ol>
                </div>
                {cartItems}
                {/* <ButtonDefault className="float-right">
                  Update Cart
                </ButtonDefault> */}
              </div>
            </div>
            <div className="col-12 col-lg-3 cart_summary">
              <CartSummary
                subTotal={subTotal}
                callbackHandler={this.callbackHandler}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Cart.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  loadCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  foods: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart,
  foods: state.cart.get("foods")
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadCart, deleteFromCart, updateCart, createOrder, setAlert }
  )(withAuth(withLayout(Cart)))
);
