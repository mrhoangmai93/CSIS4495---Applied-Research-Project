import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withLayout from "../../../hocs/front/Layout";
import InputWithHintEffect from "../../../components/utilities/inputs/InputWithHintEffect";
import RippleButton from "../../../components/utilities/buttons/RippleButton";

import "./index.scss";
class Login extends React.Component {
  componentDidMount() {
    document.title = "Log into your account";
  }

  render() {
    // const [formData, setFormData] = useState({
    //   name: "",
    //   email: "",
    //   password: "",
    //   password2: ""
    // });

    // const { name, email, password, password2 } = formData;

    // const onChange = e =>
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
    // const onSubmit = e => {
    //   e.preventDefault();
    //   if (password !== password2) {
    //   } else {
    //   }
    // };
    return (
      <Fragment>
        <section className="register">
          <h1 className="mb-5 text-center">Log into you account</h1>
          <div className="center_div">
            <form className="form">
              <InputWithHintEffect
                placeholder="Email"
                name="email"
                type="email"
              />
              <InputWithHintEffect
                placeholder="Password"
                name="password"
                type="password"
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
const mapStateToProps = (state, ownProps) => ({});
export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(withLayout(Login))
);
