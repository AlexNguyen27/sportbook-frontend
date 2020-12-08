import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Redirect, withRouter, matchPath } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import { validateEmail } from "../../../utils/commonFunction";
import GoogleLoginCustom from "./component/GoogleLoginCustom";

// COMPONENT
import PageTitle from "../../custom/PageTitle";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";

// ACTION
import { signUpUser } from "../../../store/actions/auth";
import { GET_ERRORS } from "../../../store/actions/types";

const useStyles = makeStyles((theme) => ({
  login: {
    paddingTop: "80px",
    minHeight: "594px",
  },
}));

const Signup = ({ errors, auth: { isAuthenticated }, history, signUpUser }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // FORM DATA STATE
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const { email, password, confirmPassword, firstName, lastName } = formData;

  const onSubmit = (e) => {
    e.preventDefault();

    const error = {};

    Object.keys(formData).map((key) => {
      if (!formData[key] || (formData[key] && formData[key].trim() === "")) {
        error[key] = "This field is required";
      }
      if (!error[key] && key === "email" && !validateEmail(formData[key])) {
        error[key] = "Email is invalid";
      }
    });

    if (formData.password !== formData.confirmPassword) {
      error.confirmPassword = "Confirm password is wrong";
    } else {
      if (error.confirmPassword) delete error.confirmPassword;
    }
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      const data = { ...formData };
      delete data.confirmPassword;
      signUpUser(isAuthenticated, history, data);
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <Grid container justify="center" className={classes.login}>
        <Grid item xs={11} sm={6} md={4}>
          <PageTitle title="Create new account" center="true" />
          <Grid container type="flex" spacing={2}>
            <Grid item xs={6}>
              <Button
                className=" w-100"
                variant="contained"
                style={{ backgroundColor: "#3f72af", color: "white" }}
                type="submit"
                size="small"
                startIcon={<i className="fab fa-facebook-f" />}
              >
                Singup with Facebook
              </Button>
            </Grid>
            <Grid item xs={6}>
              <GoogleLoginCustom title={"Signup with google"} />
            </Grid>
          </Grid>
          <form onSubmit={(e) => onSubmit(e)}>
            <Row className="row-margin">
              <Col xs={6}>
                <TextFieldInputWithHeader
                  header="First Name"
                  name="firstName"
                  className="mt-0"
                  fullWidth
                  value={firstName}
                  onChange={onChange}
                  error={errors.firstName}
                  placeholder="Enter First Name"
                  variant="outlined"
                  size="small"
                />
              </Col>
              <Col xs={6}>
                <TextFieldInputWithHeader
                  header="Last Name"
                  name="lastName"
                  className="mt-0"
                  fullWidth
                  value={lastName}
                  onChange={onChange}
                  error={errors.lastName}
                  placeholder="Enter Last Name"
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>

            <TextFieldInputWithHeader
              header="Email"
              name="email"
              className="mt-0"
              fullWidth
              value={email}
              onChange={onChange}
              error={errors.email}
              placeholder="Enter Your Email"
              variant="outlined"
              size="small"
            />

            <TextFieldInputWithHeader
              header="Password"
              name="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              error={errors.password}
              className="mt-0"
              fullWidth
              onChange={onChange}
              size="small"
              variant="outlined"
            />

            <TextFieldInputWithHeader
              header="Confirm password"
              name="confirmPassword"
              placeholder="Enter Confirm password"
              type="password"
              value={confirmPassword}
              error={errors.confirmPassword}
              className="mt-0"
              fullWidth
              variant="outlined"
              size="small"
              onChange={onChange}
            />
            <Col xs={12} sm={8} md={4} style={{ margin: "auto" }}>
              <Button
                className="mt-3 mr-2 w-100"
                variant="contained"
                color="primary"
                type="submit"
                size="small"
              >
                REGISTER
              </Button>
            </Col>
            <div className="text-center">
              <p
                style={{ color: "#00bfd8", cursor: "pointer" }}
                className="mt-3 text-decoration-underline"
                onClick={() => history.push("/login")}
              >
                You already have an account?
              </p>
            </div>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, { signUpUser })(withRouter(Signup));
