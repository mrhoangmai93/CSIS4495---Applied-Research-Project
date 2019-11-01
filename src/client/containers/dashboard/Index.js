import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import withLayout from "../../hocs/front/Layout";
import withAuth from "../../hocs/withAuth";
import { Tabs } from "@yazanaabed/react-tabs";
import { loadSellerFood } from "../../redux/actions/seller/sellerProfile.action";
import { createOrder } from "../../redux/actions/currentOrder.action";
import "./index.scss";

import SellerSummary, {
  CART_SUMMARY_STATUSES
} from "../../components/Dashboard/SellerSummary";
import isEmpty from "../../../validation/is-empty";

import FoodItem, {
  FOOD_ITEM_STATUSES
} from "../../components/Dashboard/FoodItem";
import ButtonDefault from "../../components/utilities/buttons/ButtonDefault";
import Alert from "../../components/utilities/Alert";
import { setAlert } from "../../redux/actions/alert.action";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   foods: this.props.foods,
    //   cart: this.props.cart
    // };
    //this.props.loadCart();
  }
  componentDidMount() {
    if (!this.props.foods.size > 0) {
      this.props.loadSellerFood();
    }
  }
  callbackHandler = (type, data) => {
    switch (type) {
      case FOOD_ITEM_STATUSES.SWITCH_CHANGE:
        let newQuantity;
        if (data.qty === "") {
          newQuantity = 0;
        } else {
          newQuantity = parseInt(data.qty);
        }
        this.props.updateCart({ foodId: data.itemId, quantity: newQuantity });
        break;
      //   case FOOD_ITEM_STATUSES.DELETE_ITEM:
      //     this.props.deleteFromCart({ foodId: data.itemId });
      //     break;
      //   case CART_SUMMARY_STATUSES.CHECK_OUT:
      //     if (!isEmpty(this.props.foods)) {
      //       this.props.createOrder({
      //         foods: this.props.foods,
      //         orderSummary: data.orderSummary
      //       });
      //       return <Redirect to="/checkout" />;
      //     } else {
      //       this.props.setAlert({
      //         msg: "Cart is Empty!",
      //         alertType: "danger"
      //       });
      //     }

      // break;
      default:
        break;
    }
  };
  render() {
    const { foods } = this.props;
    let pendingOrders;
    let inventory;
    if (!isEmpty(foods)) {
      inventory = foods.map(food => (
        <div className="table-responsive cart_info">
          <FoodItem food={food} callbackHandler={this.callbackHandler} />
        </div>
      ));
    } else {
      inventory = (
        <div>
          <h4>You have no inventory</h4>
        </div>
      );
    }
    // let subTotal = cart.get("subTotal");
    if (!isEmpty(foods)) {
      pendingOrders = (
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <tbody>
              {foods.map(item => {
                return (
                  <FoodItem
                  // key={item._id}
                  // item={item.foodId}
                  // quantity={item.quantity}
                  // callbackHandler={this.callbackHandler}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      pendingOrders = <h4>No products found...</h4>;
    }

    return (
      <section className="cart-section">
        <div className="container">
          <Alert />
          <div className="row">
            <div className="col-12 col-lg-8 ">
              <div className="dashboard_tab">
                <Tabs
                  activeTab={{
                    id: "pendingOrders"
                  }}
                >
                  <Tabs.Tab id="pendingOrders" title="Pending Orders">
                    <div style={{ padding: 10 }}>This is Pending Orders</div>
                  </Tabs.Tab>
                  <Tabs.Tab id="completedOrders" title="Completed Orders">
                    <div style={{ padding: 10 }}>This is Completed Orders</div>
                  </Tabs.Tab>
                  <Tabs.Tab id="inventory" title="Inventory">
                    <div style={{ padding: 10 }}>{inventory}</div>
                  </Tabs.Tab>
                </Tabs>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="dashboard_summary">
                <SellerSummary />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  loadSellerFood: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  foods: state.sellerProfile.get("foodList")
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadSellerFood }
  )(withAuth(withLayout(Dashboard)))
);
