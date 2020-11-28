import {
  UNAUTHENTICATE,
  GET_GROUNDS,
  SAVE_SELECTED_GROUND,
} from "../actions/types";

const initialState = {
  grounds: {},
  selected_ground: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, grounds } = action;
  switch (type) {
    case GET_GROUNDS:
      return {
        grounds: { ...grounds },
        selected_ground: {},
      };
    case SAVE_SELECTED_GROUND:
      return {
        ...state,
        selected_ground: action.selected_ground,
      };

    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
