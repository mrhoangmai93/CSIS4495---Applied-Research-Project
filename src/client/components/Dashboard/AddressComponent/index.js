import React from "react";

const AddressComponent = props => {
  const { address, phone } = props;
  let address2Content = address.address2 ? (
    <tr>
      <td> {address.address2}</td>
    </tr>
  ) : null;
  return (
    <tbody>
      <tr>
        <td>{address.address1} </td>
      </tr>
      {address2Content}
      <tr>
        <td>{address.city} </td>
      </tr>
      <tr>
        <td>{address.zipCode} </td>
      </tr>
      <tr>
        <td> {address.state}</td>
      </tr>
      <tr>
        <td> {phone}</td>
      </tr>
    </tbody>
  );
};

export default AddressComponent;
