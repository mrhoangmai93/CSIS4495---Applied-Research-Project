import React from "react";
import InputWithHintEffect from "../../utilities/inputs/InputWithHintEffect";
import SelectList from "../../utilities/SelectList";
const months = [
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" }
];
const years = [
  { label: "2019", value: "2019" },
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
  { label: "2030", value: "2030" }
];
const PaymentForm = props => (
  <div>
    <InputWithHintEffect
      placeholder="Card Number"
      name="cardNumber"
      value={props.data.cardNumber}
      onChange={props.onChange}
    />
    <InputWithHintEffect
      placeholder="Name On Card"
      name="nameOnCard"
      value={props.data.nameOnCard}
      onChange={props.onChange}
    />
    <div class="form-row">
      <SelectList
        placeholder="Month"
        name="month"
        value={props.data.month}
        onChange={props.onChange}
        options={months}
      />
      <SelectList
        placeholder="Year"
        name="year"
        value={props.data.year}
        onChange={props.onChange}
        options={years}
      />
    </div>
    <InputWithHintEffect
      placeholder="Security Number"
      name="securityNumber"
      value={props.data.securityNumber}
      onChange={props.onChange}
    />
  </div>
);

export default PaymentForm;
