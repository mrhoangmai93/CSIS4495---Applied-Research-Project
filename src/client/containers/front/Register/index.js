import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withLayout from "../../../hocs/front/Layout";
import InputWithHintEffect from "../../../components/utilities/inputs/InputWithHintEffect";
import RippleButton from "../../../components/utilities/buttons/RippleButton";

import "./index.scss";

class Register extends React.Component {
  componentDidMount() {
    document.title = "Register new User";
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
        <h1 className="mb-5 text-center banner-heading">Register a new User</h1>
        <form className="form">
          <InputWithHintEffect
            placeholder="Full Name"
            name="fullName"
            size="big"
          />
          <div className="d-flex justify-content-center mt-3">
            <RippleButton>Register</RippleButton>
          </div>
        </form>
      </Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({});
export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(withLayout(Register))
);
