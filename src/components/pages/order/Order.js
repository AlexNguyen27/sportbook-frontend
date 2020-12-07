import React, { useEffect } from "react";
import { useState } from "react";
import StepOne from "./component/StepOne";
import { connect } from "react-redux";
import StepTwo from "./component/StepTwo";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Steps, { Step } from "rc-steps";
import "rc-steps/assets/index.css";
import { useDispatch } from "react-redux";
import { GET_ERRORS } from "../../../store/actions/types";
import { addOrder } from "../../../store/actions/order";
import CircularProgress from "@material-ui/core/CircularProgress";
import MomoPayment from "./component/MomoPayment";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "100px",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  btn: {
    marginRight: theme.spacing(2),
  },
}));

const Order = ({
  payment,
  user: { phone },
  order: { orderData },
  addOrder,
  errors,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [onStep, setOnStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [onlineModal, setOnlineModal] = useState(false);
  const [closeOnlineModel, setCloseOnlineModel] = useState(false);

  const onContinue = () => {
    console.log(payment.paymentMethod);
    const error = {};
    if (!payment.paymentMethod.trim()) {
      error.paymentMethod = "Please select a payment method!";
    }

    if (!phone) {
      error.phone = "Please update and confirm your phone number!";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      if (payment.paymentMethod === "online") {
        // OPEN MOMO CODE AND ALLOW TO DOWLOAND OWNER MOMO CODE
        // OWNER WILL CONFIRM AS SOON AS POSIBLE
        // IF TOO LATE THEN WILL BE CANCELLED
        setOnlineModal(true);
      } else {
        // TODO : call function to save order payment type
        setLoading(true);
        const data = {
          subGroundId: orderData.subGroundId,
          startDay: orderData.startDay,
          startTime: orderData.startTime,
          endTime: orderData.endTime,
          paymentType: payment.paymentMethod,
          price: orderData.price,
          discount: Number(orderData.discount),
        };
        addOrder(setLoading, data, setOnStep);
      }
    }
  };

  useEffect(() => {
    if (closeOnlineModel) {
      setLoading(true);
      const data = {
        subGroundId: orderData.subGroundId,
        startDay: orderData.startDay,
        startTime: orderData.startTime,
        endTime: orderData.endTime,
        paymentType: payment.paymentMethod,
        price: orderData.price,
        discount: Number(orderData.discount),
      };
      // addOrder(setLoading, data, setOnStep);
      setCloseOnlineModel(false);
    }
  }, [setCloseOnlineModel, closeOnlineModel]);

  return (
    <Row className={classes.wrapper}>
      <Col xs={10}>
        <Steps current={onStep}>
          <Step title="Login" description="Step 1" />
          <Step title="Confirm order" description="Step 2" />
          <Step title="Payment Success" description="Step 3" />
        </Steps>
        {
          {
            1: <StepOne />,
            2: <StepTwo />,
          }[onStep]
        }
      </Col>
      <Col xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
        {
          {
            1: (
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="default"
                  className={classes.btn}
                  startIcon={<ArrowBackIosIcon />}
                  onClick={() =>
                    onStep === 1 ? history.goBack() : setOnStep(1)
                  }
                >
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  endIcon={<NavigateNextIcon />}
                  onClick={() => onContinue()}
                >
                  Continue
                </Button>
                {loading ? (
                  <CircularProgress color="secondary" size={30} />
                ) : null}
              </>
            ),
            2: (
              <Button
                variant="contained"
                size="small"
                color="default"
                startIcon={<ArrowBackIosIcon />}
                onClick={() => history.goBack()}
              >
                Back to home
              </Button>
            ),
          }[onStep]
        }
      </Col>
      <MomoPayment
        setModal={setOnlineModal}
        modal={onlineModal}
        setCloseOnlineModel={setCloseOnlineModel}
      />
    </Row>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.auth.user,
  payment: state.payment,
  order: state.order,
});
export default connect(mapStateToProps, { addOrder })(Order);
