import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
// import Rating from "@material-ui/lab/Rating";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col, Modal, ModalBody, ModalFooter, Form } from "reactstrap";
import Button from "@material-ui/core/Button";
import TextFieldInput from "../../custom/TextFieldInputWithheader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const Comment = ({ ground, errors }) => {
  const classes = useStyles();

  const [comments, setComments] = useState(ground.comments || []);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const getFullName = (userData) => {
    return userData.firstName + " " + userData.lastName;
  };

  // CLOSE MODAL ACTION
  const closeModal = () => {};

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(comment, 'd--------------')
    // add comment
    // TODO call add review here
  };
  return (
    <>
      <Form className="mb-4" onSubmit={(e) => onSubmit(e)}>
        <Row>
          <Col xs={9}>
            <TextFieldInput
              label="Give a comment here"
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
          <Col xs={3}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="contained"
              className="ml-2"
              onClick={() => setComment("")}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
      <hr></hr>
      <h5>{`${comments.length} ${
          comments.length > 1 ? "comments" : "comment"
        }`}</h5>
      {comments.map((item) => (
        <Row>
          <Col xs={1}>
            <Avatar
              alt="Remy Sharp"
              src={item?.user?.avatar || "/static/images/avatar/1.jpg"}
              className={classes.large}
            />
          </Col>
          <Col xs={9}>
            <h6 className="mb-0">{getFullName(item.user)}</h6>
            <p>
              Comment at: {moment(item.createdAt).format("DD/MM/YYYY HH:mm A")}
            </p>
          </Col>
          <Col xs={12}>
            {/* <Rating name="read-only" size="small" value={5} readOnly /> */}
            {/* <h6>Very good</h6> */}
            <p>{item.comment}</p>
            <hr></hr>
          </Col>
        </Row>
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
  errors: state.errors,
});
export default connect(mapStateToProps, null)(Comment);
