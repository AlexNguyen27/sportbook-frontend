import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "../layout/NotFound";

const ProtectedRoute = ({
  component: Component,
  authorized,
  auth: { isAuthenticated, isUser, isAdmin },
  dispatch,
  path,
  ...rest
}) => {
  const teacherUnauthorized = [
    "/users-list",
    "/edit-user/:userId",
    "/posts-list",
    "/reports-list",
    "/categories-list",
  ];
  const page = (props) => {
    isAuthenticated = true; // todo fix later
    if (isAuthenticated) {
      isAdmin = true; //todo fix later
      if (isAdmin || (isUser && !teacherUnauthorized.includes(path))) {
        return <Component {...props} dispatch={dispatch} />;
      }

      return (
        <NotFound
          alertText="Unauthorized"
          descriptionText="Sorry, you are not allowed to see this page"
        />
      );
    }
    return <Redirect to="/login" />;
  };

  return (
    <div>
      <Route {...rest} render={(props) => page(props)} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
