import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  CLEAR_ERRORS,
  GET_PRICES,
  ADD_PRICE,
  DELETE_PRICE,
  EDIT_PRICE,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";

export const getPrices = (setLoading, subGroundId) => async (
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
                  prices(subGroundId: $subGroundId) {
                    id
                    price
                    discount
                    endTime
                    startTime
                    subGroundId
                    createdAt
                  }
                }
            `,
    variables: {
      subGroundId,
    },
  });
  if (!errors) {
    const prices = arrayToObject(data.prices);

    dispatch({
      type: GET_PRICES,
      prices,
    });
    setLoading(false);
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const addPrice = (setLoading, priceData) => async (
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
            createPrice(
                price: $price
                discount: $discount
                startTime: $startTime
                endTime: $endTime
                subGroundId: $subGroundId
              ) {
                id
                price
                discount
                endTime
                startTime
                subGroundId
                createdAt
              }
          } 
        `,
    variables: {
      ...priceData,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: ADD_PRICE,
      price: data.createPrice,
    });
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Added successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    logoutDispatch(dispatch, errors);
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: "An error occurred!",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const deletePrice = (setLoading, id) => async (dispatch, getState) => {
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
        deletePrice(id: $id) {
            status,
            message
          }
        } 
      `,
    variables: {
      id,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: DELETE_PRICE,
      selectedId: id,
    });
    Swal.fire({
      position: "center",
      type: "success",
      title: "Deleted successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: "Can't delete this ground cuz it has sub ground!",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const updatePrice = (setLoading, priceData) => async (
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
        updatePrice(
         id: $id
         price: $price
         discount: $discount
         startTime: $startTime
         endTime: $endTime
         subGroundId: $subGroundId
       ) {
            id
            price
            discount
            endTime
            startTime
            subGroundId
            createdAt
        }
      } 
    `,
    variables: {
      ...priceData,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: EDIT_PRICE,
      price: data.updatePrice,
    });
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been save!",
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);
  } else {
    console.log(errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: "Please check the input!",
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);

    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
