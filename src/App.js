import React from 'react'
import {
  BrowserRouter as Router,
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import LoginRegister from './components/loginRegister/stage';
import Home from './components/Home';
import Payment from "./components/Payment"

function App() {
  return (
    <div>
        <BrowserRouter>
          <Switch>
            <Route path={"/"} exact component={LoginRegister} />
            <Route path={"/Home"} exact component={Home} />
            <Route path={"/Payment"} exact component={Payment} />
          </Switch>
        </BrowserRouter>
      </div>
  )
}

export default App
