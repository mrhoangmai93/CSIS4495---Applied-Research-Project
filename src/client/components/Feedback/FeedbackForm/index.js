import React, { Component } from "react";
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
      text: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  submitFeedback() {
    const { user, sellerId } = this.props;

    const newFeed = {
      sellerId,
      user: user._id,
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.callbackHandler(FEEDBACK_FORM_STATUSES.FEEDBACK_SUBMIT, newFeed);

    this.setState({ text: "" });
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
