import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashBoard";
import Profile from "./user/Profile";
import AdminDashBoard from "./user/AdminDashBoard";
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup"  component={Signup} />
        <Route path="/signin"  component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
