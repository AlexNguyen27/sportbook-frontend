import React from "react";
import { Row, Col } from "reactstrap";
import GroundCardInfo from "./GroundCardInfo";
import OrderCard from "./OrderCard";

const StepOne = () => {
  return (
    <div>
      <h5>Step 1</h5>
      <Row style={{ justifyContent: "center" }}>
        <Col xs={7}>
          <OrderCard />
        </Col>
        <Col xs={4} className="mt-4">
          <GroundCardInfo />
        </Col>
      </Row>
    </div>
  );
};

export default StepOne;
