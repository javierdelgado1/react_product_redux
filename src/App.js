import React, { Fragment } from "react";
import Header from "./components/Header";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";

//Redux
import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header></Header>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Productos}></Route>
            <Route
              exact
              path="/productos/nuevo"
              component={NuevoProducto}
            ></Route>
            <Route
              exact
              path="/productos/editar/:id"
              component={EditarProducto}
            ></Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
