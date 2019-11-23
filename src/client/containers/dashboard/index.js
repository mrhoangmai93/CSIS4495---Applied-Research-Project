import React, { useState, Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import withLayout from "../../hocs/front/Layout";
import withAuth from "../../hocs/withAuth";
import { Tabs } from "@yazanaabed/react-tabs";
import {
  loadSellerFood,
  createFood,
  updateFood
} from "../../redux/actions/seller/sellerProfile.action";
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
import { loadAllSellerOrders } from "../../redux/actions/order.action";
import { setAlert } from "../../redux/actions/alert.action";
import PendingOrder, {
  PENDING_ORDER_STATUSES
} from "../../components/Dashboard/PendingOrder";
import {
  sellerCompleteOrder,
  sellerCancelOrder
} from "../../redux/actions/order.action";

import ModalDefault, {
  MODAL_STATUSES
} from "../../components/utilities/ModalDefault";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.location.activeTab
        ? this.props.location.activeTab
        : "pendingOrders",
      modalShow: false,
      modalHeading: "",
      modalBody: "",
      modalType: "",
      orderData: {},
      positiveButton: ""
    };
    //this.props.loadCart();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    if (!this.props.foods || this.props.foods.size === 0) {
      this.props.loadSellerFood();
    }
    if (!this.props.pendingOrders || this.props.pendingOrders.size === 0) {
      this.props.loadAllSellerOrders();
    }
  }
  callbackHandler = (type, data) => {
    switch (type) {
      case FOOD_ITEM_STATUSES.SWITCH_CHANGE:
        this.props.updateFood(data);
        break;
      case PENDING_ORDER_STATUSES.COMPLETE_ORDER:
        this.handleShow({
          modalHeading: "Complete Order",
          modalBody: "Do you want to complete this order?",
          data,
          modalType: "complete",
          positiveButton: "Complete Order"
        });
        break;
      case PENDING_ORDER_STATUSES.CANCEL_ORDER:
        this.handleShow({
          modalHeading: "Cancel Order",
          modalBody: "Do you want to cancel this order?",
          data,
          modalType: "cancel",
          positiveButton: "Cancel Order"
        });
        break;
      case MODAL_STATUSES.COMPLETE:
        if (data === "complete") {
          this.props.sellerCompleteOrder(this.state.orderData);
          window.location.reload();
        } else if (data === "cancel") {
        }

      case MODAL_STATUSES.CLOSE:
        this.handleClose();
        break;
      default:
        break;
    }
  };
  handleShow = ({
    modalHeading,
    modalBody,
    data,
    modalType,
    positiveButton
  }) => {
    this.setState({
      modalShow: true,
      modalBody,
      modalHeading,
      modalType,
      orderData: data,
      positiveButton
    });
  };
  handleClose = () => {
    this.setState({ modalShow: false });
  };
  render() {
    const { foods, pendingOrders, completedOrders } = this.props;
    console.log("cp", completedOrders);
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    let totalPending = 0;
    let totalOrder = 0;
    let totalEarn = 0;

    let pendingOrdersContent;
    let inventory;
    if (!isEmpty(foods)) {
      inventory = foods.map((food, index) => (
        <div key={"food-" + index} className="table-responsive cart_info">
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
    if (!isEmpty(pendingOrders)) {
      totalPending = pendingOrders.length;
      pendingOrdersContent = pendingOrders.map(order => (
        <div key={"pending" + order._id} className="table-responsive cart_info">
          <PendingOrder
            shippingAddress={order.shippingAddress}
            foods={order.orderDetails.foods}
            user={order.user}
            id={order._id}
            callbackHandler={this.callbackHandler}
          />
        </div>
      ));
    } else {
      pendingOrdersContent = (
        <div>
          <h4>You have no pending order</h4>
        </div>
      );
    }
    let completedContent = completedOrders ? (
      completedOrders.map(order => {
        const thisEarn = order.orderDetails.foods
          .map(f => f.foodId.price * f.quantity)
          .reduce((a, b) => a + b, 0);
        totalEarn = totalEarn + thisEarn;
        return (
          <div
            key={"complete" + order._id}
            className="table-responsive cart_info"
          >
            <PendingOrder
              shippingAddress={order.shippingAddress}
              foods={order.orderDetails.foods}
              user={order.user}
              id={order._id}
              thisEarn={thisEarn}
            />
          </div>
        );
      })
    ) : (
      <div>
        <h4>You have no Completed order</h4>
      </div>
    );
    if (completedOrders && pendingOrders) {
      totalOrder = completedOrders.length + pendingOrders.length;
    }

    return (
      <section className="cart-section">
        <div className="container">
          <Alert />
          <ModalDefault
            heading={this.state.modalHeading}
            show={this.state.modalShow}
            body={this.state.modalBody}
            callbackHandler={this.callbackHandler}
            type={this.state.modalType}
            positiveButton={this.state.positiveButton}
          />
          <div className="row">
            <div className="col-12 col-lg-8 ">
              <div className="dashboard_tab">
                <Tabs
                  activeTab={{
                    id: this.state.activeTab
                  }}
                >
                  <Tabs.Tab id="pendingOrders" title="Pending Orders">
                    <div style={{ padding: 10 }}>{pendingOrdersContent}</div>
                  </Tabs.Tab>
                  <Tabs.Tab id="completedOrders" title="Completed Orders">
                    <div style={{ padding: 10 }}>{completedContent}</div>
                  </Tabs.Tab>
                  <Tabs.Tab id="inventory" title="Inventory">
                    <div style={{ padding: 10 }}>{inventory}</div>
                  </Tabs.Tab>
                </Tabs>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="dashboard_summary">
                <SellerSummary
                  totalPending={totalPending}
                  totalEarn={totalEarn}
                  totalOrder={totalOrder}
                />
              </div>
              <div>
                <Link to={"/seller/createfood"}>
                  <ButtonDefault>Create new Food</ButtonDefault>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  loadAllSellerOrders: PropTypes.func.isRequired,
  sellerCompleteOrder: PropTypes.func.isRequired,
  sellerCancelOrder: PropTypes.func.isRequired,
  loadSellerFood: PropTypes.func.isRequired,
  createFood: PropTypes.func.isRequired,
  updateFood: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  foods: state.sellerProfile.get("foodList"),
  pendingOrders: state.sellerProfile.getIn(["orders", "pendingOrders"]),
  completedOrders: state.sellerProfile.getIn(["orders", "completedOrders"])
});

export default withRouter(
  connect(mapStateToProps, {
    loadSellerFood,
    createFood,
    updateFood,
    loadAllSellerOrders,
    sellerCompleteOrder,
    sellerCancelOrder
  })(withAuth(withLayout(Dashboard)))
);
