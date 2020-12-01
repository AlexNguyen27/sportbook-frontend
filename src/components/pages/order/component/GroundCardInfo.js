import React from "react";
import { Row, Col } from "reactstrap";
import { Paper } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Colors from "../../../../constants/Colors";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { connect } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import moment from "moment";

const GroundCardInfo = ({ order: { orderData = {} }, benefits }) => {
  const {
    groundName,
    groundAddress,
    startDate,
    startTime,
    endTime,
    price,
    discount,
    subGroundName,
    numberOfPlayers,
    groundBenefit = [],
  } = orderData;

  const getDiffDate = () => {
    const diff = moment(startDate).diff(moment());
    if (diff) {
      return `${moment(startDate).diff(moment(), "days")} days from now`;
    } else {
      return `${moment(startTime, "HH:mm:ss").diff(
        moment(),
        "hours"
      )} hours from now`;
    }
  };

  return (
    <Paper elevation={3} className="p-4">
      <h5>{groundName}</h5>
      <p>{groundAddress}</p>
      <div>
        {!groundBenefit.length ? (
          <p>
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
          </p>
        ) : (
          groundBenefit.map((key) => (
            <>
              {benefits[key] ? (
                <>
                  <CheckCircleIcon style={{ color: "#61b15a" }} />{" "}
                  {benefits[key].title}{" "}
                </>
              ) : (
                ""
              )}
            </>
          ))
        )}
      </div>

      <hr></hr>
      <p>
        <EmojiPeopleIcon fontSize="small" /> {subGroundName}{" "}
        {`( ${numberOfPlayers} players )`}
      </p>
      <p>
        <EventAvailableIcon fontSize="small" />
        {` From ${moment(startTime, "HH:mm:ss").format("HH:mm")}`}
        <ArrowForwardIcon fontSize="small" />
        {` To ${moment(endTime, "HH:mm:ss").format("HH:mm")}`}
      </p>
      <p>
        {moment(startDate).format("dddd, DD-MM-YYYY")} ({getDiffDate()})
      </p>
      <hr />
      <Row>
        <Col xs={6}>
          <p>Price </p>
        </Col>
        <Col xs={6}>
          <p style={{ textDecoration: "line-through" }}>{price} $ </p>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <p>Discount</p>
        </Col>
        <Col xs={6}>
          <p> {(price * discount) / 100} $</p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={6}>
          <p className="font-weight-bold">Total payment</p>
        </Col>
        <Col xs={6}>
          <p className="font-weight-bold">{(price * (100 - discount)) / 100} $</p>
        </Col>
      </Row>
      <hr />
      <p style={{ color: Colors.primary, fontWeight: "bold" }}>
        Please check your order information before submit payment
      </p>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.auth.user,
  order: state.order,
  benefits: state.benefit.benefits,
  ground: state.ground.ground,
});
export default connect(mapStateToProps, {})(GroundCardInfo);
