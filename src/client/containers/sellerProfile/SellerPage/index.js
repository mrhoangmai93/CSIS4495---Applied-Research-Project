import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLayout from "../../../hocs/front/Layout";
import withAuth from "../../../hocs/withAuth";
import { loadSellerProfile } from "../../../redux/actions/seller/sellerProfile.action";
import Spinner from "../../../components/utilities/Spinner";
// import ProfileActions from "./ProfileActions";
import ProfileHeader from "../../../components/SellerProfile/ProfileHeader";
import ProfileBio from "../../../components/SellerProfile/ProfileBio";
import DefaultButton from "../../../components/utilities/buttons/ButtonDefault";
class SellerPage extends Component {
  componentDidMount() {
    this.props.loadSellerProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth.get("user");
    const { profile } = this.props;
    const loading = profile.get("loading");
    let pageContent;

    if (profile === null || loading) {
      pageContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        pageContent = (
          <div>
            <p className="lead text-muted">
              {/* Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link> */}
            </p>
            <ProfileHeader profile={profile} />
            <ProfileBio profile={profile} />
            <div style={{ marginBottom: "60px" }} />
            <Link to={{ pathname: "/seller/create-profile", profile }}>
              <DefaultButton> Edit Profile</DefaultButton>
            </Link>
          </div>
        );
      } else {
        // User is logged in but has no profile
        pageContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/seller/create-profile">
              <DefaultButton> Create Profile</DefaultButton>
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">{pageContent}</div>
        </div>
      </div>
    );
  }
}

SellerPage.propTypes = {
  loadSellerProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.sellerProfile,
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadSellerProfile }
  )(withAuth(withLayout(SellerPage)))
);
