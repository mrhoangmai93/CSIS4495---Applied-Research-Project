import React, { Fragment, useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <div className="row">
        <div className="login">
          <div className="login__form">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="u-margin-bottom-medium">
                <h2 className="heading-secondary">Log into an account</h2>
              </div>

              <div className="form__group">
                <input
                  type="email"
                  className="form__input"
                  placeholder="Email address"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
                <label for="email" className="form__label">
                  Email address
                </label>
              </div>
              <div className="form__group">
                <input
                  type="password"
                  className="form__input"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  required
                />
                <label for="password" className="form__label">
                  Password
                </label>
              </div>

              <div className="form__group">
                <button className="btn">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
