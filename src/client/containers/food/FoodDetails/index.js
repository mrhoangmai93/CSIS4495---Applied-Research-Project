import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import withLayout from "../../../hocs/front/Layout";
import DefaultButton from "../../../components/utilities/buttons/ButtonDefault";
import {addToCart} from "../../../redux/actions/cart.action";
import InputWithBorderEffect from "../../../components/utilities/inputs/InputWithBorderEffect";
import ButtonDefault from "../../../components/utilities/buttons/ButtonDefault";
import {loadAllFoods} from "../../../redux/actions/food.action";
import NoResults from "../../../components/utilities/empty-states/Noresults";
import './index.scss';

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
        this.setState({[e.target.name]: e.target.value});
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
        const {foods} = this.props;
        const food = foods
            .get("list")
            .filter(f => f._id === this.props.match.params.id)[0];
        let productContent;

        if (food) {
            const tagList = food.tags.map(tag => (
                <li className="list-inline-item">{tag}</li>
            ));

            productContent = (
                <div className="p-5">
                    <div className="row">
                        <div className="col-4">
                            <img className="img-fluid" src={food.images[0]} alt="product"/>
                        </div>
                        <div className="col-8">
                            <h2 className="mb-3">{food.title}</h2>
                            <div className="d-flex flex-column">
                                <span className="mr-2 font-weight-bold text-secondary">Price</span>
                                <h4 className="mb-3 mt-1">${food.price}</h4>
                                <span className="mr-2 font-weight-bold text-secondary">Quantity</span>
                                <InputWithBorderEffect
                                    type="text"
                                    id="quantity"
                                    placeHolder="Quantity"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.onChange}
                                />
                                <ButtonDefault onClick={this.onSubmit.bind(this)}>
                                    <i className="fa fa-shopping-cart"/>
                                    &nbsp; Add to cart
                                </ButtonDefault>
                            </div>
                            <h4 className="food-description text-secondary mt-5 mb-2">Description</h4>
                            <p>{food.description}</p>
                        </div>
                    </div>
                    <div className="seller-info shadow-sm p-3 mb-5 bg-white rounded">
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
            );
        } else {
            productContent = <NoResults/>;
        }
        return (
            <div class="food-detail container">
                {productContent}
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
    connect(mapStateToProps, {addToCart, loadAllFoods})(withLayout(FoodDetails))
);
