import React, { Component } from "react";
import Header from "./navigation/Header";
import Footer from "./navigation/Footer";
import './card1.css';
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
import Line from './loginRegister/side.png';
import Payment from "./Payment";
const axios = require("axios");
var jwt = require("jsonwebtoken");

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorys: [],
      subcategory: "All",
      maincategory: "All",
      products: [],
    };
  }

  componentDidMount() {
    // var values = queryString.parse(this.props.location.search)
    // console.log(this.props.location.search)
    // console.log(values.username)
    // this.setState({
    // username: values.username,
    // maincategory: values.maincategory,
    // })

    axios.get("http://localhost:5000/category").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          categorys: response.data.map((categorys) => categorys),
        });
      }
      
    });

    axios.get("http://localhost:5000/product").then((response) => {
        
      if (response.data.length > 0) {
        this.setState({
            products: response.data.map((products) => products),
        });
        console.log(this.state.products)
      }
      
    });
  }

  OnChangesubcategory = (event) => {
    this.setState({
      subcategory: event.target.value,
    });
  };

  OnChangemaincategory = (event) => {
    this.setState({
      maincategory: event.target.value,
      subcategory: "All",
    });
  };

  render() {
    const { subcategory, maincategory } = this.state;
    return (
      <div>
        <Header />
        
          <MDBRow style={{background: '#84FFFF', paddingTop: "1%", paddingBottom:'1%',paddingLeft:'10%'}}>
            <MDBCol md="6">
              <div className="texboxwidth" style={{ width: "70%" }}>
                <label htmlFor="exampleInput">Product Main Category</label>
                <select
                  ref="userInput"
                  required
                  className="form-control"
                  value={this.state.maincategory}
                  onChange={this.OnChangemaincategory}
                  multiple={false}
                >
                  <option key="All" value="All">
                    All
                  </option>
                  <option key="Oil painting" value="Oil painting">
                    Oil painting
                  </option>
                  <option key="Watercolor painting" value="Watercolor painting">
                    Watercolor painting
                  </option>
                  <option key="Pastel painting" value="Pastel painting">
                    Pastel painting
                  </option>
                  <option key="Other" value="Other">
                    Other
                  </option>
                </select>
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="texboxwidth" style={{ width: "70%" }}>
                <label htmlFor="exampleInput">Product Sub Category</label>
                <select
                  ref="userInput"
                  required
                  className="form-control"
                  value={this.state.subcategory}
                  onChange={this.OnChangesubcategory}
                  multiple={false}
                >
                  <option key="All" value="All">
                    All
                  </option>
                  {this.state.categorys
                    .filter(
                      (categorys) => categorys.maincategory === maincategory
                    )
                    .map(function (categorys) {
                      return (
                        <option key={categorys.name} value={categorys.name}>
                          {categorys.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </MDBCol>
          </MDBRow>
          <br/>
          <MDBContainer>
            {(this.state.maincategory === 'All') ? (
              <MDBRow>
              {this.state.products.map(products => (
                  
                  <MDBCol md="4">
                    <div
                      class="card1"
                      
                    >
                      <img
                        src={"http://localhost:5000/"+products.image}
                        width="100%"
                        height="180px"
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <h5 class="card-title"><h2>{products.name}</h2></h5>
                        <p class="card-text">
                            {products.description}
                         
                          <div class="row">
                            <div class="col-md-6">
                            <span class="badge bg-success">{products.maincategory}</span>
                            </div>
                            <div class="col-md-6">
                              <span class="badge bg-primary">{products.subcategory}</span>
                            </div>
                          </div>
                        </p>

                        <MDBRow>
                            <MDBCol md="6">
                            <b>US$ {products.price}</b>
                            </MDBCol>
                            <MDBCol md="6">
                            <Payment id={products._id} name={products.name} price={products.price} image={products.image} />
                            </MDBCol>
                        </MDBRow>
      
                        
                      </div>
                    </div>
                  </MDBCol>
                
              ))}
              
              
              </MDBRow>
            ):(
              <span>
              {(this.state.subcategory === 'All') ? (
                <MDBRow>
                    {this.state.products.filter(products => products.maincategory === maincategory).map(products => (
                        
                        <MDBCol md="4">
                          <div
                            class="card1"
                            
                          >
                            <img
                              src={"http://localhost:5000/"+products.image}
                              width="100%"
                              height="180px"
                              class="card-img-top"
                              alt="..."
                            />
                            <div class="card-body">
                              <h5 class="card-title"><h2>{products.name}</h2></h5>
                              <p class="card-text">
                                  {products.description}
                               
                                <div class="row">
                                  <div class="col-md-6">
                                  <span class="badge bg-success">{products.maincategory}</span>
                                  </div>
                                  <div class="col-md-6">
                                    <span class="badge bg-primary">{products.subcategory}</span>
                                  </div>
                                </div>
                              </p>
  
                              <MDBRow>
                                  <MDBCol md="6">
                                  <b>US$ {products.price}</b>
                                  </MDBCol>
                                  <MDBCol md="6">
                                  <Payment id={products._id} name={products.name} price={products.price} image={products.image} />
                                  </MDBCol>
                              </MDBRow>
            
                              
                            </div>
                          </div>
                        </MDBCol>
                      
                    ))}
                    
                    
                    </MDBRow>
            ):(
              
  <MDBRow>
                    {this.state.products.filter(products => products.maincategory === maincategory&& products.subcategory === subcategory).map(products => (
                        
                        <MDBCol md="4">
                          <div
                            class="card1"
                            
                          >
                            <img
                              src={"http://localhost:5000/"+products.image}
                              width="100%"
                              height="180px"
                              class="card-img-top"
                              alt="..."
                            />
                            <div class="card-body">
                              <h5 class="card-title"><h2>{products.name}</h2></h5>
                              <p class="card-text">
                                  {products.description}
                               
                                <div class="row">
                                  <div class="col-md-6">
                                  <span class="badge bg-success">{products.maincategory}</span>
                                  </div>
                                  <div class="col-md-6">
                                    <span class="badge bg-primary">{products.subcategory}</span>
                                  </div>
                                </div>
                              </p>
  
                              <MDBRow>
                                  <MDBCol md="6">
                                  <b>US$ {products.price}</b>
                                  </MDBCol>
                                  <MDBCol md="6">
                                  <Payment id={products._id} name={products.name} price={products.price} image={products.image} />
                                  </MDBCol>
                              </MDBRow>
            
                              
                            </div>
                          </div>
                        </MDBCol>
                      
                    ))}
                    
                    
                    </MDBRow>
            )}
            </span>
            )}
          
          
        </MDBContainer>
        <Footer />
      </div>
    );
  }
}

export default Home;
