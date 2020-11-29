import React from "react";
import { Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import StarIcon from "@material-ui/icons/Star";
import Colors from "../../../../constants/Colors";

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

const Comment = () => {
  const classes = useStyles();
  return (
    <>
      {[...Array(4)].map((item) => (
        <Row>
          <Col xs={1}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.large}
            />
          </Col>
          <Col xs={9}>
            <h6 className="mb-0"> Thanh Nguyen</h6>
            <p>Comment at: 12/12/2020 12:12:12</p>
          </Col>
          <Col xs={12}>
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <h6>Very good</h6>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scr
            </p>
            <hr></hr>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default Comment;
