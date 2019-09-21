import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Button } from 'react-bootstrap';

const RippleButton = (props) => (
  <button className="button-ripple">{props.children}</button>
);
export default RippleButton;
