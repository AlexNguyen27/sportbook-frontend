import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { getGroundById } from "../../../store/actions/ground";
import PageLoader from "../../custom/PageLoader";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Paper } from "@material-ui/core";
import REGIONS from "../../locales/regions.json";
import DISTRICTS from "../../locales/districts.json";
import WARDS from "../../locales/wards.json";
import ShareIcon from "@material-ui/icons/Share";
import StarIcon from "@material-ui/icons/Star";
import ReportIcon from "@material-ui/icons/Report";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ReactGoogleMaps from "../../custom/ReactGoogleMaps";
import MultipleCarousel from "../../custom/MultipleCarousel";
const useStyles = makeStyles((theme) => ({
  title: {
    position: "absolute",
    top: "100px",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Ground = ({ getGroundById, ground, grounds }) => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getGroundById(setLoading, match);
    const pathName = history.location.pathname.split("/");
    if (pathName && pathName[2]) {
      const groundId = pathName[2];
      setLoading(true);
      getGroundById(setLoading, groundId);
      console.log("hsitroy=------------------------", history);
      document.getElementById("test-image").style.backgroundImage =
        "url('https://vtv1.mediacdn.vn/thumb_w/650/2020/6/2/1591067420-20200601-lisa-15910726681152074573621.jpg')";
      document.getElementById("test-image").style.backgroundPosition = "center";
      document.getElementById("test-image").style.backgroundRepeat =
        "no-repeat";
      document.getElementById("test-image").style.backgroundSize = "cover";
    }
  }, []);

  console.log("ground", ground);
  const getAddress = () => {
    if (ground.address) {
      const formatAddress = JSON.parse(ground.address);
      console.log("addd----------------------", formatAddress);
      const { address, regionCode, districtCode, wardCode } = formatAddress;
      return `${address}, ${WARDS[wardCode].name_with_type}, ${
        DISTRICTS[districtCode].name_with_type
      }, ${REGIONS[regionCode].name_with_type || ""}`;
    }
  };

  const groundArr = Object.keys(grounds).map((groundId) => grounds[groundId]);


  return (
    <PageLoader loading={loading}>
      <div
        id="test-image"
        style={{ height: "500px", position: "relative" }}
      ></div>
      <div className={classes.title}>
        <Row style={{ justifyContent: "center" }}>
          <Col xs={6}>
            {/* <Paper elevation={3}> */}
            <h1>
              subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </h1>
            <h4>{getAddress()}</h4>
            <h4>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              Review
            </h4>
            <h4>
              <ReportIcon />
              Reports
            </h4>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<ShareIcon />}
            >
              Send
            </Button>
          </Col>
          <Col xs={4} style={{ alignSelf: "flex-end", textAlign: "right" }}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              endIcon={<CreditCardIcon />}
            >
              Book Online
            </Button>
          </Col>
        </Row>
      </div>
      {/* ground info */}
      <Row style={{ justifyContent: "center" }}>
        <Col xs={6}>
          <Paper elevation={3}>
            <h1>hello there</h1>
          </Paper>
          <h1>Playground description</h1>
          <h3>Benefits</h3>
          <div>
            <CheckCircleIcon /> Free water
            <CheckCircleIcon /> Free football
            <CheckCircleIcon /> Get 2 shirts free
          </div>
          <hr />
          <h4>Ground Map</h4>
          {/* <ReactGoogleMaps /> */}
          <hr />
          <h4>Images</h4>
          {/*list ground image  */}
          <h4>Review</h4>
          {/* List review */}
          <h4>Comments</h4>
          {/* List comment */}
          <h4>More playground</h4>
          <PageLoader loading={loading}>
          <Row style={{ justifyContent: "center" }}>
            <Col xs={9}>
              <MultipleCarousel dataSource={groundArr} />
            </Col>
          </Row>
        </PageLoader>
        </Col>
        <Col xs={3}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<CreditCardIcon />}
          >
            Price
          </Button>
          <Paper elevation={3}>
            <h1>hello there</h1>
          </Paper>
        </Col>
      </Row>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
  grounds: state.ground.grounds,
});
export default connect(mapStateToProps, { getGroundById })(Ground);
