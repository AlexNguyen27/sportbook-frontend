import React from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Col, Row } from "reactstrap";
import SearchSubGround from "./component/SearchSubGround";

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
  noMargin: {
    margin: 0,
    paddingRight: "14px",
    paddingLeft: "14px",
    color: "#303F9F",
  },
  btnGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const WEEKDAY = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};
const SubGround = () => {
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.btnGroup}>
          <ButtonGroup
            color="primary"
            // size="small"
            aria-label="outlined primary button group"
          >
            {Object.keys(WEEKDAY).map((key) => (
              <Button>
                <div>
                  <p className={classes.noMargin}>{WEEKDAY[key]}</p>
                  <p className={classes.noMargin}>
                    {moment().day(WEEKDAY[key]).format("DD-MM")}
                  </p>
                </div>
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <Row>
          <Col>
            <SearchSubGround />
          </Col>
        </Row>
      </Paper>
    </div>
  );
};

export default SubGround;
