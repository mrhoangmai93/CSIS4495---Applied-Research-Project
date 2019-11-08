import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
//import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLayout from "../../hocs/front/Layout";
import withAuth from "../../hocs/withAuth";

import {
  loadProfile,
  editAddress
} from "../../redux/actions/userProfile.action";
import { placeOrder } from "../../redux/actions/currentOrder.action";
import { clearCart } from "../../redux/actions/cart.action";
import { editPayment } from "../../redux/actions/userProfile.action";
import CheckShippingInfo from "../../components/Checkout/CheckShippingInfo";
import CheckoutCardInfo from "../../components/Checkout/CheckoutCardInfo";
import CheckOrderTotal, {
  CHECK_OUT_TOTAL_STATUSES
} from "../../components/Checkout/CheckOrderTotal";

import CheckoutItems from "../../components/Checkout/CheckoutItems";
import Spinner from "../../components/utilities/Spinner";
import isEmpty from "../../../validation/is-empty";
import ButtonDefault from "../../components/utilities/buttons/ButtonDefault";
import AddressForm from "../../components/Form/AddressForm";
import "./index.scss";
import { Alert } from "react-bootstrap";
import PaymentForm from "../../components/Form/PaymentForm";
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.props.loadProfile();

    this.state = {
      orderdetail: {
        items: [],
        total: ""
      },
      paymentMethod: isEmpty(this.props.userProfile.profile)
        ? {}
        : this.props.userProfile.profile.payment.shift(),
      shippingAddress: isEmpty(this.props.userProfile.profile)
        ? {}
        : this.props.userProfile.profile.address,
      orderStatus: this.props.currentOrder.get("orderStatus"),
      month: "01",
      year: "2019"
    };
    this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }
  callbackHandler = (type, data) => {
    switch (type) {
      case CHECK_OUT_TOTAL_STATUSES.PLACE_ORDER:
        const paymentMethod = this.props.userProfile.get("payments")[0];
        const shippingAddress = this.props.userProfile.get("address");
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
    console.log(nextProps);
    this.setState({ orderStatus: nextProps.currentOrder.get("orderStatus") });
  }
  onSubmit(form, e) {
    e.preventDefault();
    if (form === "address") {
      const profileData = {
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        zipCode: this.state.zipCode,
        state: this.state.state,
        phone: this.state.phone
      };
      this.props.editAddress(profileData);
    } else if (form === "payment") {
      const paymentData = {
        cardNumber: this.state.cardNumber,
        nameOnCard: this.state.nameOnCard,
        expireDate: this.state.month + "/" + this.state.year,
        securityNumber: this.state.securityNumber
      };
      if (this.state.cardNumber.length !== 16) {
        this.props.setAlert({
          msg: "This is not a credit card",
          alertType: "danger"
        });
      } else {
        this.props.editPayment(paymentData);
      }
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { user, userProfile, currentOrder } = this.props;
    let orderStatus = this.state.orderStatus;
    // create vairalbes for contents
    let showContent;
    let paymentContent;
    let itemContent;

    //get data from props
    const address = userProfile.get("address");
    const payments = userProfile.get("payments");
    const foods = currentOrder.get("foods");
    const loading = userProfile.get("loading");

    if (!user || !foods || isEmpty(foods)) {
      return <Redirect to="/" />;
    }

    if (loading || !userProfile) {
      showContent = <Spinner />;
    } else if (isEmpty(address)) {
      showContent = (
        <div className="row">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            <h3>Enter Shipping Information</h3>
            <form onSubmit={this.onSubmit.bind(this, "address")}>
              <AddressForm data={this.state} onChange={this.onChange} />
              <ButtonDefault>Next</ButtonDefault>
            </form>
          </div>
        </div>
      );
    } else if (isEmpty(payments)) {
      showContent = (
        <div className="row">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            <h3>Enter Payment Information</h3>
            <form onSubmit={this.onSubmit.bind(this, "payment")}>
              <PaymentForm data={this.state} onChange={this.onChange} />
              <ButtonDefault>Next</ButtonDefault>
            </form>
          </div>
        </div>
      );
    } else {
      itemContent = foods.map(item => (
        <CheckoutItems
          key={item._id}
          food={item.foodId}
          quantity={item.quantity}
        />
      ));
      paymentContent = <CheckoutCardInfo payments={payments} />;
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

    return (
      <div className="checkout">
        <div className="container">
          <Alert />
          {showContent}
        </div>
      </div>
    );
  }
}
Checkout.propTypes = {
  editPayment: PropTypes.func.isRequired,
  editAddress: PropTypes.func.isRequired,
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
  userProfile: state.userProfile
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadProfile, placeOrder, clearCart, editAddress, editPayment }
  )(withAuth(withLayout(Checkout)))
);
