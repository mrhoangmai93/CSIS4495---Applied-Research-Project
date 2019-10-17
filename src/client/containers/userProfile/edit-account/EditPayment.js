import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import InputWithHintEffect from "../../../components/utilities/inputs/InputWithHintEffect";
import SelectList from "../../../components/utilities/SelectList";
import ButtonDefault from "../../../components/utilities/buttons/ButtonDefault";
import withLayout from "../../../hocs/front/Layout";
import withAuth from "../../../hocs/withAuth";
import { editPayment } from "../../../redux/actions/userProfile.action";
import { setAlert } from "../../../redux/actions/alert.action";

import isEmpty from "../../../../validation/is-empty";
import Alert from "../../../components/utilities/Alert";

class EditPayment extends Component {
  constructor(props) {
    super(props);
    const { payment } = this.props.location;
    this.state = {
      cardNumber: payment ? payment.cardNumber : "",
      nameOnCard: payment ? payment.nameOnCard : "",
      securityNumber: "",
      expireDate: payment ? payment.expireDate : "",
      month: payment ? payment.expireDate.split("/")[0] : "01",
      year: payment ? payment.expireDate.split("/")[1] : "2019",
      _id: payment ? payment._id : ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  //   if (nextProps.profile.profile.payment) {
  //     const payment = nextProps.profile.profile.payment;

  //     // If profile field doesnt exist, make empty string
  //     payment.cardNumber = !isEmpty(payment.cardNumber)
  //       ? payment.cardNumber
  //       : "";
  //     payment.nameOnCard = !isEmpty(payment.nameOnCard)
  //       ? payment.nameOnCard
  //       : "";
  //     payment.expireDate = !isEmpty(payment.expireDate)
  //       ? payment.expireDate
  //       : "";
  //     payment.month = !isEmpty(payment.month) ? payment.month : "";
  //     payment.year = !isEmpty(payment.year) ? payment.year : "";
  //     payment.securityNumber = !isEmpty(payment.securityNumber)
  //       ? payment.securityNumber
  //       : "";

  //     // Set component fields state
  //     this.setState({
  //       cardNumber: payment.cardNumber,
  //       nameOnCard: payment.nameOnCard,
  //       month: payment.expireDate.split("/")[0],
  //       year: payment.expireDate.split("/")[1],
  //       expireDate: payment.expireDate,
  //       securityNumber: payment.securityNumber
  //     });
  //   }
  // }

  onSubmit(e) {
    e.preventDefault();

    const paymentData = {
      _id: this.state._id,
      cardNumber: this.state.cardNumber,
      nameOnCard: this.state.nameOnCard,
      expireDate: this.state.month + "/" + this.state.year,
      securityNumber: this.state.securityNumber
    };
    if (this.state.cardNumber.length !== 16) {
      this.props.setAlert({
        msg: "This is not a credit card",
        alertType: "danger"
      });
    } else {
      this.props.editPayment(paymentData, this.props.history);
    }
  }

  onChange(e) {
    if (
      !(e.target.name === "cardNumber" || e.target.name === "securityNumber")
    ) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      if (!isNaN(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      } else {
        this.setState({ [e.target.name]: "" });
      }
    }
  }

  render() {
    const months = [
      { label: "01", value: "01" },
      { label: "02", value: "02" },
      { label: "03", value: "03" },
      { label: "04", value: "04" },
      { label: "05", value: "05" },
      { label: "06", value: "06" },
      { label: "07", value: "07" },
      { label: "08", value: "08" },
      { label: "09", value: "09" },
      { label: "10", value: "10" },
      { label: "11", value: "11" },
      { label: "12", value: "12" }
    ];
    const years = [
      { label: "2019", value: "2019" },
      { label: "2020", value: "2020" },
      { label: "2021", value: "2021" },
      { label: "2022", value: "2022" },
      { label: "2023", value: "2023" },
      { label: "2024", value: "2024" },
      { label: "2025", value: "2025" },
      { label: "2026", value: "2026" },
      { label: "2027", value: "2027" },
      { label: "2028", value: "2028" },
      { label: "2029", value: "2029" },
      { label: "2030", value: "2030" }
    ];
    return (
      <div className="edit-payment">
        <div className="container">
          <Alert />

          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-6">
              <div className="signup-form">
                <Link to="/account">
                  <ButtonDefault>Go Back</ButtonDefault>
                </Link>
                <h5 className="display-5 text-center">Edit/Add Payment</h5>

                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <InputWithHintEffect
                        placeholder="Card Number"
                        name="cardNumber"
                        value={this.state.cardNumber}
                        onChange={this.onChange}
                        //onFocus={() => this.setState({ cardNumber: "" })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <InputWithHintEffect
                        placeholder="Name On Card"
                        name="nameOnCard"
                        value={this.state.nameOnCard}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <SelectList
                      placeholder="Month"
                      name="month"
                      value={this.state.month}
                      onChange={this.onChange}
                      options={months}
                    />
                    <SelectList
                      placeholder="Year"
                      name="year"
                      value={this.state.year}
                      onChange={this.onChange}
                      options={years}
                    />
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <InputWithHintEffect
                        placeholder="Security Number"
                        name="securityNumber"
                        value={this.state.securityNumber}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <ButtonDefault>Submit</ButtonDefault>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditPayment.propTypes = {
  setAlert: PropTypes.func.isRequired,
  editPayment: PropTypes.func.isRequired
};

export default connect(
  null,
  { editPayment, setAlert }
)(withAuth(withLayout(EditPayment)));
