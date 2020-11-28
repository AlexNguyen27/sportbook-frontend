import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  GET_GROUNDS,
  SAVE_SELECTED_GROUND,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";

export const getGrounds = (setLoading) => async (dispatch, getState) => {
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
                grounds {
                    id
                    title 
                    description
                    phone
                    address,
                    benefit
                    image,
                    createdAt 
                    categoryId
                    category {
                      id
                      name
                    }
                }
              }
          `,
    variables: {},
  });
  if (!errors) {
    const grounds = arrayToObject(data.grounds);

    dispatch({
      type: GET_GROUNDS,
      grounds,
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

export const getGroundById = (setLoading, id) => async (dispatch, getState) => {
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
                getGroundById(id: $id) {
                    id
                    title 
                    description
                    phone
                    address,
                    benefit
                    image,
                    createdAt 
                    categoryId
                    category {
                      id
                      name
                    }
                    subGrounds {
                      id
                      name

                    }
                }
              }
          `,
    variables: {
      id,
    },
  });
  if (!errors) {
    dispatch({
      type: SAVE_SELECTED_GROUND,
      selected_ground: data.getGroundById,
    });
    setLoading(false);
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
    setLoading(false);
  }
};
