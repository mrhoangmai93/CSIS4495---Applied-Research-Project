import React, { Component } from "react";
import DefaultButton from "../../utilities/buttons/ButtonDefault";
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
          <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block feedback_avatar"
              src={feedback.avatar}
              alt=""
            />
            <p className="text-center">{feedback.name}</p>
          </div>
          <div className="col-md-10">
            <div className="row align-middle">
              <div className="col-10">
                <p className="lead">{feedback.text}</p>
              </div>
              <div className="col-2">
                <div>
                  {feedback.user === id ? (
                    <button
                      onClick={() =>
                        this.props.callbackHandler(
                          FEEDBACK_ITEM_STATUSES.DELETE_FEEDBACK
                        )
                      }
                      className="btn btn-default btn-danger mr-1"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </div>
                <div>{feedback.date}</div>
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
