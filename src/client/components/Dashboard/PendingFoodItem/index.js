import React from "react";

const PendingFoodItem = props => (
  <div>
    <div>
      <h5>{props.food.foodId.title}</h5>
    </div>
    <div>
      <b>$</b>
      {props.food.foodId.price} X {props.food.quantity}
    </div>
  </div>
);

export default PendingFoodItem;
