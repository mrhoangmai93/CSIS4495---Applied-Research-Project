import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SettingContent = props => {
  const { auth } = props;

  return (
    <div>
      <h1>Setting</h1>
      <h5>
        Hi <strong>{auth.user.name}</strong>
      </h5>
      <h6>
        Your email address: &nbsp;
        {auth.user.email}
      </h6>
      <div className="btn-group mb-4" role="group">
        <Link to="change-password">
          <button className="btn btn-default">Change Password</button>
        </Link>
      </div>
    </div>
  );
};
SettingContent.propTypes = {
  auth: PropTypes.object.isRequired
};
export default SettingContent;
