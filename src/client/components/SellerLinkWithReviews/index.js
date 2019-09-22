import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import './index.scss';

const SellerLinkWithReviews = (props) => (
  <div className="seller-link-reviews-container d-flex align-items-center">
    <Link to={props.sellerLink} className="d-block mr-1">{props.sellerName}</Link>
    <div className="sl-ratings d-flex justify-content-center align-items-center">
      <Rating
        initialRating={props.sellerRating}
        readonly
        emptySymbol={<img src="/images/ratings/star-grey.png" alt="rating star" />}
        fullSymbol={<img src="/images/ratings/star-yellow.png" alt="rating star" />}
        className="sl-rating mr-1"
      />
      <span>
(
        {props.sellerRatingCount}
)
      </span>
    </div>
  </div>
);
export default SellerLinkWithReviews;
