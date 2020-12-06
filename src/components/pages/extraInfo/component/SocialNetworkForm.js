import React, { useState } from "react";
import { connect } from "react-redux";
import TextFieldInput from "../../../custom/TextFieldInputWithheader";
import { Row, Col } from "reactstrap";
import { SOCIAL_NETWORK_LABEL } from "../../../../utils/common";

const SocialNetworkForm = ({ errors, formData, onChange }) => {
  return (
    <>
      <h4 className="text-center mt-4 mb-0">Social network</h4>
      <Row>
        {Object.keys(formData).map((key) => (
          <Col xs={12}>
            <TextFieldInput
              header={SOCIAL_NETWORK_LABEL[key]}
              id="outlined-multiline-flexible"
              name={key}
              label={SOCIAL_NETWORK_LABEL[key]}
              fullWidth
              value={formData[key]}
              onChange={onChange}
              placeHolder="Enter play role"
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
export default connect(mapStateToProps, {})(SocialNetworkForm);
