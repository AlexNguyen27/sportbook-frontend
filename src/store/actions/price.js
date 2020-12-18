import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, BASE_URL, GET_PRICES } from "./types";
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
