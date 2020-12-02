import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  GET_GROUNDS,
  SAVE_SELECTED_GROUND,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";

export const getGrounds = (setLoading, isAvailable) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;

  let filter = "";
  let variables = {};
  if (isAvailable) {
    filter = "(isAvailable: true)";
    variables = {
      isAvailable,
    };
  }
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
                getAllGrounds${filter} {
                    id
                    title 
                    description
                    phone
                    address,
                    benefit
                    image,
                    createdAt 
                    categoryId
                    isAvailable
                    category {
                      id
                      name
                    }
                }
              }
          `,
    variables: {
      ...variables,
    },
  });
  if (!errors) {
    const grounds = arrayToObject(data.getAllGrounds);

    dispatch({
      type: GET_GROUNDS,
      grounds: { ...grounds },
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
                    comments {
                      id
                      comment
                      userId
                      user {
                        id                        
                        email
                        firstName
                        lastName
                        avatar 
                      }
                      groundId
                      parentId
                      createdAt
                      updatedAt

                    }
                    subGrounds {
                      id
                      name
                      numberOfPlayers
                      groundId
                      createdAt
                      prices {
                        id
                        price
                        discount
                        endTime
                        startTime
                        status
                        subGroundId
                        createdAt
                      }
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
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
  setLoading(false);
};
