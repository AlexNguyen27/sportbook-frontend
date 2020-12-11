import {
  UNAUTHENTICATE,
  GET_ORDERS,
  SAVE_ORDER_DATA,
  SELECTED_START_DAY,
  SAVE_SELECTED_ORDER_DETAIL,
} from "../actions/types";

const initialState = {
  orders: {},
  orderData: {
    startDay: "",
  },
  selected_order: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, orders } = action;
  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
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
    case SAVE_SELECTED_ORDER_DETAIL:
      return {
        ...state,
        selected_order: action.selected_order,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
