import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Button } from "react-bootstrap";

const ButtonDefault = props => (
  <button
    className="btn btn--green"
    onClick={props.onClick ? props.onClick : null}
  >
    {props.children}
  </button>
);
export default ButtonDefault;
