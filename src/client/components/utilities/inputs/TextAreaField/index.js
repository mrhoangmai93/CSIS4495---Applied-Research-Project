import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaField = ({ name, placeholder, value, info, onChange }) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaField;
