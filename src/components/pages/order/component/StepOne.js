import React from "react";
import { Row, Col } from "reactstrap";
import GroundCardInfo from "./GroundCardInfo";
import OrderCard from "./OrderCard";

const StepOne = ({ onContinue }) => {
  return (
    <div>
      <h5>Step 1</h5>
      <Row style={{ justifyContent: "center" }}>
        <Col xs={7}>
          <OrderCard onContinue={onContinue}/>
        </Col>
        <Col xs={4} className="mt-4">
          <GroundCardInfo />
        </Col>
      </Row>
    </div>
  );
};

export default StepOne;
