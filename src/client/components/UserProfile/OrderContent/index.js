import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import isEmpty from "../../../../validation/is-empty";
import "./index.scss";

const OrderContent = props => {
  const { orders } = props;
  let orderContent;
  orderContent = isEmpty(orders)
    ? ""
    : orders.map(order => (
        <div key={"order-" + order._id} className="user_order_item">
          <div className="row">
            <div className="col-8">
              <div>Date: {order.date}</div>

              <div>
                Order Total :{" "}
                <strong>&nbsp; {order.orderDetails.totalSummary.total}</strong>
              </div>
            </div>
            <div className={`col-4 ${order.orderStatus}`}>
              <b>{order.orderStatus}</b>
            </div>
          </div>

          <table className="table">
            <tbody>
              {order.orderDetails.foods.map(item => (
                <tr
                  key={"food-" + item._id}
                  className="d-flex justify-content-around"
                >
                  <td>
                    <img
                      className="user_order_food-image"
                      src={item.foodId.images[0]}
                      alt="food"
                    />
                  </td>
                  <td>
                    <div>
                      <p className="food-name">{item.foodId.name}</p>
                      <p className="food-price">{item.foodId.price}</p>
                    </div>
                  </td>
                  <td>
                    <div>
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

  return <div>{orderContent}</div>;
};
OrderContent.propTypes = {
  orders: PropTypes.object.isRequired
  // addToCart: PropTypes.func
};
export default OrderContent;
