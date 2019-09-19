import React, { Fragment, useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
    } else {
    }
  };
  return (
    <Fragment>
      <div className="row">
        <div className="register">
          <div className="register__form">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="u-margin-bottom-medium">
                <h2 className="heading-secondary">Register new account</h2>
              </div>

              <div className="form__group">
                <input
                  type="text"
                  className="form__input"
                  placeholder="Full name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                  required
                />
                <label for="name" className="form__label">
                  Full name
                </label>
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
                <input
                  type="password"
                  className="form__input"
                  placeholder="Confirm Password"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={e => onChange(e)}
                  required
                />
                <label for="password2" className="form__label">
                  Confirm Password
                </label>
              </div>
              <div className="form__group">
                <button className="btn">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
