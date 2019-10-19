import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLayout from "../../../hocs/front/Layout";
import {
  loadSellerProfile,
  addFeedback
} from "../../../redux/actions/seller/sellerProfile.action";
import Spinner from "../../../components/utilities/Spinner";
// import ProfileActions from "./ProfileActions";
import ProfileHeader from "../../../components/SellerProfile/ProfileHeader";
import ProfileBio from "../../../components/SellerProfile/ProfileBio";
import DefaultButton from "../../../components/utilities/buttons/ButtonDefault";
import FeedbackForm, {
  FEEDBACK_FORM_STATUSES
} from "../../../components/Feedback/FeedbackForm";
import FeedbackItem, {
  FEEDBACK_ITEM_STATUSES
} from "../../../components/Feedback/FeedbackItem";

class SellerPage extends Component {
  constructor(props) {
    super(props);
    this.callbackHandler.bind(this);
  }
  componentDidMount() {
    this.props.loadSellerProfile(this.props.match.params.id);
  }

  callbackHandler = (type, data) => {
    switch (type) {
      case FEEDBACK_FORM_STATUSES.FEEDBACK_SUBMIT:
        this.props.addFeedback(data);
        break;
      case FEEDBACK_ITEM_STATUSES.DELETE_FEEDBACK:
        //this.props.deleteFromCart({ foodId: data.itemId });
        break;

      default:
        break;
    }
  };
  render() {
    const sellerId = this.props.match.params.id;
    const user = this.props.auth.get("user");
    const { profile } = this.props;
    const loading = profile.get("loading");
    const feedbacks = profile.get("feedbacks");
    let pageContent;
    let feedbackContent;

    if (profile === null || loading) {
      pageContent = <Spinner />;
    } else {
      //redirect if nothing in profile
      if (!profile.get("bio") || sellerId !== profile.get("user")._id) {
        return <Redirect to="/" />;
      } else {
        feedbackContent = feedbacks.map(fb => (
          <FeedbackItem
            feedback={fb}
            auth={this.props.auth}
            callbackHandler={this.callbackHandler}
          />
        ));
        // Check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
          pageContent = (
            <div>
              <p className="lead text-muted"></p>
              <ProfileHeader profile={profile} />
              <ProfileBio profile={profile} />
              <div style={{ marginBottom: "60px" }} />
              {/* {user && user._id === sellerId ? (
                <Link to={{ pathname: "/seller/create-profile", profile }}>
                  <DefaultButton> Edit Profile</DefaultButton>
                </Link>
              ) : null}

              <div style={{ marginBottom: "3rem" }} /> */}

              {user && user._id ? (
                <FeedbackForm
                  user={user}
                  sellerId={sellerId}
                  callbackHandler={this.callbackHandler}
                />
              ) : null}
              {feedbackContent}
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
    }

    return (
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-12">{pageContent}</div>
        </div>
      </div>
    );
  }
}

SellerPage.propTypes = {
  addFeedback: PropTypes.func.isRequired,
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
    { loadSellerProfile, addFeedback }
  )(withLayout(SellerPage))
);
