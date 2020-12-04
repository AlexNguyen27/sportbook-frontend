import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";

const useStyles = makeStyles({
  top: {
    padding: "100px 0 40px 0",
  },
});

const OrderDetai = () => {
  const classes = useStyles();

  return (
    <Row className={classes.top} style={{ justifyContent: "center" }}>
      <Col xs={2}>
        <h1>hello deail</h1>
        {/*  */}
      </Col>
    </Row>
  );
};

export default OrderDetai;
