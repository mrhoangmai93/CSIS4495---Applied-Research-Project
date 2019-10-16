import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PaymentCard from "./PaymentCard";
import ButtonDefault from "../../utilities/buttons/ButtonDefault";
class PaymentContent extends Component {
  render() {
    const { payments } = this.props;
    let content;
    content = payments.map(payment => (
      <tr>
        <td>
          <PaymentCard
            payment={payment}
            callbackHandler={this.props.callbackHandler}
          />
        </td>
      </tr>
    ));
    return (
      <div>
        <h5 className="display-5 text-center">Your Payment</h5>
        <table className="table table-hover ">{content}</table>
        <div className="btn-group mb-4" role="group">
          <Link to="/account/edit-payment">
            <ButtonDefault className="btn btn-default">
              Add payment
            </ButtonDefault>
          </Link>
        </div>
      </div>
    );
  }
}
PaymentContent.propTypes = {
  callbackHandler: PropTypes.func.isRequired,
  payments: PropTypes.object.isRequired
};
export default PaymentContent;
