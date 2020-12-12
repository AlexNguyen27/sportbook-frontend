import logoutDispatch from "../../utils/logoutDispatch";
import {
    GET_ERRORS,
    BASE_URL,
    GET_BENEFITS,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";

export const getBenefits = (setLoading) => async (dispatch, getState) => {
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
                  benefits {
                      id, 
                      title,
                      status
                      createdAt
                    }
              }
          `,
        variables: {},
    });
    if (!errors) {
        const benefits = arrayToObject(data.benefits);

        dispatch({
            type: GET_BENEFITS,
            benefits,
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
