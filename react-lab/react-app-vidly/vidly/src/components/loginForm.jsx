import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  // We don't access DOM elements directly in React so to access a form field we need to create a reference
  // but this also discouraged.
  //username = React.createRef();

  // Make it a controlled component.

  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required";
    if (account.password.trim() === "") errors.password = "Passwod is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    // by default it reloads the full page i.e. fetch htm and bundle.js etc
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // Call the server to save the changes

    console.log("Submitted");
  };

  validateProperty = input => {
    if (input.name === "username") {
      if (input.value.trim() === "") return "Please provide username.";
      // other rules for username
    }
    if (input.name === "password") {
      if (input.value.trim() === "") return "Please enter password.";
      // other rules for password
    }
  };

  handleChange = e => {
    // validate field
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else delete errors[e.target.name];

    // set state to retain value on text box
    const account = { ...this.state.account };
    account[e.target.name] = e.target.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
