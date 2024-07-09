import React from "react";
import "./Expenseform.css"; 

const Expenseform = () => {
  return (
    <div >
      <input type="number" placeholder="Money spent" required />
      <h3>Add Description</h3>
      <input type="text" required />
      <select name="item" id="item">
        <option value="petrol">Petrol</option>
        <option value="Food">Food</option>
        <option value="salary">Salary</option>
      </select>
    </div>
  );
};

export default Expenseform;
