import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ButtonDefault from "../../utilities/buttons/ButtonDefault";
import AddressComponent from "../AddressComponent";
import "./index.scss";
const AddressContent = props => {
  const { address, phone } = props;
  return (
    <section className="address-section">
      <h5 className="display-5 text-center">Your Address</h5>
      <table className="table table-hover ">
        <AddressComponent address={address} phone={phone} />
      </table>
      <div className="btn-group mb-4" role="group">
        <Link to={{ pathname: "/account/edit-address", address, phone }}>
          <ButtonDefault>
            <i className="fas fa-map-marker-alt mr-1" />
            Edit Address
          </ButtonDefault>
        </Link>
      </div>
    </section>
  );
};
AddressContent.propTypes = {
  address: PropTypes.object.isRequired,
  phone: PropTypes.string
};
export default AddressContent;
