import React, { Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withLayout from "../../../hocs/front/Layout";
import InputWithHintEffect from "../../../components/utilities/inputs/InputWithHintEffect";
import RippleButton from "../../../components/utilities/buttons/RippleButton";
//actions
import { setAlert } from "../../../redux/actions/alert.action";
import { login } from "../../../redux/actions/auth.action";

import Alert from "../../../components/utilities/Alert";

import "./index.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Login Into Account";
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email.trim() === "" || password.trim() === "") {
      this.props.setAlert({
        msg: "Email/Password cannot be empty",
        alertType: "danger"
      });
    } else {
      this.props.login({ email, password });
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <section className="login">
          <h1 className="mb-5 text-center">Sign In</h1>
          <div className="center_div">
            <Alert />

            <form className="form" onSubmit={this.onSubmit}>
              <InputWithHintEffect
                placeholder="Email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <InputWithHintEffect
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password1}
                onChange={this.onChange}
              />
              <div className="d-flex justify-content-left mt-3">
                <RippleButton>Login</RippleButton>
              </div>
            </form>
          </div>
        </section>
      </Fragment>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  //const stateObject = state.toJS();
  return {
    isAuthenticated: state.auth.get("isAuthenticated")
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { login, setAlert }
  )(withLayout(Login))
);
