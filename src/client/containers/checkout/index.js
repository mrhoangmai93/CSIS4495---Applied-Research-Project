import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
//import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLayout from "../../hocs/front/Layout";
import withAuth from "../../hocs/withAuth";

import { loadProfile } from "../../redux/actions/userProfile.action";
import { placeOrder } from "../../redux/actions/currentOrder.action";
import CheckShippingInfo from "../../components/Checkout/CheckShippingInfo";
import CheckoutCardInfo from "../../components/Checkout/CheckoutCardInfo";
import CheckOrderTotal, {
  CHECK_OUT_TOTAL_STATUSES
} from "../../components/Checkout/CheckOrderTotal";
import CheckoutItems from "../../components/Checkout/CheckoutItems";
import isEmpty from "../../../validation/is-empty";

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
        : this.props.profile.profile.address
    };
    this.onSubmitOrder = this.onSubmitOrder.bind(this);
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
        console.log(newOrder);
        this.props.placeOrder(newOrder);
        break;
      default:
        break;
    }
  };
  // componentWillReceiveProps(nextProps) {
  //   //console.log(nextProps);
  //   let total = 0;
  //   let items = [];
  //   let index = 0;
  //   let pm = {};

  //   if (!isEmpty(nextProps.cart.cart.items)) {
  //     nextProps.cart.cart.items.forEach(item => {
  //       total += item.quantity * item.productId.price;
  //       items[index] = { itemId: item.productId._id, quantity: item.quantity };
  //       index++;
  //     });
  //     total = total + total * 0.12;
  //     this.setState({ orderdetail: { total: total, items: items } });
  //   }
  //   if (!isEmpty(nextProps.profile.profile.payment)) {
  //     pm = nextProps.profile.profile.payment.shift();
  //     console.log(pm);

  //     this.setState({
  //       paymentmethod: pm
  //     });
  //   }
  //   if (!isEmpty(nextProps.profile.profile.address)) {
  //     this.setState({ shippingaddress: this.props.profile.profile.address });
  //   }
  // }

  // componentDidMount() {
  //   this.props.loadProfile();
  //   // this.props.getCart();
  // }
  onSubmitOrder() {
    const orderData = {
      orderdetail: this.state.orderdetail,
      shippingAddress: this.state.shippingAddress,
      paymentMethod: this.state.paymentMethod
    };
    console.log(orderData);
    this.props.placeOrder(orderData);
  }
  render() {
    const { user, profile, currentOrder } = this.props;
    if (!user) {
      return <Redirect to="/" />;
    }
    const address = profile.get("address");
    const payments = profile.get("payments");

    const foods = currentOrder.get("foods");
    const it = this.state.orderdetail;

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
    if (profile === null || address === null) {
    } else {
      showContent = (
        <div className="container">
          <div className="heading">
            <h3>Review Your Order</h3>
          </div>
          <div className="row">
            <div className="col-8 order_details">
              <div className="chose_area">
                <div className="row">
                  <CheckShippingInfo user={user} address={address} />
                  {paymentContent}
                </div>
              </div>
              <div className="chose_area">
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
    return <div className="checkout">{showContent}</div>;
  }
}
Checkout.propTypes = {
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
    { loadProfile, placeOrder }
  )(withLayout(Checkout))
);
