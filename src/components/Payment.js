import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
var jwt = require("jsonwebtoken");
const axios = require("axios");

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
const ProductDisplay = ({ handleClick }) => (
  
    <button type="submit" id="checkout-button" role="link" onClick={handleClick} class="btn btn-danger btn-block btn-sm"><i class="fas fa-shopping-cart fa-lg"></i> Buy</button>
  
);
const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
export default function App(props) {
  const [message, setMessage] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    setId(props.id);
    setName(props.name);
    setPrice(props.price);
    setImage(props.image);
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  const handleClick = async (event) => {
    var decoded = jwt.decode(localStorage.getItem("token"));
    const Cartdata = {
      productId: name,
      userId: decoded.user.email,
      quantity: 1
    };

  await axios.post("http://localhost:5000/cart", Cartdata).then((res) => {
    console.log("res", res);
  });
    
    var decoded = jwt.decode(localStorage.getItem("token"));
    console.log("user", decoded.user.email);
    const data={
      name: name,
      price: price,
      image: image,
      email: decoded.user.email,
    }
    console.log(data)
    const stripe = await stripePromise;
    const response = await fetch("http://localhost:5000/payment/create-checkout-session", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    console.log(response)
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  );
}