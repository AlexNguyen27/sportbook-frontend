import React, { useState } from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
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
const SubGround = ({ ground }) => {
  const classes = useStyles();

  const [selectedDate, setSelectedWeekDate] = useState();

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
              <Button onClick={() => setSelectedWeekDate(key)}>
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
            {/*  SEARCH SUB GROUND*/}
            <SearchSubGround />
          </Col>
        </Row>
        {/* <Row style={{ justifyContent: "center", marginTop: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            className={classes.button}
          >
            BOOK A GROUND
          </Button>
        </Row> */}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
});
export default connect(mapStateToProps, {})(SubGround);
