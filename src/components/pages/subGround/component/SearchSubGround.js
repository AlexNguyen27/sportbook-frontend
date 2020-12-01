import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form } from "reactstrap";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DropdownV2 from "../../../custom/DropdownV2";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SubGroundDetail from "./SubGroundDetail";
import AddOrderForm from "./AddOrderForm";

const SearchSubGround = ({ onSubmit, ground }) => {
  return (
    <div>
      <AddOrderForm subGrounds={ground.subGrounds} ground={ground} />
      <SubGroundDetail />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
});
export default connect(mapStateToProps, {})(SearchSubGround);
