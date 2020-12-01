import {
  UNAUTHENTICATE,
  GET_ORDERS,
  ADD_ORDER,
  EDIT_ORDER,
  EDIT_ORDER_STATUS,
  DELETE_ORDER,
  SAVE_ORDER_DATA,
} from "../actions/types";

const initialState = {
  orders: {},
  orderData: {},
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
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
