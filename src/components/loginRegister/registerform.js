import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
} from "mdbreact";
import swal from "sweetalert";
const axios = require("axios");

export class registerform extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        if (
          this.state.name === "" &&
          this.state.email === "" &&
          this.state.password === "" &&
          this.state.confirmPassword === ""
        ) {
          swal(
            "validation error detected",
            "You must fill in all of the fields",
            "error"
          );
        } else if (this.state.name === "") {
          swal(
            "validation error detected",
            "You must fill your name field",
            "error"
          );
        } else if (this.state.email === "") {
          swal("validation error detected", "You must fill email field", "error");
        } else if (this.state.password === "") {
          swal(
            "validation error detected",
            "You must fill password field",
            "error"
          );
        } else if (this.state.confirmPassword === "") {
          swal(
            "validation error detected",
            "You must fill repeat password field",
            "error"
          );
        } else if (this.state.password !== this.state.confirmPassword) {
          swal("validation error detected", "Repeat password incorrect", "error");
        } else {
          this.sendData();
        }
      };
    
      async sendData() {
        const data = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        };
        try {
          const responce = await axios({
            method: "post",
            url: "http://localhost:5000/users",
            data: data,
          });
          console.log(responce);
          if (responce.data.message === "ALREADYTAKEN") {
            swal(
              "email already taken",
              "Please register with another email",
              "error"
            );
          } else if (responce.status === 201) {
            this.setState({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            swal(
              "registration successful",
              "Now please login our system",
              "success"
            );
          } else {
          }
        } catch (ex) {
          console.log(ex);
        }
      }
    
  render() {
    return (
      <div>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <h1 style={{ textAlign: "center" }}>Register</h1>
          <div class="form-outline mb-4">
            <label class="form-label" for="name">
              Name
            </label>
            <input
              type="text"
              value={this.state.name}
            onChange={this.handleChange}
              name="name"
              id="name"
              class="form-control"
              
            />
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="registerEmail">
              Email
            </label>
            <input
              type="email"
              value={this.state.email}
            onChange={this.handleChange}
              id="email"
              name="email"
              class="form-control"
              
            />
          </div>

          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <label class="form-label" for="password">
                  Password
                </label>
                <input
                  type="password"
                  value={this.state.password}
            onChange={this.handleChange}
                  id="password"
                  name="password"
                  class="form-control"
                  
                />
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <label class="form-label" for="confirmPassword">
                  Repeat password
                </label>
                <input
                  type="password"
                  value={this.state.confirmPassword}
            onChange={this.handleChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  class="form-control"
                  
                />
              </div>
            </div>
          </div>

          <div class="form-check d-flex justify-content-center mb-4">
            <MDBRow>
              <MDBCol md="1">
                <input
                  class="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="registerCheck"
                  checked
                  aria-describedby="registerCheckHelpText"
                />
              </MDBCol>
              <MDBCol md="11">
                <label class="form-check-label" for="registerCheck">
                  I have read and agree to the terms
                </label>
              </MDBCol>
            </MDBRow>
          </div>

          <button type="submit" class="btn btn-primary btn-block">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default registerform;
