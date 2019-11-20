import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.scss";
import ButtonDefault from "../../utilities/buttons/ButtonDefault";
const CART_SUMMARY_STATUSES = {
  CHECK_OUT: "CHECK_OUT"
};
const SellerSummary = props => {
  return (
    <div>
      <h5>Quick Summary</h5>
      <hr />
      <div className="row">
        <div className="col-6">
          <div className="quick_summary_card pending_order">
            <div>
              <div className="pull-left">Pending Order</div>
            </div>
            <div>
              <span className="pull-right ">{props.totalPending}</span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="quick_summary_card total_order">
            <div>
              <div className="pull-left">Total orders:</div>
            </div>
            <div>
              <span className="pull-right">{props.totalOrder}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="quick_summary_card total_earn">
            <div>
              <div className="pull-left">Total earn:</div>
            </div>
            <div>
              <span className="pull-right ">${props.totalEarn}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
SellerSummary.propTypes = {};
export default SellerSummary;
export { CART_SUMMARY_STATUSES };
