import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import logo from "../loginRegister/navlogo.png";
const axios = require("axios");
var jwt = require("jsonwebtoken");

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logout: false,
      cart: [],
    }

  }

  componentDidMount() {
    // var values = queryString.parse(this.props.location.search)
    // console.log(this.props.location.search)
    // console.log(values.username)
    // this.setState({
    // username: values.username,
    // maincategory: values.maincategory,
    // })
    var decoded = jwt.decode(localStorage.getItem("token"));
    axios.get("http://localhost:5000/cart").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          cart: response.data.filter(cart => cart.userId === decoded.user.email).map((cart) => cart),
        });
      }
      
    });
  }

  count(){
    const countCart = this.state.cart.length;
    return countCart;
  }


  handelLogout = () => {
    localStorage.clear();
    this.setState({logout: true});
  }
  render() {
    if (this.state.logout) {
      return <Redirect to={"/"} />;
    }

    if(!(localStorage.getItem("token"))){
      return <Redirect to={"/"} />;
    }

    var decoded = jwt.decode(localStorage.getItem("token"));
    console.log("user", decoded.user.email);
    
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container-fluid">
            <span class="navbar-brand">
              {/* <img src={logo} height="30" alt="" loading="lazy" /> */}
              <b>SITHRU KALAPOLA</b>
            </span>
            <button
              class="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                {/* <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="./">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./">
                    Features
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./">
                    Pricing
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link disabled"
                    href="./"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Disabled
                  </a>
                </li> */}
              </ul>
            </div>
            <a class="nav-link" href="./" style={{color:'white'}}> <i class="fas fa-user"></i> {decoded.user.name}</a>
            <div class="">
    <ul class="navbar-nav">
        
      
      <li class="nav-item">
        <a class="nav-link" href="./">
        <span class="badge rounded-pill badge-notification bg-danger">{this.count()}</span>
          <span><i class="fas fa-shopping-cart"></i></span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="./">
        
          <span><i class="fas fa-cog"></i></span>
        </a>
      </li>

    </ul>
  </div>
  
            <a class="nav-link" onClick={() => {this.handelLogout()}} style={{color:'white'}}> <i class="fas fa-sign-out-alt"></i> Logout</a>
          </div>
          
        </nav>
        
      </div>
    );
  }
}

export default Header;
