import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signUp } from "../../store/actions/authActions";
import Spinner from "../spinner/Spinner";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    const { signUp } = this.props;
    e.preventDefault();
    signUp(this.state);
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { auth, authError, loading } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    if (loading) return <Spinner />;

    return (
      <div className="container section auth-section">
        <div className="row">
          <div className="card col s12 m7">
            <div className="card-content ">
              <h5 className="grey-text text-darken-3">Sign Up</h5>
              <form onSubmit={this.handleSubmit} className="white m-y-20">
                <div className="input-field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="input-field mt-20">
                  <button className="btn waves-effect waves-light">
                    Sign Up
                  </button>
                  {authError ? (
                    <div className="auth-error bolder red-text lighten-3">
                      <p>{authError}</p>
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { authError, loading } = state.auth;
  return {
    authError,
    loading,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (credentials) => dispatch(signUp(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
