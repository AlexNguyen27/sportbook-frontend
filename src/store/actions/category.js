import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, BASE_URL, GET_CATEGORIES } from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";

// DONT NEED TO USE AT USE
export const getCategories = (setLoading) => async (dispatch, getState) => {
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
                categories(status: "enable") {
                    id, 
                    name,
                    status
                    createdAt,
                    grounds {
                      id
                      title
                    }
                  }
            }
        `,
    variables: {},
  });
  if (!errors) {
    const categories = arrayToObject(data.categories);

    dispatch({
      type: GET_CATEGORIES,
      categories,
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
