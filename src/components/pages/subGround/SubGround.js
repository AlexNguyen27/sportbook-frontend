import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Col, Row } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import PriceDetail from "./component/PriceDetail";
import AddOrderForm from "./component/AddOrderForm";
import { SELECTED_START_DAY } from "../../../store/actions/types";

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
    // color: "#303F9F",
  },
  btnGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  bold: {
    fontWeight: "bold",
    margin: 0,
    paddingRight: "14px",
    paddingLeft: "14px",
    // color: "#303F9F",
  },
}));
const SubGround = ({ ground }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedDate, setSelectedWeekDate] = useState(0);

  const onChangeSelectedStartDay = (index) => {
    setSelectedWeekDate(index);
    dispatch({
      type: SELECTED_START_DAY,
      startDay: moment().add(index, "days").format("DD-MM-YYYY"),
    });
  };

  useEffect(() => {
    dispatch({
      type: SELECTED_START_DAY,
      startDay: moment().format("DD-MM-YYYY"),
    });
  }, []);

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        {/* <div className={classes.btnGroup}> */}
        {/* <ButtonGroup
            color="primary"
            size="small"
            aria-label="outlined primary button group"
          > */}
        <Row
          style={{
            justifyContent: 'center',
          }}
        >
          {[...Array(7)].map((item, index) => (
            <Col xs="auto" className="px-1 mb-2">
              <Button
                size="small"
                color="primary"
                variant={selectedDate === index ? "contained" : "outlined"}
                onClick={() => onChangeSelectedStartDay(index)}
              >
                {/* <div>
                    <p
                      style={{ padding: "0" }}
                      className={
                        selectedDate === index ? classes.bold : classes.noMargin
                      }
                    > */}
                {moment().add(index, "days").format("dddd")}
                <br />
                {/* </p> */}
                {/* <p
                      style={{ padding: "0" }}
                      className={
                        selectedDate === index ? classes.bold : classes.noMargin
                      }
                    > */}
                {moment().add(index, "days").format("DD-MM")}
                {/* </p> */}
                {/* </div> */}
              </Button>
            </Col>
          ))}
        </Row>

        {/* </ButtonGroup> */}
        {/* </div> */}
        <Row>
          <Col>
            {/*  SEARCH SUB GROUND*/}
            <AddOrderForm subGrounds={ground.subGrounds} ground={ground} />

            {/* PRICE DETAIL */}
            <PriceDetail />
          </Col>
        </Row>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
});
export default connect(mapStateToProps, {})(SubGround);
