import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
} from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import back1 from "./Reuss.png";
import logo from "./navlogo.png";
import img from "./galery.gif";
import "./login.css";
import Login from "./loginform";
import line from "./line.png";
import Register from "./registerform";
import { Redirect } from "react-router-dom";

export class stage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "login",
    };
  }

  render() {
    if((localStorage.getItem("token"))){
      return <Redirect to={"/Home"} />;
    }
    return (
      <div>
        <MDBRow
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MDBCol
            md="6"
            style={{
              backgroundImage: `url(${back1})`,
              backgroundPosition: "left",
              backgroundSize: "66%",
              backgroundRepeat: "no-repeat",
              //   backgroundAttachment: "fixed",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
             <img src={logo} width="85%" />
             
            
            
          </MDBCol>
          <MDBCol
            md="4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MDBCard
              style={{
                margin: "6%",
                padding: "5%",
                boxShadow: "0 8px 15px 0 rgba(0, 0, 0, 0.5)",
                backgroundImage: `url(${line})`,
                backgroundPosition: "top",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <MDBRow>
                <MDBCol md="12"></MDBCol>
                <br />
                <MDBCol md="12">
                {this.state.type === "login" ? (
                    <span>
                    <Login />
                    <br/>
                    <p align="center">
                <Link onClick={() => this.setState({ type: "register" })}>
                  Don't have an account?
                </Link>
              </p>
              </span>
                ):(
                    <span>
                    <Register />
                    <br/>
                    <p align="center">
                <Link onClick={() => this.setState({ type: "login" })}>
                  Already have an account?
                </Link>
              </p>
                    </span>
                )}
                  
            
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
          <MDBCol
            md="2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default stage;
