import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashBoard";
import Profile from "./user/Profile";
import AdminDashBoard from "./user/AdminDashBoard";
import AdminRoute from './auth/helper/AdminRoutes'
import AddCategory from './admin/AddCategory'
import ManageCategories  from './admin/ManageCategories'
import ManageProducts  from './admin/ManageProducts'
import UpdateProduct  from './admin/UpdateProduct'
import AddProduct from './admin/AddProduct'
import PrivateRoute from './auth/helper/PrivateRoutes'
// import { updateProduct } from "./admin/helper/adminapicall";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup"  component={Signup} />
        <Route path="/signin"  component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute path="/admin/create/category" exact component={AddCategory} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/categories" exact component={ManageCategories} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
        <AdminRoute path="/admin/categories" exact component={ManageCategories} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
