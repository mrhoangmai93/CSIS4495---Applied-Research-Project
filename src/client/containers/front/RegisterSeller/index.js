import React, { Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withLayout from "../../../hocs/front/Layout";
import InputWithHintEffect from "../../../components/utilities/inputs/InputWithHintEffect";
import RippleButton from "../../../components/utilities/buttons/RippleButton";
//actions
import { setAlert } from "../../../redux/actions/alert.action";
import { register } from "../../../redux/actions/auth.action";
import Alert from "../../../components/utilities/Alert";

class RegisterSeller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Register new User";
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, password1, password2 } = this.state;

    // const newUser = {
    //   name: this.state.name,
    //   email: this.state.email,
    //   password: this.state.password,
    //   password2: this.state.password2
    // };
    if (password1 !== password2) {
      this.props.setAlert({
        msg: "Password do not match!",
        alertType: "danger"
      });
    } else {
      this.props.register({ name, email, password: password1, role: "seller" });
    }
  }
  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <section className="register">
          <h1 className="mb-5 text-center">Register a Seller</h1>
          <div className="center_div">
            <Alert />

            <form className="form" onSubmit={this.onSubmit}>
              <InputWithHintEffect
                placeholder="Full Name"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              <InputWithHintEffect
                placeholder="Email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <InputWithHintEffect
                placeholder="Password"
                name="password1"
                type="password"
                value={this.state.password1}
                onChange={this.onChange}
              />
              <InputWithHintEffect
                placeholder="Confirm Password"
                type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
              />
              <div className="d-flex justify-content-left mt-3">
                <RippleButton>Register</RippleButton>
              </div>
            </form>
          </div>
        </section>
      </Fragment>
    );
  }
}

RegisterSeller.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.get("isAuthenticated")
});

export default withRouter(
  connect(
    mapStateToProps,
    { register, setAlert }
  )(withLayout(RegisterSeller))
);
