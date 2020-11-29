import React from "react";
import { Paper, Button } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { DEFAULT_GROUND_IMAGE } from "../../../../utils/common";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import { connect } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { getAddress } from "../../../../utils/commonFunction";
import { useHistory } from "react-router-dom";
import { truncateMultilineString } from "../../../../utils/formatString";

const GroundItem = ({ ground, benefits }) => {
  const benefitArr = ground.benefit ? ground.benefit.split(",") : [];

  const history = useHistory();

  const getImageUrls = () => {
    const formatImage = ground.image ? JSON.parse(ground.image) : [];
    if (formatImage && formatImage.length > 0) {
      return formatImage.map((item) => item);
    } else {
      return [];
    }
  };

  const { title, description, phone } = ground;

  return (
    <Paper elevation={3} className="mt-4 mb-2 p-3" style={{ width: "100%" }}>
      <Row>
        <Col xs={3}>
          <img
            style={{ position: "relative", maxHeight: "200px" }}
            width="100%"
            height="100%"
            src={getImageUrls()[0] || DEFAULT_GROUND_IMAGE}
            alt={""}
            onClick={() => {}}
          />
        </Col>
        <Col
          xs={7}
          style={{ alignSelf: "center", borderRight: "1px solid #888" }}
        >
          <h4 className="text-capitalize">{title}</h4>
          <p className="mb-1">
            <RoomIcon className="mr-2" fontSize="small" />
            {getAddress(ground.address) || "No Address"}
          </p>
          <p className="mb-1">
            <PhoneIcon className="mr-2" fontSize="small" />
            {phone || "No phone"}
          </p>
          <div>
            {benefitArr.map((key) => (
              <>
                {benefits[key] ? (
                  <span className="mr-4">
                    <CheckCircleIcon
                      fontSize="small"
                      style={{ color: "#61b15a" }}
                      className="mr-2"
                    />
                    {benefits[key].title}
                  </span>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
            <p className="mt-2 mb-2">{truncateMultilineString(description, 95)}</p>
        </Col>
        <Col xs={2} style={{ alignSelf: "center" }}>
          {/* open ground */}
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
            size="small"
            onClick={() => history.push(`/ground/${ground.id}`)}
          >
            DETAIL
          </Button>
        </Col>
      </Row>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  benefits: state.benefit.benefits,
});
export default connect(mapStateToProps, {})(GroundItem);
