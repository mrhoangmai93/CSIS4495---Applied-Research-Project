import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import withLayout from "../../../hocs/front/Layout";
import withAuth from "../../../hocs/withAuth";
import TextField from "../../../components/utilities/inputs/TextField";
import TextAreaField from "../../../components/utilities/inputs/TextAreaField";
import InputWithHintEffect from "../../../components/utilities/inputs/InputWithHintEffect";
import ButtonDefault from "../../../components/utilities/buttons/ButtonDefault";
import ImageUpload from "../../../components/ImageUpload";
// import SelectListGroup from '../common/SelectListGroup';
import isEmpty from "../../../../validation/is-empty";
import "./index.scss";

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayoptinalInput: isEmpty(socials) ? false : true,
      title: isEmpty(title) ? "" : title,
      price: isEmpty(price) ? "" : price,
      quantity: isEmpty(quantity) ? "" : quantity,
      description: isEmpty(description) ? "" : description,
      file: "",
      imagePreviewUrl: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  onSubmit(e) {
    e.preventDefault();

    // const profileData = {
    //   userName: this.state.userName,
    //   website: this.state.website,
    //   bio: this.state.bio,
    //   twitter: this.state.twitter,
    //   facebook: this.state.facebook,
    //   youtube: this.state.youtube,
    //   instagram: this.state.instagram
    // };

    this.props.CreateProduct(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () =>
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });

    reader.readAsDataURL(file);
  }
  render() {
    return (
      <div className="create_seller_profile">
        <div className="container">
          <div className="row">
            <div className="col-8 m-auto">
              <h1 className="text-center">Create A Food</h1>
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
                <TextField
                  placeholder="* Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  info="How many do you Sell"
                />
                <TextField
                  placeholder="* Quantity"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.onChange}
                  info="How many do you Sell"
                />
                <TextAreaField
                  placeholder="Food Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  info="Tell us a little about your food"
                />

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
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(withAuth(withLayout(CreateProduct)))
);
