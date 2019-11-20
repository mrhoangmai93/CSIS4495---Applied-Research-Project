import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import isEmpty from "../../../../validation/is-empty";
import "./index.scss";
const CheckoutItems = props => {
  const food = !isEmpty(props.food) ? props.food : {};
  //console.log(props);
  const quantity = !isEmpty(props.quantity) ? props.quantity : {};

  return (
    <div className="order_food_item">
      <div className="row" key={food.name}>
        <div className="col-3">
          <img className="food-image" src={food.images[0]} alt="food" />
        </div>
        <div className="col-6">
          <div className="food-info">
            <p className="food-name">{food.title}</p>
            <p className="food-price">{food.price}</p>
          </div>
        </div>
        <div className="col-3">
          <div className="food-total">
            <p className="quantity">
              {quantity} {quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">${quantity * food.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
CheckoutItems.propTypes = {
  food: PropTypes.object.isRequired,
  quantity: PropTypes.string.isRequired
};
export default CheckoutItems;
