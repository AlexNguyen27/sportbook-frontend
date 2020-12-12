import {
  UNAUTHENTICATE,
  GET_GROUNDS,
  SAVE_SELECTED_GROUND,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
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
        ...state,
        grounds: { ...grounds },
      };
    case SAVE_SELECTED_GROUND:
      return {
        ...state,
        selected_ground: action.selected_ground,
      };

    case EDIT_COMMENT:
    case ADD_COMMENT:
      const selectedGround = state.selected_ground;
      const oldArr = [...selectedGround.comments];
      const commentIndexExit = oldArr.findIndex(
        (item) => item.id === action.comment.id
      );

      // UPDATE OLD COMMENT
      if (commentIndexExit > -1) {
        oldArr[commentIndexExit] = action.comment;
      } else {
        // ADD NEW
        oldArr.unshift(action.comment);
      }

      return {
        ...state,
        selected_ground: {
          ...selectedGround,
          comments: [...oldArr],
        },
      };
    case DELETE_COMMENT:
      const commentId = action.commentId;
      const newArr = state.selected_ground.comments.filter(
        (item) => item.id !== commentId
      );
      return {
        ...state,
        selected_ground: {
          ...state.selected_ground,
          comments: [...newArr],
        },
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
