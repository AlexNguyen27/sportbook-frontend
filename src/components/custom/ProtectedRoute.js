import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({
  component: Component,
  authorized,
  auth: { isAuthenticated },
  dispatch,
  path,
  ...rest
}) => {
  const page = (props) => {
    if (isAuthenticated) {
      return <Component {...props} dispatch={dispatch} />;
    }
    return <Redirect to="/" />;
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
