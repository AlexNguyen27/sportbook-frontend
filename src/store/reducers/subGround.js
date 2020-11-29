import {
  UNAUTHENTICATE,
  GET_SUB_GROUNDS,
  ADD_SUB_GROUND,
  EDIT_SUB_GROUND,
  DELETE_SUB_GROUND,
} from "../actions/types";

const initialState = {
  subGrounds: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, subGrounds, selectedId } = action;
  switch (type) {
    case GET_SUB_GROUNDS:
      return {
        subGrounds: { ...subGrounds },
      };
    case EDIT_SUB_GROUND:
    case ADD_SUB_GROUND:
      const subGround = action.subGround;
      return {
        ...state,
        subGrounds: {
          ...state.subGrounds,
          [subGround.id]: subGround,
        },
      };
    case DELETE_SUB_GROUND:
      const newSubGrounds = state.subGrounds;
      delete newSubGrounds[selectedId];
      return {
        ...state,
        subGrounds: newSubGrounds,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
