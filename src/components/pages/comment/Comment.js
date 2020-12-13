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
import AddCommentForm from "./component/AddCommentForm";
import ReplyIcon from "@material-ui/icons/Reply";
import Collapse from "@material-ui/core/Collapse";

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
  childSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
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

  const [editLoading, setEditLoading] = useState(false);
  const [isEdit, setIsEdit] = useState("");
  const [editComment, setEditComment] = useState("");

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deteleId, setDeleteId] = useState("");

  const [replyLoading, setReplyLoading] = useState(false);
  const [replyData, setReplyData] = useState({
    isReply: false,
    parentReplyId: "",
    replyComment: "",
  });

  const [viewMoreCmt, setViewMoreCmt] = useState(false);
  const [viewCmtId, setViewCmtId] = useState(null);

  const getFullName = (userData) => {
    return userData.firstName + " " + userData.lastName;
  };

  // const onAdd = (e) => {
  //   e.preventDefault();
  //   if (!isAuthenticated) {
  //     Swal.fire({
  //       title: `Please login to continue?`,
  //       text: "",
  //       type: "success",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Login!",
  //     }).then((result) => {
  //       if (result.value) {
  //         history.push("/login");
  //       }
  //     });
  //   } else {
  //     if (!!comment.trim()) {
  //       setLoading(true);
  //       addComment(setLoading, comment, ground.id);
  //       setComment("");
  //     }
  //   }
  // };

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
    const found = ratings.find((item) => item.userId === userId);
    if (found) return found.point;
    return 0;
  };

  const { isReply, parentReplyId, replyComment } = replyData;

  const renderChildrenComment = () => {
    const childrenComment = comments.filter(
      (item) => item.parentId === viewCmtId
    );
    console.log("chilre---------------", comments, viewCmtId);
    return (
      <>
        {childrenComment.map((child) => (
          <>
            <Col style={{ borderLeft: "1px solid #e8e8e8" }}>
              <p className="ml-2">{child.comment}</p>
            </Col>
            <Row>
              <Col
                xs={"auto"}
                style={{ alignSelf: "center", paddingRight: "5px" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={child?.user?.avatar || "/static/images/avatar/1.jpg"}
                  className={classes.childSmall}
                  style={{ marginLeft: "10px" }}
                />
              </Col>
              <Col xs={"auto"} className="pl-0" style={{ alignSelf: "center" }}>
                <span className="mb-0">{getFullName(child.user)}</span>
                <span className="ml-2">
                  ({moment(child.createdAt).format("DD/MM/YYYY hh:mm:ss A")})
                </span>
              </Col>
              {user.id === child.userId && (
                <Col xs={"auto"} style={{ alignSelf: "center" }}>
                  <Tooltip title="Delete this comment">
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete(child.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Col>
              )}
            </Row>
            <hr />
          </>
        ))}
      </>
    );
  };

  return (
    <>
      <AddCommentForm handleAction={addComment} />
      <hr></hr>
      <h5>{`${comments.length} ${
        comments.length > 1 ? "Comments" : "Comment"
      }`}</h5>
      {comments.map(
        (item) =>
          !item.parentId && (
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
                  Comment at:{" "}
                  {moment(item.createdAt).format("DD/MM/YYYY HH:mm A")}
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
                  <Rating
                    name="read-only"
                    size="small"
                    value={getRating(item.userId)}
                    readOnly
                  />
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

                {/* REPLY COMMENT */}
                {isReply ? (
                  <Form className="mb-4" onSubmit={(e) => {}}>
                    {parentReplyId === item.id && (
                      <>
                        {replyLoading ? (
                          <IconButton>
                            <CircularProgress color="secondary" size={20} />
                          </IconButton>
                        ) : (
                          <>
                            <Button
                              color="primary"
                              type="submit"
                              size="small"
                              onClick={() => {
                                // ADD COMMENT WITH PARENT ID
                                if (replyComment.trim()) {
                                  setReplyLoading(true);
                                  addComment(
                                    setReplyLoading,
                                    replyComment,
                                    ground.id,
                                    parentReplyId
                                  );
                                  setReplyData({
                                    isReply: false,
                                    parentReplyId: null,
                                    replyComment: "",
                                  });
                                }
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              color="primary"
                              size="small"
                              type="submit"
                              onClick={() => {
                                setReplyData({
                                  isReply: false,
                                  parentReplyId: null,
                                  replyComment: "",
                                });
                              }}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        <Row>
                          <Col xs={12}>
                            <TextFieldInput
                              label="Give a comment here"
                              id="outlined-multiline-flexible"
                              name="replyComment"
                              fullWidth
                              value={replyComment || ""}
                              onChange={(e) => {
                                if (parentReplyId === item.id) {
                                  setReplyData({
                                    ...replyData,
                                    replyComment: e.target.value,
                                  });
                                }
                              }}
                              error={errors.replyComment || ""}
                              variant="outlined"
                              size="small"
                            />
                          </Col>
                        </Row>
                      </>
                    )}
                  </Form>
                ) : (
                  <>
                    <Button
                      color="primary"
                      size="small"
                      type="submit"
                      onClick={() => {
                        setViewMoreCmt(!viewMoreCmt);
                        setViewCmtId(item.id);
                      }}
                    >
                      {viewMoreCmt && viewCmtId === item.id ? "Hide" : "View more"}
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      type="submit"
                      startIcon={<ReplyIcon />}
                      onClick={() => {
                        setReplyData({
                          ...replyData,
                          isReply: true,
                          parentReplyId: item.id,
                        });
                      }}
                    >
                      Reply
                    </Button>
                  </>
                )}
                {viewMoreCmt && viewCmtId === item.id && (
                  <Collapse in={viewMoreCmt} timeout="auto" unmountOnExit>
                    {/* <CardContent> */}
                    {renderChildrenComment()}
                    {/* <p>hello</p> */}
                    {/* </CardContent> */}
                  </Collapse>
                )}
                <hr></hr>
              </Col>
            </Row>
          )
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
  ratings: state.rating.ratings,
  comments: state.ground.selected_ground.comments,
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  addComment,
  updateComment,
  deleteComment,
})(Comment);
