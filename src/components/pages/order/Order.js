import React from "react";
import { useState } from "react";
import StepOne from "./component/StepOne";
import StepTwo from "./component/StepTwo";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import CustomizedProgress from "../../custom/CustomizedProgress";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Steps, { Step } from "rc-steps";
import "rc-steps/assets/index.css";

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

const Order = () => {
  const history = useHistory();
  const classes = useStyles();

  const [onStep, setOnStep] = useState(1);

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
                  onClick={() => setOnStep(2)}
                >
                  Continue
                </Button>
              </>
            ),
            2: (
              <Button
                variant="contained"
                size="small"
                color="default"
                startIcon={<ArrowBackIosIcon />}
                onClick={() => history.push("/")}
              >
                Back to home
              </Button>
            ),
          }[onStep]
        }
      </Col>
    </Row>
  );
};

export default Order;
