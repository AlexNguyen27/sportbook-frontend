import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Col, Row } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import PriceDetail from "./component/PriceDetail";
import { SELECTED_START_DAY } from "../../../store/actions/types";
import SearchForm from "./component/SearchForm";

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
        <Row
          style={{
            justifyContent: "center",
          }}
        >
          {[...Array(7)].map((item, index) => (
            <Col xs="auto" className="px-2 mb-2">
              <Button
                size="small"
                color="primary"
                variant={selectedDate === index ? "contained" : "outlined"}
                onClick={() => onChangeSelectedStartDay(index)}
              >
                {moment().add(index, "days").format("dddd")}
                <br />
                {moment().add(index, "days").format("DD-MM")}
              </Button>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            {/*  SEARCH SUB GROUND*/}
            <SearchForm subGrounds={ground.subGrounds} ground={ground} />

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
