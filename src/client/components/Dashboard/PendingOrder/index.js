import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AddressComponent from "../AddressComponent";
import PendingFoodItem from "../PendingFoodItem";
import ButtonDefault from "../../utilities/buttons/RippleButton";
import "./index.scss";
import { Button } from "react-bootstrap";
const PENDING_ORDER_STATUSES = {
  COMPLETE_ORDER: "COMPLETE_ORDER",
  CANCEL_ORDER: "CANCEL_ORDER"
};
const PendingOrder = props => {
  const { shippingAddress, foods, user, id } = props;
  let lastColumn = props.callbackHandler ? (
    <div className="col-1">
      <div className="complete_order">
        <button
          onClick={() =>
            props.callbackHandler(PENDING_ORDER_STATUSES.COMPLETE_ORDER, id)
          }
          type="button"
          className="btn btn-default btn-success"
        >
          <i className="fas fa-check"></i>
        </button>
        <button
          onClick={() =>
            props.callbackHandler(PENDING_ORDER_STATUSES.CANCEL_ORDER, id)
          }
          type="button"
          className="btn btn-default btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  ) : (
    <div className="col-2">
      <div className="complete_order">Earn: ${props.thisEarn}</div>
    </div>
  );
  return (
    <div className="pending_order_item">
      <div className="row">
        <div className="col-5">
          <h5>{user.name}</h5>
          <AddressComponent address={shippingAddress} />
        </div>
        <div className="col-5">
          {foods.map(f => (
            <PendingFoodItem food={f} />
          ))}
        </div>
        {lastColumn}
      </div>
    </div>
  );
};

export default PendingOrder;
export { PENDING_ORDER_STATUSES };
