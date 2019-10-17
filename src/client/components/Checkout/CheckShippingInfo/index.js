import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.scss";
const CheckShippingInfo = props => {
  const { user, address } = props;
  return (
    <div className="col-sm-6">
      <h6>Shipping Address:</h6>
      <Link to="/">
        <small>Change</small>
      </Link>
      <ul className="user_option">
        <li>
          <label>{user.name}</label>
        </li>
        <li>
          <small>
            <label>{address.address1}</label>
          </small>
        </li>
        <li>
          <small>
            <label>{address.city}</label>
          </small>
        </li>
        <li>
          <small>
            <label>
              {address.state},{address.zip}
            </label>
          </small>
        </li>
      </ul>
    </div>
  );
};
CheckShippingInfo.propTypes = {
  user: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired
};
export default CheckShippingInfo;
