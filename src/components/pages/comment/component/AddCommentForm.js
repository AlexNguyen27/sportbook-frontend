import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { Row, Col, Form } from "reactstrap";
import Button from "@material-ui/core/Button";
import TextFieldInput from "../../../custom/TextFieldInputWithheader";
import { addComment } from "../../../../store/actions/comment";
import Swal from "sweetalert2";
import { blue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
const SaveButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  },
}))(Button);

const AddCommentForm = ({
  ground,
  errors,
  addComment,
  auth: { user = {}, isAuthenticated },
}) => {
  const history = useHistory();

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const onAdd = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      Swal.fire({
        title: `Please login to continue?`,
        text: "",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.value) {
          history.push("/login");
        }
      });
    } else {
      if (!!comment.trim()) {
        setLoading(true);
        addComment(setLoading, comment, ground.id);
        setComment("");
      }
    }
  };

  return (
    <Form className="mb-4" onSubmit={(e) => onAdd(e)}>
      <Row>
        <Col xs={2} sm={4} md={5} lg={8} xl={9} className="mb-2">
          <TextFieldInput
            label="Add a public comment..."
            id="outlined-multiline-flexible"
            name="comment"
            fullWidth
            value={comment || ""}
            onChange={(e) => setComment(e.target.value)}
            error={errors.comment || ""}
            variant="outlined"
            size="small"
          />
        </Col>
        {loading ? (
          <Col xs="auto" className="text-center">
            <CircularProgress color="secondary" size={30} />
          </Col>
        ) : (
          <Col xs="auto" style={{ alignSelf: "center" }} className="mb-2">
            <SaveButton
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              Submit
            </SaveButton>

            <Button
              variant="contained"
              className="ml-2"
              size="small"
              onClick={() => setComment("")}
            >
              Cancel
            </Button>
          </Col>
        )}
      </Row>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  addComment,
})(AddCommentForm);
