import React from "react";
import { Row, Col } from "reactstrap";
import { Paper } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Colors from "../../../../constants/Colors";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const GroundCardInfo = () => {
  return (
    <Paper elevation={3} className="p-4">
      <h5>San bong dai hoc nogn lam</h5>
      <p>Dai hoc nong lap khu pho 6 p linh trung quan thu duc</p>
      <p>
        <StarIcon fontSize="small" style={{ color: Colors.star }} />
        <StarIcon fontSize="small" style={{ color: Colors.star }} />
        <StarIcon fontSize="small" style={{ color: Colors.star }} />
        <StarIcon fontSize="small" style={{ color: Colors.star }} />
        <StarIcon fontSize="small" style={{ color: Colors.star }} />
      </p>
      <hr></hr>
      <p>
        <EmojiPeopleIcon fontSize="small" /> San con 1 (5 nguoi choi)
      </p>
      <p>
        <EventAvailableIcon fontSize="small" />
        Từ 10:20 <ArrowForwardIcon fontSize="small" /> đến 21:00
      </p>
      <p>Thứ 6, 12-20-2020 (12 phút nữa)</p>
      <hr />
      <Row>
        <Col xs={6}>
          <p>Price </p>
        </Col>
        <Col xs={6}>
          <p style={{ textDecoration: "line-through" }}>1000000 VND </p>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <p>Discount</p>
        </Col>
        <Col xs={6}>
          <p> 11000 VND</p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={6}>
          <p className="font-weight-bold">Total payment</p>
        </Col>
        <Col xs={6}>
          <p className="font-weight-bold">100,000 VND</p>
        </Col>
      </Row>
      <hr />
      <p style={{ color: Colors.primary, fontWeight: "bold" }}>
        Please check your order information before submit payment
      </p>
    </Paper>
  );
};

export default GroundCardInfo;
