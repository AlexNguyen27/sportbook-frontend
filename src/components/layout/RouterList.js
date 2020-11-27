import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";

// Route
import NotFound from "../layout/NotFound";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
// import Courses from '../pages/courses/Courses';
import ProtectedRoute from "../custom/ProtectedRoute";
import ResetPassword from "../pages/auth/ResetPassword";
import HomePageUser from "../pages/homePage/HomePageUser";
import User from "../pages/user/User";
import SearchGround from "../pages/ground/SearchGround";
import Main from "../pages/Main";
import Ground from "../pages/ground/Ground";

const RouterList = (props) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => <Main isHome={true} children={<HomePageUser />} />}
      />
      <Route
        exact
        path="/login"
        component={() => <Main children={<Login />} />}
      />
      <Route
        exact
        path="/signup"
        component={() => <Main children={<Signup />} />}
      />
      <ProtectedRoute
        exact
        path="/user/info"
        component={() => <Main children={<User />} />}
      />
      <ProtectedRoute
        exact
        path="/playground"
        component={() => <Main children={<SearchGround />} />}
      />
      <ProtectedRoute
        exact
        path="/ground/:id"
        component={() => <Main children={<Ground />} />}
      />
      <ProtectedRoute component={() => <NotFound center />} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(RouterList);
