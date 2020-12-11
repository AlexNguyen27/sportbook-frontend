import React from "react";
import { Paper } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_IMAGE_URL } from "../../../../store/actions/types";
import { getFullname, getUserAddress } from "../../../../utils/commonFunction";
import { PAYMENT_TYPE } from "../../../../utils/common";

const useStyles = makeStyles({
  upperCase: {
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  pTag: {
    fontSize: "14px",
    marginBottom: "6px",
  },
});
const UserInfoCard = ({ orderDetail }) => {
  const classes = useStyles();
  const { firstName = "", lastName = "", email, phone, address } =
    orderDetail.user || {};
  const { paymentType } = orderDetail;

  return (
    <Paper elevation={3} className="p-4">
      <Row>
        <Col xs={2}>
          <img
            src={BASE_IMAGE_URL}
            alt="Girl in a jacket"
            width="140"
            height={140}
          />
        </Col>
        <Col xs={8} className="align-self-center">
          <h6 className={classes.upperCase}>
            {getFullname(firstName, lastName)}
          </h6>
          <p className={classes.pTag}>
            <span>Email: </span>
            <span> {email}</span>
          </p>
          <p className={classes.pTag}>
            <span>Phone: </span>
            <span>{phone}</span>
          </p>
          <p className={classes.pTag}>
            <span>Address: </span>
            <span>{getUserAddress(address)}</span>
          </p>
        </Col>
        <Col xs={12}>
          <hr />
        </Col>
        <Col xs={12} className="mb-0">
          <h6>Payment method: {PAYMENT_TYPE[paymentType]} </h6>
          <span>
            {paymentType === "online"
              ? `(Wait for confirmation from the owner and cannot be guaranteed by
              Love Sport if any dispute arises)`
              : `Guaranteed by loveSport when any dispute occurs. A 100% refund
              will be issued for cancelations made before the scheduled time.`}
          </span>
        </Col>
      </Row>
    </Paper>
  );
};

export default UserInfoCard;
