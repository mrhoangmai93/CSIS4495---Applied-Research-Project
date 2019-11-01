import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Switch from "react-switch";
import "./index.scss";
const FOOD_ITEM_STATUSES = {
  COMPLETE_ITEM: "COMPLETE_ITEM",
  SWITCH_CHANGE: "SWITCH_CHANGE"
};
class FoodItem extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = {
      switchChecked: this.props.food.active
    };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }
  onDeleteHandler = (itemId, event) => {
    this.props.callbackHandler(FOOD_ITEM_STATUSES.SWITCH_CHANGE, { itemId });
  };

  handleSwitchChange(checked) {
    //this.setState({ switchChecked: checked });
    this.props.callbackHandler(FOOD_ITEM_STATUSES.SWITCH_CHANGE, {
      itemId: this.props.food._id,
      checked
    });
  }
  render() {
    const { food } = this.props;
    return (
      <div className="food_item">
        <div className="row">
          <div className="col-2">
            <div className="cart_product">
              <Link to={`/food/${food._id}`} className="default_link">
                <img
                  className="food_item-img"
                  src="/images/placeholders/food.jpg"
                  alt={food.title}
                />
              </Link>
            </div>
          </div>
          <div className="col-5">
            <div className="cart_description">
              <h4>
                {" "}
                <Link to={`/food/${food._id}`} className="default_link">
                  {food.title}
                </Link>{" "}
              </h4>
              <div className="food_item_edit_icon">
                <i class="fas fa-edit"></i>
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
            <Switch
              onChange={this.handleSwitchChange}
              checked={this.state.switchChecked}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(FoodItem);
export { FOOD_ITEM_STATUSES };
