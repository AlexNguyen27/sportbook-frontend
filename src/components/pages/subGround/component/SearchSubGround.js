import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form } from "reactstrap";
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
