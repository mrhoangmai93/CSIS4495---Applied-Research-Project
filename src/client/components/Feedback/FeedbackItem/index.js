import React, { Component } from "react";
import DefaultButton from "../../utilities/buttons/ButtonDefault";
import Rating from "react-rating";

import "./index.scss";
const FEEDBACK_ITEM_STATUSES = {
  DELETE_FEEDBACK: "DELETE_FEEDBACK"
};
class FeedbackItem extends Component {
  render() {
    const { feedback, auth } = this.props;
    const id = auth.get("user") ? auth.get("user")._id : null;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-3">
            <img
              className="rounded-circle d-none d-md-block feedback_avatar"
              src={feedback.avatar}
              alt=""
            />
            <p className="text-center mb-0">{feedback.name}</p>
            <Rating
              initialRating={feedback.rating}
              readonly
              emptySymbol={
                <img src="/images/ratings/star-grey.png" alt="rating star" />
              }
              fullSymbol={
                <img src="/images/ratings/star-yellow.png" alt="rating star" />
              }
              className="profile-star mr-1"
            />
          </div>
          <div className="col-md-9">
            <div className="d-flex flex-wrap flex-column justify-content-between align-middle">
              <p className="lead text-left">{feedback.text}</p>
              <div>
                <p className="text-right mb-0 small">{feedback.date}</p>
                {feedback.user === id ? (
                  <button
                    onClick={() =>
                      this.props.callbackHandler(
                        FEEDBACK_ITEM_STATUSES.DELETE_FEEDBACK
                      )
                    }
                    className="d-block mt-2 btn btn-default btn-danger ml-auto"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackItem;
export { FEEDBACK_ITEM_STATUSES };
