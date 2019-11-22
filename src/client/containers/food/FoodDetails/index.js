import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLayout from "../../../hocs/front/Layout";
import DefaultButton from "../../../components/utilities/buttons/ButtonDefault";
import { addToCart } from "../../../redux/actions/cart.action";
import InputWithBorderEffect from "../../../components/utilities/inputs/InputWithBorderEffect";
import ButtonDefault from "../../../components/utilities/buttons/ButtonDefault";
import { loadAllFoods } from "../../../redux/actions/food.action";
import NoResults from "../../../components/utilities/empty-states/Noresults";
class FoodDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: "",
      quantity: "1"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.foods.get("list").size === 0) {
      this.props.loadAllFoods();
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     });
  //   }
  // }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newItem = {
      foodId: this.props.match.params.id,
      quantity: this.state.quantity
    };
    this.props.addToCart(newItem);
  }
  render() {
    const { foods } = this.props;
    const food = foods
      .get("list")
      .filter(f => f._id === this.props.match.params.id)[0];
    let productContent;

    if (food) {
      const tagList = food.tags.map(tag => (
        <li className="list-inline-item">{tag}</li>
      ));

      productContent = (
        <div className="product-details">
          <div className="view-product">
            <h2>{food.name}</h2>
          </div>
          <div className="col-7">
            <div className="product-information">
              <h2>{food.title}</h2>
              <img className="img-fluid" src={food.images[0]} alt="product" />
              <span>
                <b>${food.price}</b>
                <InputWithBorderEffect
                  type="text"
                  id="quantity"
                  placeHolder="Quantity"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.onChange}
                />

                <ButtonDefault onClick={this.onSubmit.bind(this)}>
                  <i className="fa fa-shopping-cart" />
                  &nbsp; Add to cart
                </ButtonDefault>
              </span>
              <p>
                <b>Seller:</b>{" "}
                <Link to={"/seller/profile/" + food.owner._id}>
                  {food.owner.name}
                </Link>
              </p>
              <p>
                <b>Description:</b> {food.description}
              </p>
              <p>
                <b>Picking Up Address:</b> {food.pickingUpAddress.address1},{" "}
                {food.pickingUpAddress.city}
              </p>
              <p>
                <b>Tags:</b>
                <ul className="pc-list-tags list-inline mb-2">{tagList}</ul>
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      productContent = <NoResults />;
    }
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            {/* <div class="left-sidebar">
              <Sidebar />
            </div> */}
          </div>

          <div class="col-sm-9 padding-right">{productContent}</div>
        </div>
      </div>
    );
  }
}
FoodDetails.propTypes = {
  loadAllFoods: PropTypes.func.isRequired,
  foods: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  foods: state.foods
});

export default withRouter(
  connect(mapStateToProps, { addToCart, loadAllFoods })(withLayout(FoodDetails))
);
