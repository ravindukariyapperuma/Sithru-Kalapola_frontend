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

const axios = require("axios");

export class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      price: "",
      image: null,
      categorys: [],
      maincategory: "Oil painting",
      subcategory: "",
      products: [],
      update: false,
      selectID: "",
    };
  }

  componentDidMount() {
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
        console.log(this.state.products);
      }
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };

  OnChangeImage(e) {
    console.log(e.target.files, "$$$$");

    let file = e.target.files[0];

    this.setState({
      image: file,
    });
  }

  // handleUpdate = () => {
  //   let formdataupdate = new FormData();
  //   formdataupdate.set("name", this.state.name);
  //   formdataupdate.set("description", this.state.description);
  //   formdataupdate.set("price", this.state.price);
  //   formdataupdate.set("maincategory", this.state.maincategory);
  //   formdataupdate.set("subcategory", this.state.subcategory);
  //   formdataupdate.set("image", this.state.image);

  //   axios
  //     .patch("http://localhost:5000/product/" + this.state.selectID, formdataupdate)
  //     .then((res) => {
  //       console.log("res", res);
  //       this.setState({
  //         name: "",
  //         description: "",
  //         price: "",
  //         maincategory: "",
  //         subcategory: "",
  //         image: null,
  //         update: false,
  //         selectID: "",
  //       });
  //     });
  // }

  

  handleSubmit = async (event) => {
    event.preventDefault();

    let formdata = new FormData();
    formdata.set("name", this.state.name);
    formdata.set("description", this.state.description);
    formdata.set("price", this.state.price);
    formdata.set("maincategory", this.state.maincategory);
    formdata.set("subcategory", this.state.subcategory);
    formdata.set("image", this.state.image);

    await axios.post("http://localhost:5000/product", formdata).then((res) => {
      console.log("res", res);
      this.setState({
        name: "",
        description: "",
        price: "",
        maincategory: "",
        subcategory: "",
        image: null,
      });
    });
    window.location.reload();
  };

  // async handledelete(id) {
  //   await axios.delete('http://localhost:5000/product/'+id)
  //       .then(res=>console.log(res.data))
  // }

  render() {
    return (
      <div style={{ marginLeft: "4%" }}>
        <MDBRow>
          <MDBCol md="4">
            <h1>Add Products</h1>
            <form onSubmit={this.handleSubmit}>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                    id="name"
                    placeholder="Name"
                  />
                </div>

                <div class="form-group col-md-12">
                  <label for="description">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    value={this.state.description}
                    onChange={this.handleChange}
                    name="description"
                    id="description"
                    placeholder="Description"
                  />
                </div>

                <div class="form-group col-md-12">
                  <label for="price">Price</label>
                  <input
                    type="number"
                    class="form-control"
                    value={this.state.price}
                    onChange={this.handleChange}
                    name="price"
                    id="price"
                    placeholder="Price"
                    readonly
                  />
                </div>

                <div class="form-group col-md-6">
                  <label for="price">Maincategory</label>
                  <select
                    ref="userInput"
                    required
                    className="form-control"
                    name="maincategory"
                    value={this.state.maincategory}
                    onChange={this.handleChange}
                    multiple={false}
                  >
                    <option key="Oil painting" value="Oil painting">
                      Oil painting
                    </option>
                    <option
                      key="Watercolor painting"
                      value="Watercolor painting"
                    >
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

                <div class="form-group col-md-6">
                  <label for="subcategory">Subcategory</label>
                  <select
                    ref="userInput"
                    name="subcategory"
                    className="form-control"
                    value={this.state.subcategory}
                    onChange={this.handleChange}
                    multiple={false}
                  >
                    {this.state.categorys
                      .filter(
                        (categorys) =>
                          categorys.maincategory === this.state.maincategory
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

                <div class="form-group col-md-12">
                  <label for="price">Image</label>
                  <input
                    type="file"
                    class="form-control"
                    onChange={(e) => this.OnChangeImage(e)}
                    name="image"
                    id="image"
                    placeholder="Image"
                  />
                </div>

                <div class="form-group col-md-12">
                  {this.state.update ? (
                    <button
                      class="btn btn-warning btn-md"
                      name="update"
                      onClick={this.handleUpdate}
                    >
                      UPDATE
                    </button>
                  ) : (
                    <button
                      type="submit"
                      class="btn btn-primary btn-md"
                      name="save"
                    >
                      SUBMIT
                    </button>
                  )}

                  <button
                    type="reset"
                    onClick={() =>
                      this.setState({
                        name: "",
                        description: "",
                        price: "",
                        maincategory: "",
                        subcategory: "",
                        image: null,
                        update: false,
                        selectID: "",
                      })
                    }
                    class="btn btn-danger btn-md"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </form>
          </MDBCol>
          <MDBCol md="8">
          <h1>Products List</h1>
            <table class="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Maincategory</th>
                  <th scope="col">Subcategory</th>
                  <th scope="col">Price</th>
                  <th scope="col">Image</th>
                  {/* <th scope="col">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {this.state.products.map((products) => (
                  <tr>
                    <th>{products.name}</th>
                    <td>{products.description}</td>
                    <td>{products.maincategory}</td>
                    <td>{products.subcategory}</td>
                    <td>{products.price}</td>
                    <td width="100px">
                      <img
                        src={"http://localhost:5000/" + products.image}
                        width="100%"
                        // height="180px"
                        class="card-img-top"
                        alt="..."
                      />
                    </td>
                    <td>
                      {/* <button
                        class="btn btn-info btn-sm"
                        name="save"
                        onClick={() =>
                          this.setState({
                            name: products.name,
                            description: products.description,
                            price: products.price,
                            maincategory: products.maincategory,
                            subcategory: products.subcategory,
                            image: products.image,
                            update: true,
                            selectID: products._id,
                          })
                        }
                      >
                        <i class="fa fa-edit"></i>
                      </button> */}
                      {/* <button class="btn btn-danger btn-sm" name="save" onClick={this.handledelete(products._id)}>
                        <i class="fa fa-trash"></i>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default Products;
