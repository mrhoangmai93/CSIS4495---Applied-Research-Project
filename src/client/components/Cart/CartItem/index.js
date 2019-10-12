import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import { deleteFromCart, updateCart } from "../../actions/cartActions";
import "./index.scss";

class CartItem extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = {
      quantity: this.props.quantity,
      change: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity) {
      this.setState({ quantity: nextProps.quantity });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const id = this.props.item._id;
    const quantity = this.state.quantity;
    this.props.updateCart(id, quantity);
  }
  onChange(e) {
    if (!isNaN(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ change: true });
    }
  }

  render() {
    const { item } = this.props;
    const { quantity, change } = this.state;
    let updateButton;
    updateButton = !change ? (
      ""
    ) : (
      <button
        type="button"
        className="btn btn-default edit-card"
        // onClick={() =>
        //   this.state.quantity === "0"
        //     ? deleteFromCart(item._id)
        //     : updateCart(item._id, this.state.quantity)
        // }
      >
        Update
      </button>
    );
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
                value={this.state.quantity}
                onChange={this.onChange}
                size="2"
                display="none"
              />{" "}
              {updateButton}
            </div>
          </div>
        </td>
        <td className="cart_total">
          <p className="cart_total_price">${item.price * quantity}</p>
        </td>
        <td>
          <button
            onClick={() => this.props.deleteFromCart({ foodId: item._id })}
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
  deleteFromCart: PropTypes.func.isRequired,
  //   updateCart: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  quantity: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(CartItem);
