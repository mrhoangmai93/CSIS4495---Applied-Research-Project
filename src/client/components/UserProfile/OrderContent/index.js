import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import CheckShippingInfo from "../../checkout/CheckShippingInfo";
// import CheckCardInfo from "../../checkout/CheckCardInfo";
// import CheckOrderTotal from "../../checkout/CheckOrderTotal";
// import CheckItems from "../../checkout/CheckItems";
import isEmpty from "../../../../validation/is-empty";
//import Spinner from "../../common/Spinner";
//import pic from "../../../../../public/images/background/bg_testimonial.jpg";

const OrderContent = props => {
  const { orders } = props;
  let orderContent;
  orderContent = isEmpty(orders)
    ? ""
    : orders.map(order => (
        <div className="chose_area">
          <div className="row">Date: {order.date}</div>

          <div className="row">
            Order Total :{" "}
            <strong>&nbsp; {order.orderDetails.totalSummary.total}</strong>
          </div>
          <table className="table">
            <tbody>
              {order.orderDetails.foods.map(item => (
                <tr className="cart-item d-flex justify-content-around">
                  <td>
                    <img
                      className="food-image"
                      src="/images/placeholders/food.jpg"
                      alt="food"
                    />
                  </td>
                  <td>
                    <div className="food-info">
                      <p className="food-name">{item.foodId.name}</p>
                      <p className="food-price">{item.foodId.price}</p>
                    </div>
                  </td>
                  <td>
                    <div className="food-total">
                      <p className="quantity">
                        Quantity: &nbsp;
                        {item.quantity}{" "}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ));

  return <tr>{orderContent}</tr>;
};
OrderContent.propTypes = {
  orders: PropTypes.object.isRequired
  // addToCart: PropTypes.func
};
export default OrderContent;
