import { UNAUTHENTICATE, SAVE_PAYMENT_METHOD } from "../actions/types";

const initialState = {
  paymentMethod: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, paymentMethod } = action;
  switch (type) {
    case SAVE_PAYMENT_METHOD:
      return {
        paymentMethod,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
