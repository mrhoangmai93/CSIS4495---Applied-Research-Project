import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ButtonDefault from "../../utilities/buttons/ButtonDefault";
import isEmpty from "../../../../validation/is-empty";
import "./index.scss";
const CHECK_OUT_TOTAL_STATUSES = {
  PLACE_ORDER: "PLACE_ORDER"
};

const CheckOrderTotal = props => {
  const { orderSummary } = props;
  return (
    <div className="total_area">
      <h4>Order Summary</h4>
      <hr />
      <div className="row">
        <div className="col-8">Order Sub Total:</div>
        <div className="col-4">${orderSummary.subTotal}</div>
      </div>
      <div className="row">
        <div className="col-8">Tax:</div>
        <div className="col-4">${orderSummary.tax}</div>
      </div>
      <div className="row">
        <div className="col-8">Shipping:</div>
        <div className="col-4">Free</div>
      </div>
      <hr />
      <div className="row total-special">
        <div className="col-8">
          <b>Total:</b>
        </div>
        <div className="col-4">
          <b>${orderSummary.total}</b>
        </div>
      </div>
      <div className="button-checkout">
        <Link to="/checkout">
          <ButtonDefault
            className="btn btn-default check_out"
            onClick={() =>
              props.callbackHandler(CHECK_OUT_TOTAL_STATUSES.PLACE_ORDER)
            }
          >
            Place Order
          </ButtonDefault>
        </Link>
      </div>
    </div>
  );
};
// CheckOrderTotal.propTypes = {
//   onSubmitOrder: PropTypes.func.isRequired,

// };
export default CheckOrderTotal;
export { CHECK_OUT_TOTAL_STATUSES };
