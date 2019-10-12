import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PaymentCard from "./PaymentCard";

class PaymentContent extends Component {
  render() {
    const { payments } = this.props;
    let content;
    content = payments.map(payment => (
      <tr>
        <td>
          <PaymentCard
            payment={payment}
            deletePayment={this.props.deletePayment}
          />
        </td>
      </tr>
    ));
    return (
      <div>
        <h5 className="display-5 text-center">Your Payment</h5>
        <table className="table table-hover ">{content}</table>
        <div className="btn-group mb-4" role="group">
          <Link to="edit-payment">
            <button className="btn btn-default">Add payment</button>
          </Link>
        </div>
      </div>
    );
  }
}
PaymentContent.propTypes = {
  deletePayment: PropTypes.func.isRequired,
  payments: PropTypes.object.isRequired
};
export default PaymentContent;
