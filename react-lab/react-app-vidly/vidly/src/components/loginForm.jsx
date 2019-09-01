import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  // We don't access DOM elements directly in React so to access a form field we need to create a reference
  // but this also discouraged.
  //username = React.createRef();

  // Make it a controlled component.

  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  // Using joi validation we can cleanup code by giving schema
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // Call the server to save the changes
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
