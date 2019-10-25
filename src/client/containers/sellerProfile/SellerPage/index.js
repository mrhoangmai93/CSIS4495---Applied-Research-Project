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
import Rating from "react-rating";
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
import Alert from "../../../components/utilities/Alert";
import "./index.scss";
class SellerPage extends Component {
  constructor(props) {
    super(props);
    this.callbackHandler.bind(this);
  }
  componentDidMount() {
    console.log("y44y4");

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
    let totalRating = 0;
    let sellerRating = 0;
    feedbacks.forEach(fb => (totalRating += fb.rating));

    if (feedbacks.length > 0) {
      sellerRating = (totalRating / feedbacks.length).toFixed(1);
    }
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
            <div className="row">
              <div className="seller-rating">
                <b>Rating:</b> &nbsp;
                <Rating
                  initialRating={sellerRating}
                  readonly
                  emptySymbol={
                    <img
                      src="/images/ratings/star-grey.png"
                      alt="rating star"
                    />
                  }
                  fullSymbol={
                    <img
                      src="/images/ratings/star-yellow.png"
                      alt="rating star"
                    />
                  }
                  className="profile-star mr-1"
                />{" "}
                &nbsp;
                {"(" + feedbacks.length + ")" + " Feedbacks"}
              </div>
            </div>
            <ProfileBio profile={profile} />
            <div style={{ marginBottom: "60px" }} />

            {user && user._id ? (
              <div>
                <Alert />
                <FeedbackForm
                  user={user}
                  sellerId={sellerId}
                  callbackHandler={this.callbackHandler}
                />
              </div>
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
