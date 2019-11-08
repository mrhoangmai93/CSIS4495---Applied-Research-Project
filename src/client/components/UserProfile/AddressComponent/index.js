import React from "react";

const AddressComponent = props => {
  const { address, phone } = props;
  return (
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
  );
};

export default AddressComponent;
