import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  GET_SUB_GROUNDS,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";

export const getSubGrounds = (setLoading, groundId) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;

  let subGroundQuery = "";
  let variables = {};
  if (groundId) {
    variables = { ...variables, groundId };
    subGroundQuery += "groundId: $groundId";
  }

  if (subGroundQuery.length > 0) {
    subGroundQuery = `(${subGroundQuery})`;
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
            subGrounds${subGroundQuery} {
              id
              name
              status
              numberOfPlayers
              groundId
              createdAt
            }
          }
      `,
    variables: {
      ...variables,
    },
  });
  if (!errors) {
    const subGrounds = arrayToObject(data.subGrounds);

    dispatch({
      type: GET_SUB_GROUNDS,
      subGrounds,
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