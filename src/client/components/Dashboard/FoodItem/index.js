import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Switch from "react-switch";
import "./index.scss";
const FOOD_ITEM_STATUSES = {
  EDIT_ITEM: "EDIT_ITEM",
  SWITCH_CHANGE: "SWITCH_CHANGE"
};
class FoodItem extends Component {
  constructor(props) {
    super(props);

    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.onEditHandler = this.onEditHandler.bind(this);
  }
  onEditHandler = () => {
    this.props.callbackHandler(FOOD_ITEM_STATUSES.EDIT_ITEM, this.props.food);
  };

  handleSwitchChange(checked) {
    let {
      _id,
      title,
      description,
      price,
      quantity,
      images,
      tags,
      pickingUpAddress
    } = this.props.food;
    const newFood = {
      title,
      description,
      price,
      quantity,
      images,
      tags,
      pickingUpAddress,
      active: checked,
      food_id: _id
    };
    this.props.callbackHandler(FOOD_ITEM_STATUSES.SWITCH_CHANGE, newFood);
  }
  render() {
    const { food } = this.props;
    const checked = food.active;
    return (
      <div className="food_item">
        <div className="row">
          <div className="col-2">
            <div className="cart_product">
              <img
                className="food_item-img"
                src={food.images[0]}
                alt={food.title}
              />
            </div>
          </div>
          <div className="col-5">
            <div className="cart_description">
              <h4 className="default_link"> {food.title}</h4>
              <div>
                <Link
                  to={{ pathname: "/seller/createfood", food }}
                  className={"food_item_edit_icon"}
                >
                  <i className="fas fa-edit"></i>
                </Link>
              </div>

              <p>{food.description}</p>
            </div>
          </div>
          <div className="col-3">
            <p>
              <b>Price:</b> ${food.price}
            </p>
            <p>
              <b>Quantity:</b> {food.quantity}
            </p>
          </div>
          <div className="col-1">
            {/* <button
              // onClick={this.onDeleteHandler.bind(this, item._id)}
              type="button"
              className="btn btn-default btn-success"
            >
              <i class="fas fa-check"></i>
            </button> */}
            <div>Active</div>
            <Switch onChange={this.handleSwitchChange} checked={checked} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {})(FoodItem);
export { FOOD_ITEM_STATUSES };
