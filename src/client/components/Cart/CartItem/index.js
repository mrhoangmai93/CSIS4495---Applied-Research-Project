import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";
const VIEW_STATUSES = {
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  DELETE_ITEM: "DELETE_ITEM"
};
class CartItem extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = {
      quantity: this.props.quantity
    };
  }
  onDeleteHandler = (itemId, event) => {
    this.props.callbackHandler(VIEW_STATUSES.DELETE_ITEM, { itemId });
  };
  onQualityChangeHandler = (itemId, event) => {
    this.props.callbackHandler(VIEW_STATUSES.UPDATE_QUANTITY, {
      itemId,
      qty: event.target.value
    });
  };

  render() {
    const { item, quantity } = this.props;
    return (
      <tr>
        <td className="cart_product">
          <a href="/">
            <img
              className="food_item-img"
              src="/images/placeholders/food.jpg"
              alt={item.title}
            />
          </a>
        </td>
        <td className="cart_description" colspan="5">
          <h4>
            {" "}
            <Link to={`/food/${item._id}`} className="default_link">
              {item.title}
            </Link>{" "}
          </h4>
          <p>{item.description}</p>
        </td>
        <td className="cart_price">
          <p>${item.price}</p>
        </td>
        <td className="cart_quantity">
          <div className="cart_quantity_button">
            <div className="row">
              <input
                className="cart_quantity_input"
                type="text"
                name="quantity"
                value={quantity}
                onChange={this.onQualityChangeHandler.bind(this, item._id)}
                size="2"
                display="none"
              />
            </div>
          </div>
        </td>
        <td className="cart_total">
          <p className="cart_total_price">${item.price * quantity}</p>
        </td>
        <td>
          <button
            onClick={this.onDeleteHandler.bind(this, item._id)}
            type="button"
            className="btn btn-default btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        </td>
      </tr>
    );
  }
}
CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  quantity: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(CartItem);
export { VIEW_STATUSES };
