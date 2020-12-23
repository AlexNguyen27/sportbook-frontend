import React from "react";
import { Row, Col } from "reactstrap";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import { roundNumber } from "../../../utils/commonFunction";

const useStyles = makeStyles((theme) => ({
  review: {
    borderRight: "1px solid #888",
    textAlign: "center",
    maxHeight: "120px",
  },
  height: {
    alignSelf: "center",
  },
  noPadding: {
    padding: 0,
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

const Review = ({ ratings = [] }) => {
  const classes = useStyles();
  const averageRate =
    ratings.length > 0
      ? ratings.reduce((acc, curr) => acc + curr.point, 0) / ratings.length
      : 0;

  const statistic = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  if (ratings.length) {
    ratings.forEach((item) => {
      switch (item.point) {
        case 1:
          statistic["1"] += 1;
          break;
        case 2:
          statistic["2"] += 1;
          break;
        case 3:
          statistic["3"] += 1;
          break;
        case 4:
          statistic["4"] += 1;
          break;
        case 5:
          statistic["5"] += 1;
          break;
        default:
          break;
      }
    });
  }
  
  return (
    <Row style={{ justifyContent: "space-around", maxHeight: "120px" }}>
      <Col xs={4} className={classes.review}>
        <h4>{averageRate.toFixed(1)}</h4>
        <Rating name="read-only" value={roundNumber(averageRate, 1)} readOnly />
        <h5>{`${ratings.length} ${
          ratings.length > 1 ? "reviews" : "review"
        }`}</h5>
      </Col>
      <Col xs={7} style={{ maxHeight: "100%" }}>
        <Row className={classes.height}>
          <Col xs={3}>
            <Rating name="read-only" value={5} readOnly size="small" />
          </Col>
          <Col xs={6}>
            <PrettoSlider
              disabled
              className={classes.noPadding}
              defaultValue={statistic[5] / ratings.length * 100}
              aria-labelledby="disabled-slider"
            />
          </Col>
          <Col xs={1}>{statistic[5]}</Col>
        </Row>
        <Row className={classes.height}>
          <Col xs={3}>
            <Rating name="read-only" value={4} readOnly size="small" />
          </Col>
          <Col xs={6}>
            <PrettoSlider
              disabled
              className={classes.noPadding}
              defaultValue={statistic[4] / ratings.length * 100}
              aria-labelledby="disabled-slider"
            />
          </Col>
          <Col xs={1}>{statistic[4]}</Col>
        </Row>
        <Row className={classes.height}>
          <Col xs={3}>
            <Rating name="read-only" value={3} readOnly size="small" />
          </Col>
          <Col xs={6}>
            <PrettoSlider
              disabled
              className={classes.noPadding}
              defaultValue={statistic[3] / ratings.length * 100}
              aria-labelledby="disabled-slider"
            />
          </Col>
          <Col xs={1}>{statistic[3]}</Col>
        </Row>
        <Row className={classes.height}>
          <Col xs={3}>
            <Rating name="read-only" value={2} readOnly size="small" />
          </Col>
          <Col xs={6}>
            <PrettoSlider
              disabled
              className={classes.noPadding}
              defaultValue={statistic[2] / ratings.length * 100}
              aria-labelledby="disabled-slider"
            />
          </Col>
          <Col xs={1}>{statistic[2]}</Col>
        </Row>
        <Row className={classes.height}>
          <Col xs={3}>
            <Rating name="read-only" value={1} readOnly size="small" />
          </Col>
          <Col xs={6}>
            <PrettoSlider
              disabled
              className={classes.noPadding}
              defaultValue={statistic[1] / ratings.length * 100 }
              aria-labelledby="disabled-slider"
            />
          </Col>
          <Col xs={1}>{statistic[1]}</Col>
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  ratings: state.rating.ratings,
});
export default connect(mapStateToProps, {})(Review);
