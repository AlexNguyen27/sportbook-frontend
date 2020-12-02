import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getGroundById } from "../../../store/actions/ground";
import PageLoader from "../../custom/PageLoader";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Paper } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import StarIcon from "@material-ui/icons/Star";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import MultipleCarousel from "../../custom/MultipleCarousel";
import { getBenefits } from "../../../store/actions/benefit";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import { DEFAULT_GROUND_IMAGE } from "../../../utils/common";
import { getAddress } from "../../../utils/commonFunction";
import Review from "./component/Review";
import Comment from "./component/Comment";
import SubGround from "../subGround/SubGround";
import ReviewModel from "./component/ReviewModel";
import { getRatings } from "../../../store/actions/rating";

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

const Ground = ({
  getGroundById,
  ground,
  grounds,
  getBenefits,
  benefits,
  getRatings,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const pathName = history.location.pathname.split("/");
  const [modelReview, setModelReview] = useState(false);

  useEffect(() => {
    // getGroundById(setLoading, match);
    if (pathName && pathName[2]) {
      const groundId = pathName[2];
      setLoading(true);
      getGroundById(setLoading, groundId).then(() => {
        getBenefits(setLoading).then(() => {
          setLoading(true);
          // GET RATING
          getRatings(setLoading);
        });
        console.log("hsitroy=------------------------", history);
      });
      document.getElementById("test-image").style.background = `url('${
        getImageUrls()[0] || DEFAULT_GROUND_IMAGE
      }')`;
      document.getElementById("test-image").style.backgroundPosition = "center";
      document.getElementById("test-image").style.backgroundRepeat =
        "no-repeat";
      document.getElementById("test-image").style.backgroundSize = "cover";
    }
  }, [pathName[2]]);

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
              <h5 style={{ color: "#f0a500" }}>{getAddress(ground.address)}</h5>
              <h5>
                {[...Array(4)].map((item) => (
                  <StarIcon size="small" style={{ color: "#f0a500" }} />
                ))}
                <span style={{ color: "#f0a500", fontSize: "16px" }}>
                  Reviews
                </span>
              </h5>
              {/* <h5>
                <ReportIcon size="small" style={{ color: "#f56a79" }} />
                <span style={{ color: "#ff4b5c" }}>Reports</span>
              </h5> */}
              <Button
                variant="contained"
                color="primary"
                size="small"
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
                size="small"
                className={classes.button}
                endIcon={<CreditCardIcon />}
                onClick={() => setModelReview(true)}
              >
                Book Online
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <Row style={{ justifyContent: "center" }}>
        <Col xs={6}>
          {/* SUB GROUND AND PRICING */}
          {!ground?.subGrounds?.length ? (
            <Paper elevation={3} className={classes.paper}>
              <h5>This ground do not support booking online</h5>
              <p>Please check the contact information below</p>
            </Paper>
          ) : (
            <SubGround />
          )}

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
                    <CheckCircleIcon style={{ color: "#61b15a" }} />{" "}
                    {benefits[key].title}{" "}
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
            title="t"
          ></iframe>
          <hr />
          <h5>Playground Images</h5>
          {/*list ground image  */}

          <Row className="text-center">
            {getImageUrls().length > 0 ? (
              getImageUrls().map((url) => (
                <Col xs={6}>
                  <img
                    style={{ position: "relative" }}
                    width="100%"
                    height="100%"
                    src={url}
                    alt={""}
                  />
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p>No image data</p>
              </Col>
            )}
          </Row>
          <hr />
          <Paper elevation={3} className={classes.paper}>
            <h5>Reviews & Comments</h5>
            <Review />
            <hr />

            <Comment />
          </Paper>
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
              size="small"
              endIcon={<CreditCardIcon />}
            >
              Contact
            </Button>
          </div>
          <Paper elevation={3} className={classes.paper}>
            <h6>CONTACT</h6>
            <p>
              <GroupWorkIcon className="mr-2" />
              {ground?.category?.name}
            </p>
            <p>
              <PhoneIcon className="mr-2" />
              {phone || "No phone"}
            </p>
            <p>
              <RoomIcon className="mr-2" />
              {getAddress(ground.address) || "No address"}
            </p>
            <div className="text-center">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                size="small"
                endIcon={<StarIcon />}
                onClick={() => setModelReview(true)}
              >
                Review
              </Button>
            </div>
            <ReviewModel modal={modelReview} setModal={setModelReview} />
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
            <Row style={{ justifyContent: "center" }} className="mb-4">
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
export default connect(mapStateToProps, {
  getGroundById,
  getBenefits,
  getRatings,
})(Ground);
