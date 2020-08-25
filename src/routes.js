import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import ProductList from "./components/products/ProductList";
import OrderSummary from "./components/order/OrderSummary";
import Checkout from "./components/checkout/Checkout";
import PrivateRoute from "./components/common/PrivateRoute";
import ProductDetail from "./components/products/ProductDetail";
import Profile from "./components/profile/Profile";
import PageNotFound from "./components/common/PageNotFound";
import ResetPassword from "./components/authentication/ResetPassword";
import ResetPasswordConfirm from "./components/authentication/ResetPasswordConfirm";

const BaseRouter = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={ProductList} />
      <Route
        path="/password/reset/confirm/:uid/:token"
        component={ResetPasswordConfirm}
      />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/products/:productID" component={ProductDetail} />
      <PrivateRoute path="/order-summary" component={OrderSummary} />
      <PrivateRoute path="/checkout" component={Checkout} />
      <PrivateRoute path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route component={PageNotFound} />
    </Switch>
  </Fragment>
);

export default BaseRouter;
