import React from 'react';
import './index.scss';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>Welcome</h1>
        </div>
        <div className="row">
          <Button>Another test</Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
});


export default withRouter(connect(mapStateToProps, {
})(Index));
