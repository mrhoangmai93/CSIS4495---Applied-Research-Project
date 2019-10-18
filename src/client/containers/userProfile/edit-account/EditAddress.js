import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import InputWithHintEffect from "../../../components/utilities/inputs/InputWithHintEffect";
import {
  loadProfile,
  editAddress
} from "../../../redux/actions/userProfile.action";
import isEmpty from "../../../../validation/is-empty";
import ButtonDefault from "../../../components/utilities/buttons/ButtonDefault";
import withLayout from "../../../hocs/front/Layout";
import withAuth from "../../../hocs/withAuth";

class EditAddress extends Component {
  constructor(props) {
    super(props);
    const { address, phone } = this.props.location;

    this.state = {
      address1: address ? address.address1 : "",
      address2: address ? address.address2 : "",
      city: address ? address.city : "",
      zipCode: address ? address.zipCode : "",
      state: address ? address.state : "",
      phone: phone ? phone : ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      zipCode: this.state.zipCode,
      state: this.state.state,
      phone: this.state.phone
    };
    this.props.editAddress(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="edit-address">
        <div className="container">
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-6">
              <div className="signup-form">
                <Link to="/account">
                  <button className="btn btn-default">Go Back</button>
                </Link>
                <h5 className="display-5 text-center">Edit Address</h5>
                <small className="d-block pb-3 text-danger">
                  * = required fields
                </small>
                <form onSubmit={this.onSubmit}>
                  <InputWithHintEffect
                    placeholder="* Address"
                    name="address1"
                    value={this.state.address1}
                    onChange={this.onChange}
                  />
                  <InputWithHintEffect
                    placeholder="Address 2"
                    name="address2"
                    value={this.state.address2}
                    onChange={this.onChange}
                  />
                  <InputWithHintEffect
                    placeholder="* City"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChange}
                  />
                  <InputWithHintEffect
                    placeholder="* Zip Code"
                    name="zipCode"
                    value={this.state.zipCode}
                    onChange={this.onChange}
                  />
                  <InputWithHintEffect
                    placeholder="* State"
                    name="state"
                    value={this.state.state}
                    onChange={this.onChange}
                  />
                  <InputWithHintEffect
                    placeholder="* Phone Number"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  <ButtonDefault>Submit</ButtonDefault>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditAddress.propTypes = {
  editAddress: PropTypes.func.isRequired
};

export default connect(
  null,
  { loadProfile, editAddress }
)(withAuth(withLayout(EditAddress)));
