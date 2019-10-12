import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import classnames from "classnames";
import withLayout from "../../hocs/front/Layout";

import { loadProfile } from "../../redux/actions/userProfile.action";
import AddressContent from "../../components/UserProfile/AddressContent";
//import { getOrder } from "../../actions/orderActions";
import OrderContent from "../../components/UserProfile/OrderContent";
import PaymentContent from "../../components/UserProfile/PaymentContent";
import SettingContent from "../../components/UserProfile/SettingContent";
import isEmpty from "../../../validation/is-empty";
import ButtonWithOnClick from "../../components/utilities/buttons/ButtonWithOnclick";

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

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    // this.props.getProfile();
    // this.props.getOrder();
  }

  render() {
    const { auth } = this.props;
    const { profile } = this.props;
    const address = profile.get("address");
    const user = profile.get("user");
    const payments = profile.get("payments");

    console.log(profile);
    //const profile = {};
    const orders = {};

    const loading = false;
    //console.log(orders);
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
    //console.log(auth);
    if (displayAddress) {
      if (!isEmpty(address)) {
        addressContent = <AddressContent address={profile.address} />;
      } else {
        addressContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              You have not yet setup your address, please add some information!
            </p>
            <Link to="edit-address">
              <ButtonWithOnClick className="btn btn-default">
                Create Address
              </ButtonWithOnClick>
            </Link>
          </div>
        );
      }
    }
    if (displayOrder) {
      if (!isEmpty(orders.orders)) {
        orderContent = <OrderContent orders={orders.orders} />;
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
            deletePayment={this.props.deletePayment}
          />
        );
      } else {
        paymentContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              You have not yet setup your Payments, please add some information
            </p>
            <Link to="edit-payment">
              <ButtonWithOnClick className="btn btn-default">
                Create Payment
              </ButtonWithOnClick>
            </Link>
          </div>
        );
      }
    }

    securityContent = displaySecurity ? <SettingContent auth={user} /> : "";

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
            <div className="col-3" />
            <div className="col-9">
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
  //   getOrder: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.userProfile,
  orders: state.orders
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadProfile }
  )(withLayout(UserProfile))
);
