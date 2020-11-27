import { UNAUTHENTICATE } from "../store/actions/types";
// eslint-disable-next-line import/no-anonymous-default-export
export default (dispatch, error = null) => {
  if (
    !error ||
    (error.extensions && error[0].extensions.exception.status === 401)
  ) {
    dispatch({
      type: UNAUTHENTICATE,
    });
  }
};
