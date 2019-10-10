import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./index.scss";
import Immutable from "immutable";

const Alert = ({ alerts }) =>
  // alerts !== null &&
  // alerts.length > 0 &&
  alerts.valueSeq().map(alert => (
    <div
      key={alert.payload.id}
      className={`alert alert-${alert.payload.alertType}`}
    >
      {alert.payload.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    alerts: state.alert
  };
};

export default connect(mapStateToProps)(Alert);
