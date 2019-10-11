import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SellerLinkWithReviews from "../SellerLinkWithReviews";
import "./index.scss";
import ButtonWithOnclick from "../utilities/buttons/ButtonWithOnclick";
const ProductCard = ({ food }) => {
  console.log(food);
  const tagList = food.tags.map(tag => (
    <li className="list-inline-item">{tag}</li>
  ));

  return (
    <div className="product-card-container d-flex flex-column mb-3">
      <div className="pc-image">
        <Link to="/">
          <img
            className="img-fluid"
            src="/images/placeholders/food.jpg"
            alt="product"
          />
        </Link>
      </div>
      <div className="pc-info-container p-2">
        <Link to="/">
          <h5>{food.title}</h5>
        </Link>
        <ul className="pc-list-tags list-inline mb-2">{tagList}</ul>
        <div className="pc-seller">
          <SellerLinkWithReviews
            sellerLink="/"
            sellerName="testuser1"
            sellerRating="3.5"
            sellerRatingCount="35"
          />
        </div>
      </div>
      <div className="product-card-button center-block">
        {/* <button
        className="btn"
        // onClick={() => props.addToCart(product._id, 1)}
      >
        Add to cart
      </button> */}

        <ButtonWithOnclick>Add to cart</ButtonWithOnclick>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  food: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired
};
export default ProductCard;
