import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withLayout from "../../../hocs/front/Layout";
import Carousel from '../../../components/CarouselScreen';
import AboutProject from '../../../components/AboutProject';
import Team from '../../../components/OurTeam';
import Services from '../../../components/Services';

function About() {
    
    return (
    <React.Fragment>  
        <Carousel/>  
        <AboutProject/>
        <Services/>
        <Team/>
    </React.Fragment>
    );
}



const mapStateToProps = (state, ownProps) => ({});
export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(withLayout(About))
);
