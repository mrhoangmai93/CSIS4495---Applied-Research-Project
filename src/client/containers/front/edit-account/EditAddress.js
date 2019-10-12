import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import InputWithHintEffect from "../../../components/utilities/inputs/InputWithHintEffect";
import { loadProfile } from "../../../redux/actions/userProfile.action";
import isEmpty from "../../../../validation/is-empty";

class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: "",
      address2: "",
      city: "",
      zip: "",
      state: "",
      phone: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    //console.log(nextProps);
    if (nextProps.profile.profile) {
      const address = nextProps.profile.profile.address;

      // If profile field doesnt exist, make empty string
      address.address1 = !isEmpty(address.address1) ? address.address1 : "";
      address.address2 = !isEmpty(address.address2) ? address.address2 : "";
      address.city = !isEmpty(address.city) ? address.city : "";
      address.zip = !isEmpty(address.zip) ? address.zip : "";
      address.state = !isEmpty(address.state) ? address.state : "";
      address.phone = !isEmpty(address.phone) ? address.phone : "";

      // Set component fields state
      this.setState({
        address1: address.address1,
        address2: address.address2,
        city: address.city,
        zip: address.zip,
        state: address.state,
        phone: address.phone
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      zip: this.state.zip,
      state: this.state.state,
      phone: this.state.phone
    };

    this.props.editAddress(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
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
                    error={errors.address1}
                    info="where do you live"
                  />
                  <InputWithHintEffect
                    placeholder="Address 2"
                    name="address2"
                    value={this.state.address2}
                    onChange={this.onChange}
                    error={errors.address2}
                    info="Apartment, Condo #"
                  />
                  <InputWithHintEffect
                    placeholder="* City"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChange}
                    error={errors.city}
                    info="City  (eg. Vancouver)"
                  />
                  <InputWithHintEffect
                    placeholder="* Zip Code"
                    name="zip"
                    value={this.state.zip}
                    onChange={this.onChange}
                    error={errors.zip}
                    info="Zip Code suggested (eg. V1A1B1)"
                  />
                  <InputWithHintEffect
                    placeholder="* State"
                    name="state"
                    value={this.state.state}
                    onChange={this.onChange}
                    error={errors.state}
                    info="State or Province"
                  />
                  <InputWithHintEffect
                    placeholder="* Phone Number"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <button type="submit" className="btn btn-default">
                    Submit
                  </button>
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
  loadProfile: PropTypes.func.isRequired,
  // editAddress: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loadProfile }
)(withRouter(EditAddress));
