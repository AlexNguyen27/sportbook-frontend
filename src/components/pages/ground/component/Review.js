import React from "react";
import { Row, Col } from "reactstrap";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Colors from "../../../../constants/Colors";
const useStyles = makeStyles((theme) => ({
  review: {
    borderRight: "1px solid #888",
    textAlign: "center",
    maxHeight: "120px",
  },
  height: {
    height: "12%",
  },
}));
const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    display: "none",
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const Review = () => {
  const classes = useStyles();

  return (
    <Row style={{ justifyContent: "space-around", maxHeight: "120px" }}>
      <Col xs={4} className={classes.review}>
        <h4>4.5</h4>
        <StarIcon fontSize="small" style={{ color: Colors.star }} />
        <StarIcon fontSize="small" style={{ color: Colors.star }} />
        <StarIcon fontSize="small" style={{ color: Colors.star }} />
        <StarIcon fontSize="small" style={{ color: Colors.star }} />
        <StarHalfIcon fontSize="small" style={{ color: Colors.star }} />
        <h5>117 reviews</h5>
      </Col>
      <Col xs={7} style={{ maxHeight: "100%" }}>
        <Row className={classes.height}>
          <Col xs={3}>
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
          </Col>
          <Col xs={6}>
            <PrettoSlider
              disabled
              defaultValue={30}
              aria-labelledby="disabled-slider"
            />
          </Col>
          <Col xs={1}>100</Col>
        </Row>
        <Row className={classes.height}>
          <Col xs={3}>
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarBorderIcon fontSize="small" style={{ color: Colors.star }} />
          </Col>
          <Col xs={6}>
            <PrettoSlider
              disabled
              defaultValue={30}
              aria-labelledby="disabled-slider"
            />
          </Col>
          <Col xs={1}>99</Col>
        </Row>
        <Row className={classes.height}>
          <Col xs={3}>
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarBorderIcon fontSize="small" style={{ color: Colors.star }} />
            <StarBorderIcon fontSize="small" style={{ color: Colors.star }} />
          </Col>
          <Col xs={6}>
            <PrettoSlider
              disabled
              defaultValue={30}
              aria-labelledby="disabled-slider"
            />
          </Col>
          <Col xs={1}>8</Col>
        </Row>
        <Row className={classes.height}>
          <Col xs={3}>
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarBorderIcon fontSize="small" style={{ color: Colors.star }} />
            <StarBorderIcon fontSize="small" style={{ color: Colors.star }} />
            <StarBorderIcon fontSize="small" style={{ color: Colors.star }} />
          </Col>
          <Col xs={6}>
            <PrettoSlider
              disabled
              defaultValue={30}
              aria-labelledby="disabled-slider"
            />
          </Col>
          <Col xs={1}>8</Col>
        </Row>
        <Row className={classes.height}>
          <Col xs={3}>
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarBorderIcon fontSize="small" style={{ color: Colors.star }} />
            <StarBorderIcon fontSize="small" style={{ color: Colors.star }} />
            <StarBorderIcon fontSize="small" style={{ color: Colors.star }} />
            <StarBorderIcon fontSize="small" style={{ color: Colors.star }} />
          </Col>
          <Col xs={6}>
            <PrettoSlider
              disabled
              defaultValue={30}
              aria-labelledby="disabled-slider"
            />
          </Col>
          <Col xs={1}>8</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Review;
