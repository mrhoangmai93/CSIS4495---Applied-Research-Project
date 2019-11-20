import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Button } from "react-bootstrap";

const ButtonDefault = props => (
  <button
    onClick={props.onClick ? props.onClick : null}
    className="btn btn--green"
  >
    {props.children}
  </button>
);
export default ButtonDefault;
