import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  BASE_URL,
  DELETE_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
} from "./types";
import { hera } from "hera-js";
import Swal from "sweetalert2";

export const addComment = (
  setLoading,
  comment,
  groundId,
  parentId = null
) => async (dispatch, getState) => {
  const {
    token,
    user: { id: userId, email, firstName, lastName, avatar },
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
            createComment(
                comment: $comment,
                userId: $userId,
                groundId:  $groundId,
                parentId: $parentId
              ){
                id
                comment
                userId
                groundId
                parentId
                createdAt
                updatedAt
              }
        }
      `,
    variables: {
      comment,
      userId,
      groundId,
      parentId,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    const newComment = {
      ...data.createComment,
      user: {
        email,
        firstName,
        lastName,
        avatar,
      },
    };
    dispatch({
      type: ADD_COMMENT,
      comment: newComment,
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
export const deleteComment = (setLoading, commentId) => async (
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
        deleteComment(id: $id) {
          status
          message
        }
      }
    `,
    variables: {
      id: commentId,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: DELETE_COMMENT,
      commentId,
    });
    Swal.fire({
      position: "center",
      type: "success",
      title: "Comment deleted  successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);
  } else {
    logoutDispatch(dispatch, errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: errors[0].message,
      showConfirmButton: true,
    });
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const updateComment = (setLoading, commentId, comment) => async (
  dispatch,
  getState
) => {
  const {
    token,
    user: { id: userId, email, firstName, lastName, avatar },
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
        updateComment(
          id: $id
          comment: $comment,
        ){
          id
          comment
          userId
          groundId
          parentId
          createdAt
          updatedAt
        }
      } 
    `,
    variables: {
      id: commentId,
      comment,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    const newComment = {
      ...data.updateComment,
      user: {
        email,
        firstName,
        lastName,
        avatar,
      },
    };
    dispatch({
      type: EDIT_COMMENT,
      comment: newComment,
    });
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been save!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      position: "center",
      type: "Warning",
      title: errors[0].message,
      showConfirmButton: true,
    });
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
