import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import { Row, Col, Form } from "reactstrap";
import Button from "@material-ui/core/Button";
import TextFieldInputWithHeader from "../../../custom/TextFieldInputWithheader";
import { GET_ERRORS } from "../../../../store/actions/types";
import { clearErrors } from "../../../../store/actions/common";
import { updatePassword } from "../../../../store/actions/user";
import PageLoader from "../../../custom/PageLoader";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

const ChangePassword = ({
  auth: { user },
  updatePassword,
  clearErrors,
  errors,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // PASSWORD STATEs
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
    currentPassword: "",
  });
  const { newPassword, confirmPassword, currentPassword } = password;

  // Save on change input value
  const onChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };
  // CLOSE MODAL ACTION
  const closeModal = () => {
    clearErrors();
    setPassword({
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    });
  };

  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();

    const error = {};

    Object.keys(password).map((key) => {
      if (password[key].trim() === "") {
        error[key] = "This field is required";
      }
    });

    if (newPassword.trim() !== confirmPassword.trim()) {
      error.confirmPassword = "Confirm password did not match!!";
    }
    if (newPassword.trim().length < 6 || newPassword.trim().length > 42) {
      error.newPassword = "Password must be more than 6 and 42 characters";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      const { currentPassword, newPassword, confirmPassword } = password;
      updatePassword(setLoading, currentPassword, newPassword, confirmPassword);
    }
  };

  return (
    <PageLoader loading={loading} noPadding>
      <h4 className="text-center mt-4"> Change my password</h4>
      <Row style={{ justifyContent: "center" }}>
        <Col xs="6">
          <Form onSubmit={(e) => onSubmit(e)}>
            <Row>
              <Col xs="12">
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="currentPassword"
                  label="Current password"
                  fullWidth
                  type="password"
                  value={currentPassword}
                  onChange={onChange}
                  error={errors.currentPassword}
                  size="small"
                  variant="outlined"
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextFieldInputWithHeader
                  id="outlined-multiline-static"
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  fullWidth
                  size="small"
                  onChange={onChange}
                  variant="outlined"
                  error={errors.newPassword}
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextFieldInputWithHeader
                  id="outlined-multiline-static"
                  label="Confirm password"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  fullWidth
                  size="small"
                  onChange={onChange}
                  variant="outlined"
                  error={errors.confirmPassword}
                />
              </Col>
            </Row>
            <Col item xs={12} className="text-center mt-4">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="small"
              >
                <SaveIcon className="mr-2" /> CONFIRM
              </Button>
              <Button
                variant="contained"
                className="ml-4"
                size="small"
                onClick={() => closeModal()}
              >
                <RotateLeftIcon className="mr-2" /> Cancel
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { clearErrors, updatePassword })(
  ChangePassword
);
