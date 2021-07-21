import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
} from "mdbreact";
import ProductImg from "./AddProduct.png";
import OrderImg from "./ManageOrders.png";
import CategoryImg from "./AddCategory.png";
import Side1 from "./side1.1.png";
import Side2 from "./side1.2.png";
import "./admin.css";
import Products from "./Products";

export class admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "products",
    };
  }

  productsClick = () => {
    this.setState({
      status: "products",
    });
  };

  ordersClick = () => {
    this.setState({
      status: "orders",
    });
  };

  categorysClick = () => {
    this.setState({
      status: "categorys",
    });
  };

  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#4285F4", height: "40px" }}>
          <MDBRow>
            <MDBCol>
              <h1 style={{ color: "white" }}>Sithru Admin</h1>
            </MDBCol>
            <MDBCol></MDBCol>
            <MDBCol>Logout</MDBCol>
          </MDBRow>
        </div>

        <MDBRow>
          <MDBCol md="3">
            <img src={Side1} width="85%" />
          </MDBCol>
          <MDBCol md="6">
            <MDBRow>
              <MDBCol md="4">
                <img
                  src={ProductImg}
                  className="div2"
                  width="100%"
                  onClick={this.productsClick}
                  alt=""
                />
              </MDBCol>
              <MDBCol md="4">
                <img
                  src={OrderImg}
                  className="div2"
                  width="100%"
                  onClick={this.ordersClick}
                  alt=""
                />
              </MDBCol>
              <MDBCol md="4">
                <img
                  src={CategoryImg}
                  className="div2"
                  width="100%"
                  onClick={this.categorysClick}
                  alt=""
                />
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md="3">
            <div style={{ textAlign: "end" }}>
              <img src={Side2} width="85%" />
            </div>
          </MDBCol>
        </MDBRow>
        <br />
        <div style={{backgroundColor:'#fff'}}>
        <br/>
                    {this.state.status === "products" ? (
                        <div><Products /></div>
                    )
                    : this.state.status === "orders" ? (
                        <div>B</div>
                    ) : (
                        <div>C</div>
                    )}
                </div>
                <br/>
      </div>
      
    );
  }
}

export default admin;
