import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import category from "./category";
import benefit from "./benefit";
import ground from "./ground";
import subGround from "./subGround";
import price from "./price";
import order from "./order";
import history from "./history";
import payment from "./payment";
import rating from "./rating";

export default combineReducers({
  errors,
  auth,
  benefit,
  category,
  ground,
  subGround,
  price,
  order,
  history,
  payment,
  rating,
});
