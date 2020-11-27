import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import user from "./user";
import category from "./category";
import benefit from "./benefit";
import ground from "./ground";
import subGround from "./subGround";
import price from "./price";
import order from "./order";
import loyalCustomer from "./loyalCustomer";
// import statistic from "./statistic";
import history from "./history";

export default combineReducers({
  errors,
  auth,
  user, // todo: remove user here
  benefit,
  category,
  ground,
  subGround,
  price,
  order,
  loyalCustomer,
  history,
});
