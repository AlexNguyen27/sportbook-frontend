import { UNAUTHENTICATE, GET_RATINGS, ADD_OR_UPDATE_RATING } from "../actions/types";

const initialState = {
  ratings: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, ratings } = action;
  switch (type) {
    case GET_RATINGS:
      return {
        ratings: [...ratings],
      };
    case ADD_OR_UPDATE_RATING:
      const { rating } = action;
      // if exits update => add new
      const exitsIndexRate = state.ratings.findIndex(
        (item) =>
          item.groundId === rating.groundId && item.userId === rating.userId
      );
      if (exitsIndexRate > -1) {
        const newRatings = [...state.ratings];
        newRatings[exitsIndexRate] = rating;
        return {
          ratings: [...newRatings],
        };
      }
      return {
        ...state,
        ratings: [...state.ratings, rating],
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
