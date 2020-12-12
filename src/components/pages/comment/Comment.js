import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Rating from "@material-ui/lab/Rating";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import { Row, Col, Form } from "reactstrap";
import Button from "@material-ui/core/Button";
import TextFieldInput from "../../custom/TextFieldInputWithheader";
import {
  addComment,
  updateComment,
  deleteComment,
} from "../../../store/actions/comment";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { GET_ERRORS } from "../../../store/actions/types";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import AddCommentForm from "./component/AddCommentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const Comment = ({
  ground,
  comments = [],
  errors,
  addComment,
  updateComment,
  deleteComment,
  auth: { user = {}, isAuthenticated },
  ratings = [],
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [isEdit, setIsEdit] = useState("");
  const [editComment, setEditComment] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deteleId, setDeleteId] = useState("");

  const getFullName = (userData) => {
    return userData.firstName + " " + userData.lastName;
  };

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

  const onEditComment = (commentId) => {
    if (!!editComment.trim()) {
      setEditLoading(true);
      updateComment(setEditLoading, commentId, editComment);
      setIsEdit("");
    } else {
      dispatch({
        type: GET_ERRORS,
        errors: {
          editComment: "Please enter your comment!",
        },
      });
    }
  };

  const onDelete = (commentId) => {
    setDeleteId(commentId);
    setDeleteLoading(true);
    deleteComment(setDeleteLoading, commentId);
  };

  const getRating = (userId) => {
    const found = ratings.find((item) => (item.userId = userId));
    if (found) return found.point;
    return 0;
  };
  return (
    <>
      <AddCommentForm />
      <hr></hr>
      <h5>{`${comments.length} ${
        comments.length > 1 ? "Comments" : "Comment"
      }`}</h5>
      {comments.map((item) => (
        <Row>
          <Col xs={1} className="pr-0">
            <Avatar
              alt="Remy Sharp"
              src={item?.user?.avatar || "/static/images/avatar/1.jpg"}
              className={classes.small}
            />
          </Col>
          <Col xs={8} className="pl-0">
            <h6 className="mb-0">{getFullName(item.user)}</h6>
            <p>
              Comment at: {moment(item.createdAt).format("DD/MM/YYYY HH:mm A")}
            </p>
          </Col>
          {user && user?.id !== item.userId ? null : (
            <Col xs={3} className="text-right">
              {isEdit === item.id ? (
                <>
                  {editLoading ? (
                    <IconButton>
                      <CircularProgress color="secondary" size={20} />
                    </IconButton>
                  ) : (
                    <>
                      <Button
                        color="primary"
                        type="submit"
                        size="small"
                        onClick={() => onEditComment(item.id)}
                      >
                        Save
                      </Button>
                      <Button
                        color="primary"
                        size="small"
                        type="submit"
                        onClick={() => {
                          setIsEdit("");
                          setEditComment(item.comment);
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <Button
                  color="primary"
                  size="small"
                  type="submit"
                  onClick={() => {
                    setIsEdit(item.id);
                    setEditComment(item.comment);
                  }}
                >
                  Edit
                </Button>
              )}
              {deleteLoading && deteleId === item.id ? (
                <IconButton>
                  <CircularProgress color="primary" size={20} />
                </IconButton>
              ) : (
                <Tooltip title="Delete this comment">
                  <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(item.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Col>
          )}
          <Col xs={12}>
            {!getRating(item.userId) ? null : (
              <Rating name="read-only" size="small" value={5} readOnly />
            )}

            {/* <h6>Very good</h6> */}
            {isEdit === item.id ? (
              <TextFieldInput
                label="Give a comment here"
                id="outlined-multiline-flexible"
                name="comment"
                fullWidth
                defaultValue={item.comment}
                value={editComment || item.comment || ""}
                onChange={(e) => setEditComment(e.target.value)}
                error={errors.editComment || ""}
                variant="outlined"
                size="small"
              />
            ) : (
              <p>{item.comment}</p>
            )}
            <hr></hr>
          </Col>
        </Row>
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
  rating: state.rating.ratings,
  comments: state.ground.selected_ground.comments,
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  addComment,
  updateComment,
  deleteComment,
})(Comment);
