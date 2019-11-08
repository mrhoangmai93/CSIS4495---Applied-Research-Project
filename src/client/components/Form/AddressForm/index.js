import React from "react";
import InputWithHintEffect from "../../utilities/inputs/InputWithHintEffect";

const AddressForm = props => (
  <div>
    <InputWithHintEffect
      placeholder="* Address"
      name="address1"
      value={props.data.address1}
      onChange={props.onChange}
    />
    <InputWithHintEffect
      placeholder="Address 2"
      name="address2"
      value={props.data.address2}
      onChange={props.onChange}
    />
    <div class="form-row">
      <div class="form-group col-md-6">
        <InputWithHintEffect
          placeholder="* City"
          name="city"
          value={props.data.city}
          onChange={props.onChange}
        />
      </div>
      <div class="form-group col-md-3">
        <InputWithHintEffect
          placeholder="* State"
          name="state"
          value={props.data.state}
          onChange={props.onChange}
        />
      </div>
      <div class="form-group col-md-3">
        <InputWithHintEffect
          placeholder="* Zip Code"
          name="zipCode"
          value={props.data.zipCode}
          onChange={props.onChange}
        />
      </div>
    </div>

    <InputWithHintEffect
      placeholder="* Phone Number"
      name="phone"
      value={props.data.phone}
      onChange={props.onChange}
    />
  </div>
);

export default AddressForm;
