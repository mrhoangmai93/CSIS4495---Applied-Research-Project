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
  console.log(orders);
  let orderContent;
  orderContent = isEmpty(orders.orders)
    ? ""
    : orders.orders.map(order => (
        <div className="chose_area">
          <div className="row">Date: {order.date}</div>

          <div className="row">
            Order Total : <strong>&nbsp; {order.orderdetail.ordertotal}</strong>
          </div>
          <table className="table">
            <tbody>
              {order.orderdetail.items.map(item => (
                <tr className="cart-item d-flex justify-content-around">
                  <td>
                    <img
                      className="product-image"
                      src="/images/placeholders/food.jpg"
                      alt="product"
                    />
                  </td>
                  <td>
                    <div className="product-info">
                      <p className="product-name">{item.itemId.name}</p>
                      <p className="product-price">{item.itemId.price}</p>
                    </div>
                  </td>
                  <td>
                    <div className="product-total">
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
  //   let itemContent;
  //   itemContent = isEmpty(items)
  //   ? ""
  //   : items.map(item => (
  //       <CheckItems
  //         key={item._id}
  //         product={item.productId}
  //         quantity={item.quantity}
  //       />
  //     ));
  // let paymentContent;
  // paymentContent = isEmpty(payment) ? (
  //   "No card Found"
  // ) : (
  //   <CheckCardInfo payment={payment} />
  // );
  // let showContent;
  // if (profile === null || cart === null) {
  //   showContent = <Spinner />;
  // } else {
  //   showContent = (
  //     <div className="container">
  //       <div className="heading">
  //         <h3>Review Your Order</h3>
  //       </div>
  //       <div className="row">
  //         <div className="col-sm-8">
  //           <div className="chose_area">
  //             <div className="row">
  //               <CheckShippingInfo auth={auth} address={address} />
  //               {paymentContent}
  //             </div>
  //           </div>
  //           <div className="chose_area">
  //             <ul className="user_info">{itemContent}</ul>
  //           </div>
  //         </div>
  //         <div className="col-sm-4">
  //           <CheckOrderTotal
  //             items={items}
  //             onSubmitOrder={this.onSubmitOrder}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  return <tr>{orderContent}</tr>;
};
OrderContent.propTypes = {
  orders: PropTypes.object.isRequired
  // addToCart: PropTypes.func
};
export default OrderContent;
