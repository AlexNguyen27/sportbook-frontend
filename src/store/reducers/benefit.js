import {
    UNAUTHENTICATE,
    GET_BENEFITS,
  } from "../actions/types";
  
  const initialState = {
    benefits: {},
  };
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    const { type, benefits } = action;
    switch (type) {
      case GET_BENEFITS:
        return {
          benefits: { ...benefits },
        };
      case UNAUTHENTICATE:
        return initialState;
      default:
        return state;
    }
  }
  