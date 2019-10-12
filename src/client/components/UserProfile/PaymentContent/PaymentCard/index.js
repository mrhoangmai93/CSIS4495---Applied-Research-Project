import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PaymentCard = props => {
  const { payment } = props;

  return (
    <div className="payment-card">
      <div className="row">{payment.cardnumber}</div>
      <div className="row">
        <div className="col-md-4" />
        <div className="float-sm-right">
          <small>
            Exp:
            {payment.expiredate}
          </small>
        </div>
      </div>
      <div className="row">{payment.nameoncard}</div>
      <div className="row">
        <Link to={{ pathname: "/edit-payment", payment: payment }}>
          <button className="btn btn-default  edit-card">
            <i className="fas far fa-credit-card mr-1" />
            Edit card
          </button>
        </Link>
        <button
          onClick={() => props.deletePayment(payment._id)}
          className="btn btn-danger mr-1 delete-edit-card edit-card"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  );
};
PaymentCard.propTypes = {
  deletePayment: PropTypes.func.isRequired,
  payment: PropTypes.object.isRequired
};
export default PaymentCard;
