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
// import SelectListGroup from '../common/SelectListGroup';
import { createSellerProfile } from "../../../redux/actions/seller/sellerProfile.action";
import "./index.scss";

class CreateSellerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      userName: "",
      company: "",
      website: "",
      bio: "",
      twitter: "",
      facebook: "",
      youtube: "",
      instagram: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      userName: this.state.userName,
      website: this.state.website,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createSellerProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputWithHintEffect
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
          />

          <InputWithHintEffect
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
          />

          <InputWithHintEffect
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
          />

          <InputWithHintEffect
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
          />

          <InputWithHintEffect
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
          />
        </div>
      );
    }

    return (
      <div className="create_seller_profile">
        <div className="container">
          <div className="row">
            <div className="col-8 m-auto">
              <h1 className="text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="* Profile User Name"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.onChange}
                  info="A unique user Name for your profile URL. Your full name, company name, nickname"
                />
                <TextField
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  info="Could be your own website or a company one"
                />
                <TextAreaField
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <ButtonDefault>Submit</ButtonDefault>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateSellerProfile.propTypes = {
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
    { createSellerProfile }
  )(withAuth(withLayout(CreateSellerProfile)))
);
