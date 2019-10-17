import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import classnames from "classnames";
import withLayout from "../../hocs/front/Layout";
import withAuth from "../../hocs/withAuth";
import { loadOrders } from "../../redux/actions/order.action";
import {
  loadProfile,
  deletePayment
} from "../../redux/actions/userProfile.action";
import AddressContent from "../../components/UserProfile/AddressContent";
//import { getOrder } from "../../actions/orderActions";
import OrderContent from "../../components/UserProfile/OrderContent";
import PaymentContent from "../../components/UserProfile/PaymentContent";
import SettingContent from "../../components/UserProfile/SettingContent";
import isEmpty from "../../../validation/is-empty";
import ButtonDefault from "../../components/utilities/buttons/ButtonDefault";
import { VIEW_STATUSES } from "../../components/UserProfile/PaymentContent/PaymentCard";
import "./index.scss";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAddress: false,
      displaySecurity: false,
      displayPayment: false,
      displayOrder: false,
      active: true
    };
    this.props.loadProfile();
    this.props.loadOrders();

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    // this.props.getProfile();
    // this.props.getOrder();
  }
  callbackHandler = (type, data) => {
    switch (type) {
      case VIEW_STATUSES.DELETE_CARD:
        this.props.deletePayment({ paymentId: data.paymentId });
        break;
      default:
        break;
    }
  };

  render() {
    const { user } = this.props;
    const { profile } = this.props;
    const address = profile.get("address");
    const payments = profile.get("payments");

    const orders = this.props.orders.get("list");
    console.log(orders);
    console.log(orders, this.props.orders);
    const loading = false;
    const {
      displayAddress,
      displayOrder,
      displayPayment,
      displaySecurity,
      active
    } = this.state;
    let addressContent;
    let orderContent;
    let paymentContent;
    let securityContent;

    if (displayAddress) {
      if (!isEmpty(address)) {
        addressContent = (
          <AddressContent address={address} phone={profile.get("phone")} />
        );
      } else {
        addressContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              You have not yet setup your address, please add some information!
            </p>
            <Link to="/account/edit-address">
              <ButtonDefault className="btn btn-default">
                Create Address
              </ButtonDefault>
            </Link>
          </div>
        );
      }
    }
    if (displayOrder) {
      if (!isEmpty(orders)) {
        orderContent = <OrderContent orders={orders} />;
      } else {
        orderContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You do not have any order</p>
          </div>
        );
      }
    }
    if (displayPayment) {
      if (!isEmpty(payments)) {
        paymentContent = (
          <PaymentContent
            payments={payments}
            callbackHandler={this.callbackHandler}
          />
        );
      } else {
        paymentContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              You have not yet setup your Payments, please add some information
            </p>
            <Link to="/account/edit-payment">
              <ButtonDefault>Create Payment</ButtonDefault>
            </Link>
          </div>
        );
      }
    }

    securityContent = displaySecurity ? <SettingContent user={user} /> : "";

    let profileContent;

    if (profile === null || loading) {
      //profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <h1>My Account</h1>
              </div>
            </div>
            <div className="col-6" />
          </div>
          <div className="row">
            <div className="col-3" />
            <div className="col-3">
              <div
                className={classnames(
                  " account-setting d-flex justify-content-center",
                  {
                    unchoose: !(displayAddress || active)
                  }
                )}
                onClick={() => {
                  this.setState(prevState => ({
                    displayAddress: !prevState.displayAddress,
                    displayOrder: false,
                    displayPayment: false,
                    displaySecurity: false,
                    active: false
                  }));
                }}
              >
                <i className="fas fa-map-marker-alt" />
                &nbsp;My Addresses
              </div>
            </div>
            <div className="col-3">
              <div
                className={classnames(
                  " account-setting d-flex justify-content-center",
                  {
                    unchoose: !(displayOrder || active)
                  }
                )}
                onClick={() => {
                  this.setState(prevState => ({
                    displayAddress: false,
                    displayOrder: !prevState.displayOrder,
                    displayPayment: false,
                    displaySecurity: false,
                    active: false
                  }));
                }}
              >
                <i className="fas fa-cube" />
                &nbsp;My Orders
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3" />
            <div className="col-3">
              <div
                className={classnames(
                  " account-setting d-flex justify-content-center",
                  {
                    unchoose: !(displaySecurity || active)
                  }
                )}
                onClick={() => {
                  this.setState(prevState => ({
                    displayAddress: false,
                    displayOrder: false,
                    displayPayment: false,
                    displaySecurity: !prevState.displaySecurity,
                    active: false
                  }));
                }}
              >
                <i className="fas fa-shield-alt" />
                &nbsp;Login & Security
              </div>
            </div>
            <div className="col-3">
              <div
                className={classnames(
                  " account-setting d-flex justify-content-center",
                  {
                    unchoose: !(displayPayment || active)
                  }
                )}
                onClick={() => {
                  this.setState(prevState => ({
                    displayAddress: false,
                    displayOrder: false,
                    displayPayment: !prevState.displayPayment,
                    displaySecurity: false,
                    active: false
                  }));
                }}
              >
                <i className="far fa-credit-card" />
                &nbsp;Payment Options
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <section className="profile">
        <div className="container">
          <div className="row">
            <div className="col-12">{profileContent}</div>
          </div>
          <div className="row">
            <div className="col-2" />
            <div className="col-8">
              {" "}
              {addressContent}
              {orderContent}
              {paymentContent}
              {securityContent}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

UserProfile.propTypes = {
  loadOrders: PropTypes.func.isRequired,
  deletePayment: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.get("user"),
  profile: state.userProfile,
  orders: state.orders
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadProfile, deletePayment, loadOrders }
  )(withAuth(withLayout(UserProfile)))
);
