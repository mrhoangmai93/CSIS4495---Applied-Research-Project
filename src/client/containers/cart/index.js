import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import withLayout from "../../hocs/front/Layout";
import withAuth from "../../hocs/withAuth";

import {
  loadCart,
  addToCart,
  deleteFromCart,
  updateCart
} from "../../redux/actions/cart.action";
import "./index.scss";

import CartSummary from "../../components/Cart/CartSummary";
import isEmpty from "../../../validation/is-empty";

import CartItem, { VIEW_STATUSES } from "../../components/Cart/CartItem";
import ButtonDefault from "../../components/utilities/buttons/ButtonDefault";
import Alert from "../../components/utilities/Alert";
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
      case VIEW_STATUSES.UPDATE_QUANTITY:
        let newQuantity;
        if (data.qty === "") {
          newQuantity = 0;
        } else {
          newQuantity = parseInt(data.qty);
        }
        this.props.updateCart({ foodId: data.itemId, quantity: newQuantity });
        break;
      case VIEW_STATUSES.DELETE_ITEM:
        this.props.deleteFromCart({ foodId: data.itemId });
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
              <CartSummary subTotal={subTotal} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Cart.propTypes = {
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
    { loadCart, deleteFromCart, updateCart }
  )(withAuth(withLayout(Cart)))
);
