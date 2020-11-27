import {
  UNAUTHENTICATE,
  GET_ORDERS,
  ADD_ORDER,
  EDIT_ORDER,
  EDIT_ORDER_STATUS,
  DELETE_ORDER,
} from "../actions/types";

const initialState = {
  orders: {},
};

export default function (state = initialState, action) {
  const { type, orders, selectedId } = action;
  switch (type) {
    case GET_ORDERS:
      return {
        orders: { ...orders },
      };
    case EDIT_ORDER:
    case ADD_ORDER:
      const order = action.order;
      return {
        ...state,
        orders: {
          ...state.orders,
          [order.id]: order,
        },
      };

    case EDIT_ORDER_STATUS:
      const { id, status } = action.orderData;
      const selectedOrder = state.orders[id];
      return {
        ...state.orders,
        orders: { ...state.orders, [id]: { ...selectedOrder, status: status } },
      };
    case DELETE_ORDER:
      const newOrders = state.orders;
      delete newOrders[selectedId];
      return {
        ...state,
        orders: newOrders,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
