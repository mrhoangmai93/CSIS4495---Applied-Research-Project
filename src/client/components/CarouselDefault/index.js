import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MobileDetect from "mobile-detect";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import ProductCard from "../ProductCard";
import { FOOD_LOAD } from "../../redux/actions/seller/sellerProfile.action";

class CarouselDefault extends Component {
  static getInitialProps({ req }) {
    let userAgent;
    let deviceType;
    if (req) {
      userAgent = req.headers["user-agent"];
    } else {
      userAgent = navigator.userAgent;
    }
    const md = new MobileDetect(userAgent);
    if (md.tablet()) {
      deviceType = "tablet";
    } else if (md.mobile()) {
      deviceType = "mobile";
    } else {
      deviceType = "desktop";
    }
    return { deviceType };
  }

  state = { isMoving: false };

  render() {
    const { foods } = this.props;
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
      }
    };
    return (
      <div>
        <Carousel
          /*
          swipeable={false}
          draggable={false}
          */
          responsive={responsive}
          infinite={false}
          beforeChange={() => this.setState({ isMoving: true })}
          afterChange={() => this.setState({ isMoving: false })}
          containerClass="first-carousel-container container"
          deviceType={this.props.deviceType}
        >
          {foods.map(food => {
            return <ProductCard food={food} key={food._id} />;
          })}
        </Carousel>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    textAlign: "center"
  },
  title: {
    maxWidth: 400,
    margin: "auto",
    marginTop: 10
  }
});

export default withStyles(styles)(CarouselDefault);
