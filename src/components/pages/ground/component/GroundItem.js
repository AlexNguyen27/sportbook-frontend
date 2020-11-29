import React from "react";
import { Paper, Button } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { DEFAULT_GROUND_IMAGE } from "../../../../utils/common";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";

const GroundItem = ({ ground }) => {
  return (
    <Paper elevation={3} className="mt-4 mb-4">
      <Row>
        <Col xs={3}>
          <img
            style={{ position: "relative" }}
            width="100%"
            height="100%"
            src={DEFAULT_GROUND_IMAGE}
            alt={""}
            onClick={() => {}}
          />
        </Col>
        <Col
          xs={7}
          style={{ alignSelf: "center", borderRight: "1px solid #888" }}
        >
          <h5 className="text-capitalize">San bogn dai hojc nong lam</h5>
          <p>
            <RoomIcon className="mr-2" /> tp ho chi minh
          </p>
          <p>
            <PhoneIcon className="mr-2" />
            0968686868
          </p>
        </Col>
        <Col xs={2} style={{ alignSelf: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%" }}
            size="small"
          >
            BOOK
          </Button>
        </Col>
      </Row>
    </Paper>
  );
};

export default GroundItem;
