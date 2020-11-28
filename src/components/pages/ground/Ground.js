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
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import MultipleCarousel from "../../custom/MultipleCarousel";
import { getBenefits } from "../../../store/actions/benefit";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import { DEFAULT_GROUND_IMAGE } from "../../../utils/common";

const useStyles = makeStyles((theme) => ({
  title: {
    position: "absolute",
    top: "150px",
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Ground = ({ getGroundById, ground, grounds, getBenefits, benefits }) => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getGroundById(setLoading, match);
    const pathName = history.location.pathname.split("/");
    if (pathName && pathName[2]) {
      const groundId = pathName[2];
      setLoading(true);
      getGroundById(setLoading, groundId).then(() => {
        setLoading(true);
        getBenefits(setLoading);
      });
      console.log("hsitroy=------------------------", history);
      document.getElementById("test-image").style.background = `url('${
        getImageUrls()[0] || DEFAULT_GROUND_IMAGE
      }')`;
      document.getElementById("test-image").style.backgroundPosition = "center";
      document.getElementById("test-image").style.backgroundRepeat =
        "no-repeat";
      document.getElementById("test-image").style.backgroundSize = "cover";
    }
  }, []);

  useEffect(() => {
    if (ground && loading === false) {
      document.getElementById("test-image").style.background = `url('${
        getImageUrls()[0] || DEFAULT_GROUND_IMAGE
      }')`;
      document.getElementById("test-image").style.backgroundPosition = "center";
      document.getElementById("test-image").style.backgroundRepeat =
        "no-repeat";
      document.getElementById("test-image").style.backgroundSize = "cover";
    }
  }, [ground, loading]);

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

  const { title, description, phone, image, category } = ground;
  const benefitArr = ground.benefit ? ground.benefit.split(",") : [];

  const getImageUrls = () => {
    const formatImage = ground.image ? JSON.parse(image) : [];
    if (formatImage && formatImage.length > 0) {
      return formatImage.map((item) => item);
    } else {
      return [];
    }
  };

  return (
    <PageLoader loading={loading}>
      <div id="test-image" style={{ height: "500px", position: "relative" }}>
        <div className={classes.title}>
          <Row style={{ justifyContent: "center" }}>
            <Col xs={5}>
              <h2 className="text-capitalize" style={{ color: "#db6400" }}>
                {title}
              </h2>
              <h5 style={{ color: "#eeeded" }}>{getAddress()}</h5>
              <h5>
                {[...Array(4)].map((item) => (
                  <StarIcon size="small" style={{ color: "#f0a500" }} />
                ))}
                <span style={{ color: "#03c4a1" }}>Reviews</span>
              </h5>
              {/* <h5>
                <ReportIcon size="small" style={{ color: "#f56a79" }} />
                <span style={{ color: "#ff4b5c" }}>Reports</span>
              </h5> */}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<ShareIcon />}
              >
                Send
              </Button>
            </Col>
            <Col xs={3} style={{ alignSelf: "flex-end", textAlign: "right" }}>
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
      </div>
      {/* ground info */}
      <Row style={{ justifyContent: "center" }}>
        <Col xs={6}>
          <Paper elevation={3} className={classes.paper}>
            <h5>This ground do not support booking online</h5>
            <p>Please check the contact information below</p>
          </Paper>

          <Paper elevation={3} className={classes.paper}>
            <h5>Description</h5>
            <p>{description}</p>
          </Paper>
          <hr></hr>
          <h5>Benefits</h5>
          <div>
            {benefitArr.map((key) => (
              <>
                {benefits[key] ? (
                  <>
                    <CheckCircleIcon /> {benefits[key].title}{" "}
                  </>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
          <hr />
          <h5>Ground Map</h5>
          {/* <ReactGoogleMaps /> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7836.983714026452!2d106.78194775393679!3d10.850144971186923!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCBWaeG7hW4gdGjDtG5nIEPGoSBT4bufIFThuqFpIFRQLiBI4buTIENow60gTWluaMK3!5e0!3m2!1svi!2s!4v1604223922437!5m2!1svi!2s"
            allowFullScreen
          ></iframe>
          <hr />
          <h5>Playground Images</h5>
          {/*list ground image  */}
          <Row>
            {getImageUrls().map((url) => (
              <Col xs={6}>
                <img
                  style={{ position: "relative" }}
                  width="100%"
                  height="100%"
                  src={url}
                  alt={""}
                />
              </Col>
            ))}
          </Row>
          <hr />
          <h5>Review</h5>
          {/* List review */}
          <hr />

          <h5>Comments</h5>
          {/* List comment */}
          <hr />
        </Col>
        <Col xs={3}>
          <div>
            <Button
              variant="contained"
              color="secondary"
              style={{ width: "100%" }}
              className={classes.button}
              endIcon={<CreditCardIcon />}
            >
              Price
            </Button>
          </div>
          <Paper elevation={3} className={classes.paper}>
            <h6>{title}</h6>
            <p>
              <GroupWorkIcon className="mr-2" />
              {ground?.category?.name}
            </p>
            <p>
              <PhoneIcon className="mr-2" />
              {phone}
            </p>
            <p>
              <RoomIcon className="mr-2" />
              {getAddress()}
            </p>
          </Paper>
        </Col>
      </Row>

      <Row style={{ justifyContent: "center" }}>
        <Col xs={9}>
          <h5>More playgrounds</h5>
        </Col>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col xs={9}>
          <PageLoader loading={loading}>
            <Row style={{ justifyContent: "center" }}>
              <Col xs={12}>
                <MultipleCarousel dataSource={groundArr} />
              </Col>
            </Row>
          </PageLoader>
        </Col>
      </Row>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
  grounds: state.ground.grounds,
  benefits: state.benefit.benefits,
});
export default connect(mapStateToProps, { getGroundById, getBenefits })(Ground);
