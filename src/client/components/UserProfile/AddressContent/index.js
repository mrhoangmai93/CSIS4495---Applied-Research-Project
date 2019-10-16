import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ButtonDefault from "../../utilities/buttons/ButtonDefault";
import "./index.scss";
const AddressContent = props => {
  const { address, phone } = props;
  return (
    <section className="address-section">
      <h5 className="display-5 text-center">Your Address</h5>
      <table className="table table-hover ">
        <tbody>
          <tr>
            <td>
              <strong>Address</strong>
            </td>
            <td>{address.address1} </td>
          </tr>
          <tr>
            <td>
              <strong>Address 2</strong>
            </td>
            <td> {address.address2 ? address.address2 : ""}</td>
          </tr>
          <tr>
            <td>
              <strong>City</strong>
            </td>
            <td>{address.city} </td>
          </tr>
          <tr>
            <td>
              <strong>Zip Code</strong>
            </td>
            <td>{address.zipCode} </td>
          </tr>
          <tr>
            <td>
              <strong>State/Province</strong>
            </td>
            <td> {address.state}</td>
          </tr>
          <tr>
            <td>
              <strong>Phone</strong>
            </td>
            <td> {phone}</td>
          </tr>
        </tbody>
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
