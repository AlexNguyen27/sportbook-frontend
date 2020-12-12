import { UNAUTHENTICATE, GET_CATEGORIES } from "../actions/types";

const initialState = {
  categories: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, categories } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        categories: { ...categories },
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
