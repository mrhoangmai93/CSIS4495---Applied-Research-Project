import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SellerLinkWithReviews from "../SellerLinkWithReviews";
import "./index.scss";
import ButtonDefault from "../utilities/buttons/ButtonDefault";

const VIEW_STATUSES = {
  ADD_TO_CART: "ADD_TO_CART"
};
const ProductCard = props => {
  const { food } = props;
  const tagList = food.tags.map(tag => (
    <li className="list-inline-item">{tag}</li>
  ));

  return (
    <div className="product-card-container d-flex flex-column mb-3">
      <div className="pc-image">
        <Link to={`/food/${food._id}`}>
          <img
            className="img-fluid"
            src="/images/placeholders/food.jpg"
            alt="product"
          />{" "}
        </Link>
      </div>
      <div className="pc-info-container p-2">
        <Link to="/">
          <h5>{food.title}</h5>
        </Link>
        <ul className="pc-list-tags list-inline mb-2">{tagList}</ul>
        <div className="pc-seller">
          <SellerLinkWithReviews
            sellerLink={"/seller/" + food.owner._id}
            sellerName={food.owner.name}
            sellerRating="3.5"
            sellerRatingCount="35"
          />
        </div>
      </div>
      <div className="product-card-button center-block">
        <ButtonDefault
          onClick={() =>
            props.callbackHandler(VIEW_STATUSES.ADD_TO_CART, {
              foodId: food._id
            })
          }
        >
          Add to cart
        </ButtonDefault>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  food: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired
};
export default ProductCard;
export { VIEW_STATUSES };
