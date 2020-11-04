import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";

// Route
import NotFound from "../layout/NotFound";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
// import Courses from '../pages/courses/Courses';
import DashBoard from "../pages/DashBoard";
import ProtectedRoute from "../custom/ProtectedRoute";
import ResetPassword from "../pages/auth/ResetPassword";
import HomePage from "../pagesV2/homePage/HomePage";
import User from "../pagesV2/user/User";

const RouterList = (props) => {
  return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/user/info" component={User} />
        {/* <Route exact path="/reset-password" component={ResetPassword} /> */}
        {/* Admin */}
        {/* <ProtectedRoute exact path="/edit-user/:userId" component={DashBoard} /> */}
        {/* <ProtectedRoute
          exact
          path="/user-profile/:userId"
          component={DashBoard}
        />
        <ProtectedRoute exact path="/posts-list" component={DashBoard} />
        <ProtectedRoute exact path="/users-list" component={DashBoard} />
        <ProtectedRoute exact path="/reports-list" component={DashBoard} />
        <ProtectedRoute exact path="/categories-list" component={DashBoard} /> */}
        {/* User */}
        {/* <ProtectedRoute
          exact
          path="/user-profile/:userId"
          component={DashBoard}
        />
        <ProtectedRoute exact path="/news-feed" component={DashBoard} />
        <ProtectedRoute exact path="/people" component={DashBoard} /> */}
        {/* common */}
        {/* <ProtectedRoute exact path="/user-info" component={DashBoard} />
        <ProtectedRoute exact path="/add-new-post" component={DashBoard} />
        <ProtectedRoute exact path="/view-post/:postId" component={DashBoard} />
        <ProtectedRoute exact path="/edit-post/:postId" component={DashBoard} /> */}

        {/* <ProtectedRoute
          exact
          path="/statistics/:userId"
          component={DashBoard}
        />
        <ProtectedRoute exact path="/help" component={DashBoard} />
        <ProtectedRoute exact path="/notifications" component={DashBoard} />
        <ProtectedRoute exact path="/mails" component={DashBoard} /> */}
        <ProtectedRoute component={() => <NotFound center />} />
      </Switch>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(RouterList);
