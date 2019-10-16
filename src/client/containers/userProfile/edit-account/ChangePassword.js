import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import withLayout from "../../../hocs/front/Layout";
import withAuth from "../../../hocs/withAuth";
import InputWithHintEffect from "../../../components/utilities/inputs/InputWithHintEffect";
import { changePassword } from "../../../redux/actions/auth.action";
import ButtonDefault from "../../../components/utilities/buttons/ButtonDefault";
import Alert from "../../../components/utilities/Alert";
import { setAlert } from "../../../redux/actions/alert.action";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      password: "",
      password2: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors.response.data });
  //   }
  // }

  onSubmit(e) {
    e.preventDefault();
    const { password, password2 } = this.state;
    if (password !== password2) {
      this.props.setAlert({
        msg: "Password do not match!",
        alertType: "danger"
      });
    } else {
      const passwordData = {
        oldPassword: this.state.oldPassword,
        password
      };

      this.props.changePassword(passwordData, this.props.history);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="change-password">
        <div className="container">
          <Alert />
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-6">
              <div className="signup-form">
                <Link to="/account">
                  <ButtonDefault className="btn btn-default">
                    Go Back
                  </ButtonDefault>
                </Link>
                <h5 className="display-5 text-center">Change Your Password</h5>

                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <InputWithHintEffect
                      placeholder="Old Password"
                      type="password"
                      name="oldPassword"
                      value={this.state.oldPassword}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="row">
                    <InputWithHintEffect
                      placeholder="New Password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="row">
                    <InputWithHintEffect
                      placeholder="Confirm Password"
                      type="password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="row">
                    <ButtonDefault type="submit" className="btn btn-default">
                      Submit
                    </ButtonDefault>
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
  setAlert: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired
};

export default connect(
  null,
  { changePassword, setAlert }
)(withAuth(withLayout(ChangePassword)));
