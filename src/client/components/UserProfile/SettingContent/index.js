import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ButtonDefault from "../../utilities/buttons/ButtonDefault";
const SettingContent = props => {
  const { user } = props;

  return (
    <div>
      <h1>Setting</h1>
      <h5>
        Hi <strong>{user.name}</strong>
      </h5>
      <h6>
        Your email address: &nbsp;
        {user.email}
      </h6>
      <div className="btn-group mb-4" role="group">
        <Link to="/account/change-password">
          <ButtonDefault>Change Password</ButtonDefault>
        </Link>
      </div>
    </div>
  );
};
SettingContent.propTypes = {
  user: PropTypes.object.isRequired
};
export default SettingContent;
