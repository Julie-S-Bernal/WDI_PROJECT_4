import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";

import TravelsIndex from "../travels/TravelsIndex";
import TravelsShow from "../travels/TravelsShow";
import TravelsNew from "../travels/TravelsNew";
import TravelsEdit from "../travels/TravelsEdit";

import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute exact path="/" component={TravelsIndex} />
      <ProtectedRoute path="/travels/new" component={TravelsNew} />
      <ProtectedRoute path="/travels/:id/edit" component={TravelsEdit} />
      <Route path="/travels/:id" component={TravelsShow} />
    </Switch>
  );
};

export default Routes;
