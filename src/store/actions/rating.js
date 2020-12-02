import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  BASE_URL,
  ADD_OR_UPDATE_RATING,
  GET_RATINGS,
} from "./types";
import { hera } from "hera-js";
import Swal from "sweetalert2";

export const getRatings = (setLoading) => async (dispatch, getState) => {
  const {
    auth: { token },
    ground: {
      selected_ground: { id: groundId },
    },
  } = getState();

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
                ratings(groundId: $groundId) {
                    userId
                    groundId
                    point
                  }
            }
        `,
    variables: {
      groundId,
    },
  });
  if (!errors) {
    dispatch({
      type: GET_RATINGS,
      ratings: [...data.ratings],
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

export const addOrUpdateRating = (setLoading, point, groundId) => async (
  dispatch,
  getState
) => {
  const {
    token,
    user: { id: userId },
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
      mutation {
        createOrUpdateRating(
          userId: $userId, 
          groundId: $groundId,
          point: $point
        ) {
          status
          message
        }
      } 
    `,
    variables: {
      userId,
      groundId,
      point,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: ADD_OR_UPDATE_RATING,
      rating: {
        userId,
        groundId,
        point,
      },
    });
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Thanks for your confirmation!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: "An error occurred",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
