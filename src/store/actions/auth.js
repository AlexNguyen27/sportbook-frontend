import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, CLEAR_ERRORS, AUTHENTICATE, BASE_URL } from "./types";
import { hera } from "hera-js";

import Swal from "sweetalert2";
import { ROLE } from "../../utils/common";
//LOGIN User
export const loginUser = ({ email, password }) => async (dispatch) => {
  console.log("herer-----------password------", password);

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
    },
    query: `
        query {
          login(email: $email, password: $password) {
            id,
            token,
            email,
            firstName,
            lastName,
            email,
            gender,
            phone,
            address,
            dob,
            avatar,
            role,
            socialNetwork
            extraInfo
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      email,
      password,
    },
  });
  if (errors) {
    // If login fails, set user info to null
    logoutDispatch(dispatch, errors);
    // Set errors
    dispatch({
      type: GET_ERRORS,
      errors: { message: errors[0].message },
    });
  } else {
    const resData = data.login;
    const { token } = resData;
    const userData = { ...resData };
    delete userData.token;
    if (resData.role !== ROLE.user) {
      logoutDispatch(dispatch);
      // Set errors
      dispatch({
        type: GET_ERRORS,
        errors: { message: "Email or password is incorrect!" },
      });
      return;
    }

    dispatch({
      type: AUTHENTICATE,
      user: {
        userInfo: userData,
        isUser: true,
      },
      token,
    });
  }
};

//Logout User
export const logoutUser = () => (dispatch) => {
  // Set user info to null
  logoutDispatch(dispatch);
};

// Sign up User
export const signUpUser = (isAuthenticated, history, userData) => async (
  dispatch
) => {
  const { email, password, firstName, lastName } = userData;
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
    },
    query: `
        mutation {
          createUser(email: $email, password: $password, role: $role, firstName: $firstName, lastName: $lastName) {
            id,
            email,
            firstName,
            lastName,
            phone,
            gender,
            address,
            dob,
            avatar,
            role,
            socialNetwork 
            extraInfo
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      email,
      password,
      firstName,
      lastName,
      role: "user",
    },
  });
  if (errors) {
    const formatedError = {};
    const error = errors[0].message;
    if (error.includes("Password")) {
      formatedError.password = error;
    }
    if (error.includes("Email")) {
      formatedError.email = error;
    }

    dispatch({
      type: GET_ERRORS,
      errors: { ...formatedError },
    });
  } else {
    dispatch({
      type: CLEAR_ERRORS,
    });
    // using sweetalert2
    Swal.fire({
      position: "center",
      type: "success",
      title: "Login to continue",
      showConfirmButton: false,
      timer: 1500,
    });

    if (!isAuthenticated) {
      history.push("/login");
    }
  }
};

export const loginWithGoogle = (setLoading, setModal, userData) => async (dispatch) => {
  const { email, password, firstName, lastName, avatar } = userData;
  console.log("herer-----------------", userData);
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
    },
    query: `
        mutation {
          createUser(
              email: $email,
              password: $password, 
              role: $role,
              firstName: $firstName,
              lastName: $lastName,
              avatar: $avatar,
            ) {
            id,
            email,
            firstName,
            lastName,
            phone,
            gender,
            address,
            dob,
            avatar,
            role,
            socialNetwork 
            extraInfo
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      email,
      password,
      firstName,
      lastName,
      avatar,
      role: "user",
    },
  });
  if (errors) {
    console.log("register error-=========", errors);
    const formatedError = {};
    const error = errors[0].message;
    if (error.includes("Password")) {
      formatedError.password = error;
    }
    if (error.includes("Email")) {
      formatedError.email = error;
    }

    dispatch({
      type: GET_ERRORS,
      errors: { ...formatedError },
    });
  } else {
      const { data: loginData, errors: loginError } = await hera({
        options: {
          url: BASE_URL,
        },
        query: `
            query {
              login(email: $email, password: $password) {
                id,
                token,
                email,
                firstName,
                lastName,
                email,
                gender,
                phone,
                address,
                dob,
                avatar,
                role,
                socialNetwork
                extraInfo
                createdAt,
                updatedAt
              }
            }
          `,
        variables: {
          email,
          password,
        },
      });

      if (loginError) {
        // If login fails, set user info to null
        logoutDispatch(dispatch, loginError);
        // Set errors
        dispatch({
          type: GET_ERRORS,
          errors: { message: loginError[0].message },
        });
      } else {
        const resData = loginData.login;
        const { token } = resData;
        const userData = { ...resData };
        delete userData.token;
        if (resData.role !== ROLE.user) {
          logoutDispatch(dispatch);
          // Set errors
          dispatch({
            type: GET_ERRORS,
            errors: { message: "Email or password is incorrect!" },
          });
          return;
        }
    
        dispatch({
          type: AUTHENTICATE,
          user: {
            userInfo: userData,
            isUser: true,
          },
          token,
        });
      }
      // close modal
      setModal(false);
    
    dispatch({
      type: CLEAR_ERRORS,
    });
  }

  setLoading(false);
};