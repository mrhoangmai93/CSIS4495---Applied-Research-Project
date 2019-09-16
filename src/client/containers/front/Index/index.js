import React from 'react';
import './index.scss';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withLayout from '../../../hocs/front/Layout';
import Banner from '../../../components/Banner';
// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  componentDidMount() {
    document.title = 'FoodByMe - New way to enjoy your food';
  }

  render() {
    return (
      <>
        <Banner appName="FoodByMe" />
        <div className="container home-page">
        </div>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
});


export default withRouter(connect(mapStateToProps, {
})(withLayout(Index)));
