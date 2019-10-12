import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Input } from "react-bootstrap";
import "./index.scss";

class InputWithBorderEffect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    return (
      <div
        className={classNames(
          "focus-box",
          { focus: this.state.focused },
          { error: this.props.error }
        )}
      >
        <div>
          <div
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            className="input-holder"
          >
            <input
              type={this.props.type || "text"}
              placeholder={this.props.placeholder}
              className={this.props.size}
              onChange={this.props.onChange}
            />
          </div>
          <div className="focus">
            <div />
          </div>
        </div>
      </div>
    );
  }
}
export default InputWithBorderEffect;
