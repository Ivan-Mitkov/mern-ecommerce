import React, { useEffect, useState } from "react";

const Checkbox = ({ categories }) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (c) => () => {
    //find if category in state
    //return first index or -1
    const currentCategoryId = checked.indexOf(c);
    //copy state
    const newCheckedCategoryId = [...checked];
    //if currently checked not in state push in newChecked
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
      //else take off
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
  };
  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        value={checked.indexOf(c._id === -1)}
        onChange={handleToggle(c._id)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{c && c.name}</label>
    </li>
  ));
};

export default Checkbox;
