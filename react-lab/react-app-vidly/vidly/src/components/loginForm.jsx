import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login, performLogin, getActiveUser } from "../services/authService";
import Redirect from "react-router-dom/Redirect";

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
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      console.log("Submit Clicked");
      const { data: jwt } = await login(this.state.data);
      performLogin(jwt);
      //this.props.history.push("/");
      // We are displaying username in App component which only renders once at the begining so we need to do full app reload at this point
      // passing location from router
      const { state } = this.props.location;
      const new_loc = state && state.from.pathname ? state.from.pathname : "/";
      console.log("new loc: ", new_loc);
      window.location = new_loc;
    } catch (ex) {
      if (ex.response && ex.response === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getActiveUser()) return <Redirect to="/" />;
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
