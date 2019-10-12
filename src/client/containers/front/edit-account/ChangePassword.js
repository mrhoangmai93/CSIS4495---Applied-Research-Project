import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { changePassword } from "../../actions/authActions";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.response.data });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const passwordData = {
      oldPassword: this.state.oldPassword,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.changePassword(passwordData, this.props.history);
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
                <h5 className="display-5 text-center">Change Your Password</h5>

                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Old Password"
                      type="password"
                      name="oldPassword"
                      value={this.state.oldPassword}
                      onChange={this.onChange}
                      error={errors.oldPassword}
                      info="Enter your current password"
                    />
                  </div>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="New Password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                      info="Enter your new password"
                    />
                  </div>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Confirm Password"
                      type="password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                      info="Confirm your new password"
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

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { changePassword }
)(withRouter(ChangePassword));
