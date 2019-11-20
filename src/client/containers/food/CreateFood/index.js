import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Switch from "react-switch";
import withLayout from "../../../hocs/front/Layout";
import withAuth from "../../../hocs/withAuth";
import TextField from "../../../components/utilities/inputs/TextField";
import TextAreaField from "../../../components/utilities/inputs/TextAreaField";
import InputWithHintEffect from "../../../components/utilities/inputs/InputWithHintEffect";
import ButtonDefault from "../../../components/utilities/buttons/ButtonDefault";
import ImageUpload from "../../../components/ImageUpload";
import isEmpty from "../../../../validation/is-empty";
import AddressForm from "../../../components/Form/AddressForm";
import {
  createFood,
  updateFood
} from "../../../redux/actions/seller/sellerProfile.action";
import { uploadImage } from "../../../redux/actions/image.action";
import "./index.scss";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    const { food } = this.props.location;
    let tags = "";
    let address = {
      address1: "",
      address2: "",
      city: "",
      zipCode: "",
      state: "",
      phone: ""
    };
    if (food) {
      food.tags.map(tag => (tags += tag + ","));
      address = { ...food.pickingUpAddress };
    }
    this.state = food
      ? { ...food, ...address, tags, imagePreviewUrl: food.images[0] }
      : {
          imagePreviewUrl: "",
          tags: "",
          title: "",
          price: "",
          quantity: "",
          images: [],
          description: "",
          active: true,
          ...address
        };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
  }

  onSubmit(e) {
    e.preventDefault();
    const newAddress = {
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      zipCode: this.state.zipCode,
      state: this.state.state,
      phone: this.state.phone
    };
    const newTags = this.state.tags
      .split(",")
      .filter(item => item.trim() !== "");
    let images = [];
    if (this.props.imageUrl) {
      images.push(this.props.imageUrl);
    } else {
      images.push(this.state.imagePreviewUrl);
    }
    const newFood = {
      images,
      tags: newTags,
      title: this.state.title,
      price: this.state.price,
      quantity: this.state.quantity,
      description: this.state.description,
      active: this.state.active,
      pickingUpAddress: newAddress,
      food_id: this.state._id
    };
    if (this.state._id) {
      this.props.updateFood(newFood, this.props.history);
    } else {
      this.props.createFood(newFood, this.props.history);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    const data = new FormData();
    data.append("file", file);
    this.props.uploadImage(data);

    reader.onloadend = () =>
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
  }
  handleSwitchChange(checked) {
    this.setState({ active: checked });
  }
  render() {
    return (
      <div className="create_seller_profile">
        <div className="container">
          <div className="row">
            <div className="col-8 m-auto">
              <h1 className="text-center">Create/Update A Food</h1>
              <p className="lead text-center">
                Let's get some information about your new food
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <ImageUpload
                  imagePreviewUrl={this.state.imagePreviewUrl}
                  handleImageChange={this.handleImageChange}
                />

                <TextField
                  placeholder="* Food Name"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  info="A name for your food"
                />
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <TextField
                      placeholder="* Price"
                      name="price"
                      value={this.state.price}
                      onChange={this.onChange}
                      info="How much do you Sell"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <TextField
                      placeholder="* Quantity"
                      name="quantity"
                      value={this.state.quantity}
                      onChange={this.onChange}
                      info="How many do you Sell"
                    />
                  </div>
                </div>

                <TextAreaField
                  placeholder="Food Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  info="Tell us a little about your food"
                />
                <TextField
                  placeholder="Tags"
                  name="tags"
                  value={this.state.tags}
                  onChange={this.onChange}
                  info="Tags are speparated by comma"
                />
                <fieldset class="shipping-fields">
                  <legend class="shipping-fields">Picking Up Address</legend>
                  <AddressForm data={this.state} onChange={this.onChange} />
                </fieldset>
                <p className="create_food_active">
                  Active: {"   "}
                  <Switch
                    onChange={this.handleSwitchChange}
                    checked={this.state.active}
                    height={22}
                  />
                </p>

                <ButtonDefault>Submit</ButtonDefault>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProduct.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  createFood: PropTypes.func.isRequired,
  updateFood: PropTypes.func.isRequired,
  imageUrl: PropTypes.string
};

const mapStateToProps = state => ({
  imageUrl: state.image.get("url")
});

export default withRouter(
  connect(mapStateToProps, { createFood, updateFood, uploadImage })(
    withAuth(withLayout(CreateProduct))
  )
);
