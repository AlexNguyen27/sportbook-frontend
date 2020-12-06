import React, { useState } from "react";
import { connect } from "react-redux";
import TextFieldInput from "../../../custom/TextFieldInputWithheader";
import { Row, Col } from "reactstrap";
import { EXTRA_INFO_LABEL } from "../../../../utils/common";

// todo SAVE TO JSON
const ExtraInfoForm = ({ errors, formData, onChange }) => {
  return (
    <>
      <h4 className="text-center mb-0">Extra information</h4>
      <Row className="mt-2">
        {Object.keys(formData).map((key) => (
          <Col xs={key === "teamName" ? 12 : 6}>
            <TextFieldInput
              header={EXTRA_INFO_LABEL[key]}
              id="outlined-multiline-flexible"
              name={key}
              label={EXTRA_INFO_LABEL[key]}
              // placeHolder={EXTRA_INFO_LABEL[key]}
              fullWidth
              value={formData[key]}
              onChange={onChange}
              // placeHolder="Enter play role"
              error={errors[key]}
              variant="outlined"
              size="small"
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, {})(ExtraInfoForm);
