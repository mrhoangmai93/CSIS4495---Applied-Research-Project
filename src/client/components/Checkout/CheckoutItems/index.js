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
    <div className="order-food-item">
      <tr className="cart-item d-flex justify-content-around" key={food.name}>
        <td>
          <img
            className="food-image"
            src="/images/placeholders/food.jpg"
            alt="food"
          />
        </td>
        <td>
          <div className="food-info">
            <p className="food-name">{food.title}</p>
            <p className="food-price">{food.price}</p>
          </div>
        </td>
        <td>
          <div className="food-total">
            <p className="quantity">
              {quantity} {quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">${quantity * food.price}</p>
          </div>
        </td>
      </tr>
    </div>
  );
};
CheckoutItems.propTypes = {
  food: PropTypes.object.isRequired,
  quantity: PropTypes.string.isRequired
};
export default CheckoutItems;
