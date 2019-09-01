import React from "react";

const Input = props => {
  const { name, label, value, error, onChange } = props;
  // conditionally render error as well
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type="text"
        className="form-control"
      />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
