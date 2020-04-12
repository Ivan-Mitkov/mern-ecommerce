import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    //save in the state of Shop
    handleFilters(event.target.value);
    //save in the state of this component
    setValue(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        value={`${p._id}`}
        // only one can be changed with using name
        name={p}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ));
};

export default RadioBox;
