import React from "react";

const SelectList = props => {
  const { name, label, options, value, error, onChange } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="custom-select"
      >
        <option value=""></option>
        {options.map(opt => (
          <option key={opt._id} value={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectList;
