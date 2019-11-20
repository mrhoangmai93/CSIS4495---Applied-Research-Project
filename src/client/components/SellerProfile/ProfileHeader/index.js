import React, { Component } from "react";
import isEmpty from "../../../../validation/is-empty";
import "./index.scss";
class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    const socials = profile.get("socials");
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="profile-header-card text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.get("user").avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center text-white">
                {profile.get("user").name}
              </h1>
              <p>
                {isEmpty(profile.get("website")) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.get("website")}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(socials && socials.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={socials.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(socials && socials.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={socials.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(socials && socials.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={socials.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}

                {isEmpty(socials && socials.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={socials.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
