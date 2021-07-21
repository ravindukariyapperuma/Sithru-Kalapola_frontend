import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import swal from "sweetalert";

var jwt = require("jsonwebtoken");
const axios = require("axios");


export class loginregisterForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      email: "",
      password: "",
      success: false,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.email === "" && this.state.password === "") {
      swal(
        "validation error detected",
        "You must fill in all of the fields",
        "error"
      );
    } else {
      this.checkAuthorization();
    }
  };

  async checkAuthorization() {
    
      const data = {
        email: this.state.email,
        password: this.state.password,
      };
      try {
        const responce = await axios({
          method: "post",
          url: "http://localhost:5000/auth",
          data: data,
        });
  
        if (responce.data.massage === "UNAUTHORIZED") {
          swal(
            "Invalid login",
            "please try again",
            "error"
          );
        } else if (responce.data.massage === "AUTHORIZED") {
          localStorage.setItem("token", responce.data.token);
          var decoded = jwt.decode(localStorage.getItem("token"));
          console.log("user", decoded);
          this.setState({ success: true });
          swal("login successful", "your login successful", "success");
        } else {
          swal(
            "Invalid login",
            "please try again",
            "error"
          );
        }
      } catch (ex) {
        console.log(ex);
      }
    
  }
  
  render() {
    if (this.state.success) {
      return <Redirect to={"/Home"} />;
    } else if (this.state.register) {
      return <Redirect to={"/"} />;
    }
    return (
      <div>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <div class="form-outline mb-4">
            <label class="form-label" for="form1Example1">
              Email address
            </label>
            <input type="email" id="form1Example1" name="email" value={this.state.email}
            onChange={this.handleChange} class="form-control" />
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="password">
              Password
            </label>
            <input type="password" value={this.state.password}
            onChange={this.handleChange} id="form1Example2" name="password" class="form-control" />
          </div>

          <div class="row mb-4">
            <div class="col d-flex justify-content-center">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="form1Example3"
                  checked
                />
                <label class="form-check-label" for="form1Example3">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>

            <div class="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default loginregisterForm;
