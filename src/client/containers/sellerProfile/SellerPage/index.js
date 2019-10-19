import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLayout from "../../../hocs/front/Layout";
import {
  loadSellerProfile,
  addFeedback,
  deleteFeedback
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
import NoResults from "../../../components/utilities/empty-states/Noresults";
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
        this.props.deleteFeedback(this.props.match.params.id);
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
      if (profile.get("user") && sellerId !== profile.get("user")._id) {
        pageContent = <Spinner />;
      }
    } else {
      if (!profile.get("bio")) {
        pageContent = <NoResults message="No profile for this user" />;
      } else {
        feedbackContent = feedbacks.map(fb => (
          <FeedbackItem
            feedback={fb}
            auth={this.props.auth}
            sellerId={sellerId}
            callbackHandler={this.callbackHandler}
          />
        ));
        // Check if logged in user has profile data
        pageContent = (
          <div>
            <p className="lead text-muted"></p>
            <ProfileHeader profile={profile} />
            <ProfileBio profile={profile} />
            <div style={{ marginBottom: "60px" }} />

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
  deleteFeedback: PropTypes.func.isRequired,
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
    { loadSellerProfile, addFeedback, deleteFeedback }
  )(withLayout(SellerPage))
);
