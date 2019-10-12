import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { editPayment } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardnumber: this.props.location.payment
        ? this.props.location.payment.cardnumber
        : "",
      nameoncard: this.props.location.payment
        ? this.props.location.payment.nameoncard
        : "",
      security: this.props.location.payment
        ? this.props.location.payment.security
        : "",
      expiredate: this.props.location.payment
        ? this.props.location.payment.expiredate
        : "",
      month: this.props.location.payment
        ? this.props.location.payment.expiredate.split("/")[0]
        : "",
      year: this.props.location.payment
        ? this.props.location.payment.expiredate.split("/")[1]
        : "",
      _id: this.props.location.payment ? this.props.location.payment._id : "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile.payment) {
      const payment = nextProps.profile.profile.payment;

      // If profile field doesnt exist, make empty string
      payment.cardnumber = !isEmpty(payment.cardnumber)
        ? payment.cardnumber
        : "";
      payment.nameoncard = !isEmpty(payment.nameoncard)
        ? payment.nameoncard
        : "";
      payment.expiredate = !isEmpty(payment.expiredate)
        ? payment.expiredate
        : "";
      payment.month = !isEmpty(payment.month) ? payment.month : "";
      payment.year = !isEmpty(payment.year) ? payment.year : "";
      payment.security = !isEmpty(payment.security) ? payment.security : "";

      // Set component fields state
      this.setState({
        cardnumber: payment.cardnumber,
        nameoncard: payment.nameoncard,
        month: payment.expiredate.split("/")[0],
        year: payment.expiredate.split("/")[1],
        expiredate: payment.expiredate,
        security: payment.security
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const paymentData = {
      _id: this.state._id,
      cardnumber: this.state.cardnumber,
      nameoncard: this.state.nameoncard,
      expiredate: this.state.month + "/" + this.state.year,
      security: this.state.security
    };

    this.props.editPayment(paymentData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const options1 = [
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
    const options2 = [
      { label: "2018", value: "2018" },
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
      { label: "2029", value: "2029" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-9">
              <div className="signup-form">
                <Link to="/account">
                  <button className="btn btn-default">Go Back</button>
                </Link>
                <h5 className="display-5 text-center">Edit/Add Payment</h5>

                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Card Number"
                      name="cardnumber"
                      value={this.state.cardnumber}
                      onChange={this.onChange}
                      error={errors.cardnumber}
                    />
                  </div>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Name On Card"
                      name="nameoncard"
                      value={this.state.nameoncard}
                      onChange={this.onChange}
                      error={errors.nameoncard}
                      info="Name as it appears on your card"
                    />
                  </div>

                  <div className="row">
                    <SelectListGroup
                      placeholder="Month"
                      name="month"
                      value={this.state.month}
                      onChange={this.onChange}
                      options={options1}
                      error={errors.month}
                      info="Month"
                    />
                    <SelectListGroup
                      placeholder="Year"
                      name="year"
                      value={this.state.year}
                      onChange={this.onChange}
                      options={options2}
                      error={errors.year}
                      info="Year"
                    />
                  </div>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Security"
                      name="security"
                      value={this.state.security}
                      onChange={this.onChange}
                      error={errors.security}
                      info="Digits on the back of your card"
                    />
                  </div>
                  <div className="row">
                    <button type="submit" className="btn btn-default">
                      Submit
                    </button>
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
  editPayment: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editPayment }
)(withRouter(EditPayment));
