import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { getActiveUser } from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getActiveUser();
    //console.log(user);
    this.setState({ user });
  }

  handleUserUpdate() {
    const user = getActiveUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route
              path="/movies/:id"
              render={props => {
                // Don't know why, but user in state didn't get update when this route was hit as a result of login
                if (!getActiveUser())
                  return (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: props.location }
                      }}
                    />
                  );
                return <MovieForm {...props} />;
              }}
            />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
