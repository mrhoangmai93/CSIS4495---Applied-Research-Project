import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import "./index.scss";
import ButtonWithOnclick from "../../../components/utilities/buttons/ButtonWithOnclick";

const CartSummary = props => {
  const { subTotal } = props;
  const tax = (subTotal * 0.15).toFixed(2);
  const total = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);
  return (
    <div>
      <h4>Cart Summary</h4>
      <hr />
      <div className="row">
        <div className="col-8">Order Sub Total:</div>
        <div className="col-4">${subTotal}</div>
      </div>
      <div className="row">
        <div className="col-8">Tax:</div>
        <div className="col-4">${tax}</div>
      </div>
      <hr />
      <div className="row">
        <div className="col-8">
          <b>Total:</b>
        </div>
        <div className="col-4">
          <b>${total}</b>
        </div>
      </div>
      <div className="button_checkout center-block">
        <Link to="/checkout">
          <ButtonWithOnclick className="float-right">
            Check out
          </ButtonWithOnclick>
        </Link>
      </div>
    </div>
  );
};
CartSummary.propTypes = {
  subTotal: PropTypes.number.isRequired,
  toCheckout: PropTypes.func.isRequired
};
export default CartSummary;
