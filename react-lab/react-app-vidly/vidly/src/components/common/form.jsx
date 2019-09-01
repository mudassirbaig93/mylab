import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import SelectList from "./selectList";

class Form extends Component {
  // loginForm is sending the actual state
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const res = Joi.validate(this.state.data, this.schema, options);
    //console.log(res);
    if (!res.error) return null;

    const errors = {};
    for (let item of res.error.details) {
      // from above console.log, item.path[0] will give us the field name
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = input => {
    const { name, value } = input;
    const obj = { [name]: value }; // [] refers to ES6 computed property
    const schema = { [name]: this.schema[name] };

    const res = Joi.validate(obj, schema);
    const { error } = res;

    if (!error) return null;
    return error.details[0].message;
    /* Using Joi now
        if (input.name === "username") {
          if (input.value.trim() === "") return "Please provide username.";
          // other rules for username
        }
        if (input.name === "password") {
          if (input.value.trim() === "") return "Please enter password.";
          // other rules for password
        }*/
  };

  handleSubmit = e => {
    // by default it reloads the full page i.e. fetch htm and bundle.js etc
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = e => {
    // validate field
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else delete errors[e.target.name];

    // set state to retain value on text box
    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <SelectList
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
