import React from 'react';
import { Link } from 'react-router-dom';
import SellerLinkWithReviews from '../SellerLinkWithReviews';
import './index.scss';

const ProductCard = (props) => (
  <div className="product-card-container d-flex flex-column mb-3">
    <div className="pc-image">
      <Link to="/">
        <img className="img-fluid" src="/images/placeholders/food.jpg" alt="product" />
      </Link>
    </div>
    <div className="pc-info-container p-2">
      <Link to="/">
        <h5>Ribsilog (Marinated Beef Short Ribs)</h5>
      </Link>
      <ul className="pc-list-tags list-inline mb-2">
        <li className="list-inline-item">American</li>
        <li className="list-inline-item">Healthy</li>
        <li className="list-inline-item">Sandwiches</li>
        <li className="list-inline-item">Fast Food</li>
      </ul>
      <div className="pc-seller">
        <SellerLinkWithReviews sellerLink="/" sellerName="testuser1" sellerRating="3.5" sellerRatingCount="35" />
      </div>
    </div>
  </div>
);

export default ProductCard;
