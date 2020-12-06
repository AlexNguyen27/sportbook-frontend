import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_USERS,
  DELETE_USER,
  BASE_URL,
  EDIT_USER_INFO,
  UPLOAD_AVATAR,
  SAVE_EXTRA_INFO,
} from "./types";
import { arrayToObject } from "../../utils/commonFunction";
import { hera } from "hera-js";
import Swal from "sweetalert2";
import logoutDispatch from "../../utils/logoutDispatch";

export const getUsers = ({ role }, setLoading) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
          query {
            users(role: $role){
              id
              email
              firstName
              lastName
              phone
              role
              gender
              address
              dob
              avatar
              extraInfo
              socialNetwork
            }
          }
        `,
    variables: {
      role,
    },
  });

  if (!errors) {
    const usersListObj = arrayToObject(data.users);

    dispatch({
      type: GET_USERS,
      users: usersListObj,
    });

    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

// GET majors data
export const getUserInfo = (setLoading) => async (dispatch, getState) => {
  const {
    token,
    user: { id: authUserId },
  } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
          query {
            getUserById(id: $id) {
              id,
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
              extraInfo
              socialNetwork
              createdAt,
              updatedAt
            }   
          }
        `,
    variables: {
      id: authUserId,
    },
  });

  if (!errors) {
    // if (authUserId === userId) {
    // dispatch({
    //   type: SAVE_CURRENT_USER,
    //   currentUser: data.getUserById,
    // });

    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const updatePassword = (
  setLoading,
  currentPassword,
  newPassword,
  confirmPassword,
  userId
) => async (dispatch, getState) => {
  const state = getState();
  const {
    auth: {
      token,
      user: { id: authId },
    },
  } = state;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
        mutation {
          changePassword(
            ${userId ? `id: ${userId}` : ""} 
            currentPassword: $currentPassword, 
            newPassword: $newPassword, 
            confirmPassword: $confirmPassword
          ) {
            status
            message
          }
        }
      `,
    variables: {
      currentPassword,
      newPassword,
      confirmPassword,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    setLoading(false);

    const { message } = errors[0];

    const error = {};
    if (message.includes("Current password")) {
      error.currentPassword = message;
    } else if (message.includes("Password")) {
      error.newPassword = message;
    } else if (message.includes("Confirm password")) {
      error.confirmPassword = message;
    } else {
      Swal.fire({
        position: "center",
        type: "Error",
        title: message,
        showConfirmButton: true,
      });
    }

    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: { ...error },
    });
  }
};

export const editUserInfo = (setLoading, userData, userId) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const {
    auth: {
      token,
      user: { id: authId },
    },
  } = state;

  const {
    firstName,
    lastName,
    address,
    dob,
    email,
    phone,
    gender,
    regionCode,
    districtCode,
    wardCode,
  } = userData;

  console.log("e000000000--------------", userData);
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
          mutation {
            updateUser(
              id: $id,
              firstName: $firstName,
              lastName: $lastName,
              phone: $phone, 
              email: $email,
              dob: $dob,
              address: $address
              regionCode: $regionCode,
              districtCode: $districtCode, 
              wardCode: $wardCode
              gender: $gender
              extraInfo: $extraInfo
              socialNetwork: $socialNetwork
              ) {
                id
                email
                firstName
                lastName
                phone
                gender
                address
                dob
                extraInfo
                socialNetwork
                avatar
                createdAt
                updatedAt
            }
          }
        `,
    variables: {
      id: userId,
      firstName,
      lastName,
      phone,
      dob,
      address,
      email,
      regionCode,
      districtCode,
      wardCode,
      gender,
      extraInfo: {},
      socialNetwork: {},
    },
  });

  if (!errors) {
    const res = data.updateUser;

    dispatch({
      type: EDIT_USER_INFO,
      newUser: res,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    console.log("hrer------------------------", errors);
    const error = errors[0].extensions.payload
      ? errors[0].extensions.payload
      : errors[0].message;
    const formatedError = {};
    if (errors[0].extensions.payload) {
      Object.keys(error).map((key) => {
        formatedError[key] = error[key].message;
      });
    }

    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: { ...formatedError },
    });
    setLoading(false);
  }
};

export const editExtraInfo = (setLoading, socialNetwork, extraInfo) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const {
    auth: {
      token,
      user: { id, email },
    },
  } = state;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
          mutation {
            updateUser(
              id: $id,
              email: $email
              extraInfo: $extraInfo
              socialNetwork: $socialNetwork
              ) {
                id
                extraInfo
                socialNetwork
            }
          }
        `,
    variables: {
      id,
      email,
      extraInfo,
      socialNetwork,
    },
  });

  if (!errors) {
    const res = data.updateUser;
    dispatch({
      type: SAVE_EXTRA_INFO,
      extra: {
        extraInfo: res.extraInfo,
        socialNetwork: res.socialNetwork,
      },
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
  setLoading(false);
};

export const deleteUser = (setLoading, userId) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
          mutation {
            deleteUser(id: $id) {
             status
             message
            }
          }
        `,
    variables: {
      id: userId,
    },
  });

  if (!errors) {
    dispatch({
      type: DELETE_USER,
      selectedId: userId,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    // using sweetalert2
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

//
export const uploadAvatar = (setLoading, avatar, userId) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
          mutation {
            uploadAvatar(
              avatar: $avatar
              userId: $userId
            ) {
              id
              avatar
            }
          }
        `,
    variables: {
      avatar,
      userId,
    },
  });

  if (!errors) {
    dispatch({
      type: UPLOAD_AVATAR,
      uploadData: {
        userId,
        avatar,
      },
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Uploaded successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
