import {
  UNAUTHENTICATE,
  GET_ORDERS,
  SAVE_ORDER_DATA,
  SELECTED_START_DAY,
  SAVE_SELECTED_GROUND,
} from "../actions/types";

const initialState = {
  orders: {},
  orderData: {
    startDay: '',
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, orders } = action;
  switch (type) {
    case GET_ORDERS:
      return {
        orders: { ...orders },
      };
    case SAVE_ORDER_DATA:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          ...action.orderData,
        },
      };

    case SELECTED_START_DAY:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          startDay: action.startDay,
        },
      };
    case SAVE_SELECTED_GROUND:
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
