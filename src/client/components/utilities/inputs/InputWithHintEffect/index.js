import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Input } from "react-bootstrap";
import "./index.scss";

class InputWithHintEffect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  render() {
    return (
      <div className="form__group">
        <input
          type={this.props.type || "text"}
          className="form__input"
          placeholder={this.props.placeholder}
          id={this.props.name}
          name={this.props.name}
          //value={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
        <label for={this.props.name} className="form__label">
          {this.props.placeholder}
        </label>
      </div>
    );
  }
}
export default InputWithHintEffect;
