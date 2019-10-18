import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
//import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLayout from "../../hocs/front/Layout";
import withAuth from "../../hocs/withAuth";

import { loadProfile } from "../../redux/actions/userProfile.action";
import { placeOrder } from "../../redux/actions/currentOrder.action";
import { clearCart } from "../../redux/actions/cart.action";
import CheckShippingInfo from "../../components/Checkout/CheckShippingInfo";
import CheckoutCardInfo from "../../components/Checkout/CheckoutCardInfo";
import CheckOrderTotal, {
  CHECK_OUT_TOTAL_STATUSES
} from "../../components/Checkout/CheckOrderTotal";
import CheckoutItems from "../../components/Checkout/CheckoutItems";
import Spinner from "../../components/utilities/Spinner";
import isEmpty from "../../../validation/is-empty";
import "./index.scss";
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.props.loadProfile();

    this.state = {
      orderdetail: {
        items: [],
        total: ""
      },
      paymentMethod: isEmpty(this.props.profile.profile)
        ? {}
        : this.props.profile.profile.payment.shift(),
      shippingAddress: isEmpty(this.props.profile.profile)
        ? {}
        : this.props.profile.profile.address,
      orderStatus: this.props.currentOrder.get("orderStatus")
    };
  }
  callbackHandler = (type, data) => {
    switch (type) {
      case CHECK_OUT_TOTAL_STATUSES.PLACE_ORDER:
        const paymentMethod = this.props.profile.get("payments")[0];
        const shippingAddress = this.props.profile.get("address");
        const foods = this.props.currentOrder.get("foods").map(food => {
          return { foodId: food.foodId._id, quantity: food.quantity };
        });
        const totalSummary = this.props.currentOrder.get("orderSummary");

        const newOrder = {
          paymentMethod,
          shippingAddress,
          foods,
          totalSummary
        };
        this.props.placeOrder(newOrder);
        break;
      default:
        break;
    }
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ orderStatus: nextProps.currentOrder.get("orderStatus") });
  }

  render() {
    const { user, profile, currentOrder } = this.props;
    let orderStatus = this.state.orderStatus;

    const address = profile.get("address");
    const payments = profile.get("payments");

    const foods = currentOrder.get("foods");
    const loading = profile.get("loading");
    if (!user || !foods) {
      return <Redirect to="/" />;
    }
    let itemContent;

    itemContent = isEmpty(foods)
      ? ""
      : foods.map(item => (
          <CheckoutItems
            key={item._id}
            food={item.foodId}
            quantity={item.quantity}
          />
        ));
    let paymentContent;
    paymentContent = isEmpty(payments) ? (
      "No card Found"
    ) : (
      <CheckoutCardInfo payments={payments} />
    );
    let showContent;
    if (loading || !profile) {
      showContent = <Spinner />;
    } else {
      if (orderStatus) {
        // call clear cart action
        this.props.clearCart();
        // change the display content
        showContent = (
          <div className="text-center">
            <h2>Congratulation! You have placed your order.</h2>
          </div>
        );
      } else {
        showContent = (
          <div className="container">
            <div className="heading">
              <h3>Review Your Order</h3>
            </div>
            <div className="row">
              <div className="col-8 order_details">
                <div className="info_area">
                  <div className="row">
                    <div className="col-6">
                      <CheckShippingInfo user={user} address={address} />
                    </div>
                    <div className="col-6">{paymentContent}</div>
                  </div>
                </div>
                <div className="info_area">
                  <h6>Foods in your order</h6>
                  <ul className="user_info">{itemContent}</ul>
                </div>
              </div>
              <div className="col-4">
                <CheckOrderTotal
                  orderSummary={currentOrder.get("orderSummary")}
                  callbackHandler={this.callbackHandler}
                />
              </div>
            </div>
          </div>
        );
      }
    }
    return <div className="checkout">{showContent}</div>;
  }
}
Checkout.propTypes = {
  clearCart: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.get("user"),
  currentOrder: state.currentOrder,
  profile: state.userProfile
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadProfile, placeOrder, clearCart }
  )(withAuth(withLayout(Checkout)))
);
