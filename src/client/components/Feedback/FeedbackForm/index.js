import React, { Component } from "react";
import Rating from "react-rating";

import TextAreaField from "../../utilities/inputs/TextAreaField";
import DefaultButton from "../../utilities/buttons/ButtonDefault";
import "./index.scss";

const FEEDBACK_FORM_STATUSES = {
  FEEDBACK_SUBMIT: "FEEDBACK_SUBMIT"
};
class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      rating: 5
    };

    this.onChange = this.onChange.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
  }

  submitFeedback() {
    const { user, sellerId } = this.props;

    const newFeed = {
      sellerId,
      user: user._id,
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      rating: this.state.rating
    };
    this.props.callbackHandler(FEEDBACK_FORM_STATUSES.FEEDBACK_SUBMIT, newFeed);
    this.setState({ text: "" });
  }
  onStarClick(value) {
    this.setState({ rating: value });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="feedback-form-header text-white">
            Make a Feedback...
          </div>
          <div className="card-body">
            <div className="form-group">
              <TextAreaField
                placeholder="Feedback to seller"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
              />
            </div>
            <div className="row">
              <div className="feedback-seller-rating">
                <b>Rate this seller:</b> &nbsp;
                <Rating
                  initialRating={this.state.rating}
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
                  onClick={this.onStarClick}
                  className="profile-star mr-1"
                />
              </div>
            </div>
            <DefaultButton onClick={this.submitFeedback.bind(this)}>
              Submit
            </DefaultButton>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackForm;
export { FEEDBACK_FORM_STATUSES };
