import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.scss";
import visa from "../../../../../images/creditCardLogo/visa.png";
import master from "../../../../../images/creditCardLogo/master.png";
import amex from "../../../../../images/creditCardLogo/amex.png";
import disco from "../../../../../images/creditCardLogo/discovery.jpg";
const VIEW_STATUSES = {
  DELETE_CARD: "DELETE_CARD"
};
const PaymentCard = props => {
  const { payment } = props;
  let imgSource;
  switch (payment.cardNumber[0]) {
    case "4":
      imgSource = visa;
      break;
    case "5":
      imgSource = master;
      break;
    case "3":
      imgSource = amex;
      break;
    case "6":
      imgSource = disco;
      break;
    default:
      imgSource = visa;
  }
  // const cardNumberString = payment.cardNumber
  //   .replace(/(\d{4})/g, "$1 ")
  //   .replace(/(^\s+|\s+$)/, "");
  let cardNumberString = "";
  for (let i in payment.cardNumber) {
    if (i < 12 && i > 0) {
      cardNumberString += "*";
    } else {
      cardNumberString += payment.cardNumber[i];
    }
  }
  payment.cardNumber = cardNumberString;
  return (
    <div className="payment-card">
      <div className="row">
        <div className="col-9" />
        <img src={imgSource} alt="logo" className="payment-logo " />
      </div>
      <div className="row">
        <div className="pull-left">
          <b>{payment.cardNumber}</b>
        </div>
      </div>
      <div className="row">
        <div className="col-8" />
        <div className="float-sm-right">
          <div className="exp-date">
            Exp:
            {payment.expireDate}
          </div>
        </div>
      </div>
      <div className="row">{payment.nameOnCard}</div>
      <div className="row">
        <Link to={{ pathname: "/account/edit-payment", payment }}>
          <button className="btn btn-default  edit-card">
            <i className="fas far fa-credit-card mr-1" />
            Edit card
          </button>
        </Link>
        <button
          onClick={() =>
            props.callbackHandler(VIEW_STATUSES.DELETE_CARD, {
              paymentId: payment._id
            })
          }
          className="btn btn-danger mr-1 delete-edit-card edit-card"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  );
};
PaymentCard.propTypes = {
  callbackHandler: PropTypes.func.isRequired,
  payment: PropTypes.object.isRequired
};
export default PaymentCard;
export { VIEW_STATUSES };
