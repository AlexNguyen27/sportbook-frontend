import React from "react";
import { Row, Col } from "reactstrap";
import paymentImage from "../../../../images/online_payment_success2.jpg";
import orderSuccess from "../../../../images/order_success.jpg";
import { connect } from "react-redux";
const StepTwo = ({ paymentMethod }) => {
  return (
    <Row
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Col xs={12}>
        <img
          alt=""
          height="50%"
          width="50%"
          src={paymentMethod === "offline" ? orderSuccess : paymentImage}
        />
      </Col>
      <Col xs={12}>
        <h4>
          {paymentMethod === "offline"
            ? "Your booking is confirmed successfully"
            : "Your payment is successfull"}
        </h4>
      </Col>
      <Col>
        <p>
          {paymentMethod === "offline"
            ? "Thank you for your booking. The owner will call you to confirm your order and an automated payment receipt will be sent to your registered email"
            : "Thank you for your payment. An automated payment receipt will be sent to your registered email"}
        </p>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  paymentMethod: state.payment.paymentMethod,
});
export default connect(mapStateToProps, null)(StepTwo);
