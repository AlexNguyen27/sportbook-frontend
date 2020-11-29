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
  const [progress, setProgress] = useState(50);

  const onBackStepTwo = () => {
    setOnStep(1);
    setProgress(50);
  };
  return (
    <Row className={classes.wrapper}>
      <Col xs={10}>
        <CustomizedProgress value={progress}>
          {
            {
              1: <StepOne />,
              2: <StepTwo />,
            }[onStep]
          }
        </CustomizedProgress>
      </Col>
      <Col xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
        <Button
          variant="contained"
          size="small"
          color="default"
          className={classes.btn}
          startIcon={<ArrowBackIosIcon />}
          onClick={() => (onStep === 1 ? history.goBack() : onBackStepTwo())}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          endIcon={<NavigateNextIcon />}
          onClick={() => {
            setOnStep(2);
            setProgress(100);
          }}
        >
          Continue
        </Button>
      </Col>
    </Row>
  );
};

export default Order;
