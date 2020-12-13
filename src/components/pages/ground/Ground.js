import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getGroundById, getGrounds } from "../../../store/actions/ground";
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
import { DEFAULT_GROUND_IMAGE, clearErrors } from "../../../utils/common";
import { getAddress, roundNumber } from "../../../utils/commonFunction";
import Review from "../review/Review";
import Comment from "../comment/Comment";
import SubGround from "../subGround/SubGround";
import ReviewModel from "../review/component/ReviewModel";
import { getRatings } from "../../../store/actions/rating";
import Swal from "sweetalert2";
import Rating from "@material-ui/lab/Rating";
import ReactGoogleMaps from "../../custom/ReactGoogleMaps";
import ShareFacebookButton from "./component/ShareFacebookButton";

const useStyles = makeStyles((theme) => ({
  title: {
    position: "absolute",
    top: "150px",
    width: "100%",
    // marginLeft: 0,
    // marginRight: 0,
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
  row: {
    marginLeft: 0,
    marginRight: 0,
    justifyContent: "center",
  },
}));

const Ground = ({
  getGroundById,
  ground,
  grounds,
  getBenefits,
  benefits,
  getRatings,
  auth: { isAuthenticated },
  clearErrors,
  selectedStartDay,
  ratings,
  getGrounds,
  match,
}) => {
  const groundId = match.params.id;
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [modelReview, setModelReview] = useState(false);

  useEffect(() => {
    setLoading(true);
    getGrounds(setLoading); // FOR RECOMMENT GROUND
  }, []);

  useEffect(() => {
    if (selectedStartDay && selectedStartDay.trim()) {
      // GET SUBGROUNDS AND SAVE TO SELECTED GROUND
      getGroundById(setLoading, groundId, selectedStartDay);
    }
  }, [selectedStartDay]);

  useEffect(() => {
    clearErrors();
    if (groundId) {
      setLoading(true);
      getGroundById(
        setLoading,
        groundId,
        selectedStartDay || moment().format("DD-MM-YYYY")
      ).then(() => {
        getBenefits(setLoading).then(() => {
          setLoading(true);
          // GET RATING
          getRatings(setLoading);
        });
        document.getElementById("ground-image").style.background = `url('${
          getImageUrls()[0] || DEFAULT_GROUND_IMAGE
        }')`;
        document.getElementById("ground-image").style.backgroundPosition =
          "center";
        document.getElementById("ground-image").style.backgroundRepeat =
          "no-repeat";
        document.getElementById("ground-image").style.backgroundSize = "cover";
      });
    }
  }, [groundId]);

  useEffect(() => {
    if (ground && loading === false) {
      document.getElementById("ground-image").style.background = `url('${
        getImageUrls()[0] || DEFAULT_GROUND_IMAGE
      }')`;
      document.getElementById("ground-image").style.backgroundPosition =
        "center";
      document.getElementById("ground-image").style.backgroundRepeat =
        "no-repeat";
      document.getElementById("ground-image").style.backgroundSize = "cover";
    }
  }, [groundId, loading]);

  const groundArr = Object.keys(grounds).map((groundId) => grounds[groundId]);

  const { title, description, phone, image } = ground;
  const benefitArr = ground.benefit ? ground.benefit.split(",") : [];

  const getImageUrls = () => {
    const formatImage = ground.image ? JSON.parse(image) : [];
    if (formatImage && formatImage.length > 0) {
      return formatImage.map((item) => item);
    } else {
      return [];
    }
  };

  const onClickReview = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: `Please login to continue?`,
        text: "",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.value) {
          history.push("/login");
        }
      });
    } else {
      setModelReview(true);
    }
  };

  const averageRate =
    ratings.length > 0
      ? ratings.reduce((acc, curr) => acc + curr.point, 0) / ratings.length
      : 0;

  return (
    <PageLoader loading={loading}>
      <div id="ground-image" style={{ height: "500px", position: "relative" }}>
        <div className={classes.title}>
          <Row style={{ justifyContent: "center" }}>
            <Col xs={9}>
              <h2 className="text-capitalize" style={{ color: "" }}>
                {title}
              </h2>
              <h5 style={{ color: "" }}>{getAddress(ground.address)}</h5>
              <h5>
                <Rating
                  name="read-only"
                  value={roundNumber(averageRate, 1)}
                  readOnly
                />
                <span style={{ fontSize: "12px" }}>
                  (View{" "}
                  {`${ratings.length} ${
                    ratings.length > 1 ? "reviews " : "review "
                  }`}
                  below)
                </span>
              </h5>

              <ShareFacebookButton groundId={ground.id} />
            </Col>
            {/* <Col xs={3} style={{ alignSelf: "flex-end", textAlign: "right" }}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                endIcon={<CreditCardIcon />}
                onClick={() => {}}
              >
                Book Online
              </Button>
            </Col> */}
          </Row>
        </div>
      </div>
      <Row className={classes.row}>
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
            {!benefitArr.length ? (
              <p>No benefits</p>
            ) : (
              benefitArr.map((key) => (
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
              ))
            )}
          </div>
          <hr />
          <h5>Ground Map</h5>
          <ReactGoogleMaps address={getAddress(ground.address)} />
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
              <a href={`tel:${phone}`} alt="">
                {phone || "No phone"}
              </a>
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
                onClick={() => onClickReview()}
              >
                Review
              </Button>
            </div>
            <ReviewModel modal={modelReview} setModal={setModelReview} />
          </Paper>
        </Col>
      </Row>

      <Row className={classes.row}>
        <Col xs={9}>
          <h5>More playgrounds</h5>
        </Col>
      </Row>
      <Row className={classes.row}>
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
  auth: state.auth,
  selectedStartDay: state.order?.orderData?.startDay,
  ratings: state.rating.ratings,
});
export default connect(mapStateToProps, {
  getGroundById,
  getBenefits,
  getRatings,
  clearErrors,
  getGrounds,
})(Ground);
