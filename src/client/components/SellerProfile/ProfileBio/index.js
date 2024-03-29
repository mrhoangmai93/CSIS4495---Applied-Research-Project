import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../../../validation/is-empty";
import "./index.scss";
class ProfileBio extends Component {
  render() {
    const { profile } = this.props;
    const bio = profile.get("bio");
    const user = profile.get("user");
    // Get first name
    let firstName = user.name.trim().split(" ")[0];
    if (!firstName) {
      firstName = user.name;
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="profile-bio-card">
            <h3 className="text-center header-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{bio}</span>
              )}
            </p>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

ProfileBio.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileBio;
