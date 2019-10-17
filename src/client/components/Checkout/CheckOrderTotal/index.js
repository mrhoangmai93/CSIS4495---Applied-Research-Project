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
      <strong>Order Summary</strong>
      <ul>
        <li>
          Sub Total <span>${orderSummary.subTotal}</span>
        </li>
        <li>
          Tax <span>${orderSummary.tax}</span>
        </li>
        <li>
          Shipping Cost <span>Free</span>
        </li>
        <li className="total-special">
          Total <span>${orderSummary.total}</span>
        </li>
      </ul>
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
  );
};
// CheckOrderTotal.propTypes = {
//   onSubmitOrder: PropTypes.func.isRequired,

// };
export default CheckOrderTotal;
export { CHECK_OUT_TOTAL_STATUSES };
