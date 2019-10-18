import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import isEmpty from "../../../../validation/is-empty";
import "./index.scss";

const CheckCardInfo = props => {
  const payments = !isEmpty(props.payments) ? props.payments : [];
  console.log(props.payments);
  return (
    <div>
      <h6>Payment Method</h6>
      <Link to="/">
        <small>Change</small>
      </Link>
      <ul className="user_option">
        <li>
          <label>
            Card ending in: ***
            {payments[0].cardNumber.substr(-4)}
          </label>
        </li>
      </ul>
    </div>
  );
};
CheckCardInfo.propTypes = {
  payment: PropTypes.array.isRequired
};
export default CheckCardInfo;
