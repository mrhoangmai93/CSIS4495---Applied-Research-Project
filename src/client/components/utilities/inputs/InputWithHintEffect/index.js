import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Input } from "react-bootstrap";
import "./index.scss";

const InputWithHintEffect = props => {
  return (
    <div className="form__group">
      <input
        type={props.type || "text"}
        className="form__input"
        placeholder={props.placeholder}
        id={props.name}
        name={props.name}
        //value={this.props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      <label for={props.name} className="form__label">
        {props.placeholder}
      </label>
    </div>
  );
};
export default InputWithHintEffect;
