import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../../../store/actions/common";
import moment from "moment";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { Row, Col, Form } from "reactstrap";
import {
  SELECTED_START_DAY,
  SAVE_SEARCH_SUBGROUND,
} from "../../../../store/actions/types";
import DropdownV2 from "../../../custom/DropdownV2";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  TimePicker,
} from "@material-ui/pickers";
import { getPrices } from "../../../../store/actions/price";
import { addOrder } from "../../../../store/actions/order";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const SearchForm = ({ errors, subGrounds = {}, selectedStartDay, search }) => {
  const dispatch = useDispatch();

  const [selectedPlayers, setSelectedPlayers] = useState(
    search.numberOfPlayers || ""
  );
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState({
    date:
      !selectedStartDay || !selectedStartDay.trim()
        ? new Date()
        : moment(selectedStartDay, "DD/MM/YYYY").format(),
    selectedPriceId: "",
  });

  const subGroundArr = [
    ...Object.keys(subGrounds).map((subGroundId) => subGrounds[subGroundId]),
  ];

  useEffect(() => {
    if (selectedStartDay && selectedStartDay.trim()) {
      setSelectedDate({
        ...selectedDate,
        date: moment(selectedStartDay, "DD/MM/YYYY").format(),
      });
    }
  }, [selectedStartDay]);

  const handleDateChange = (date, fieldName) => {
    setSelectedDate({
      ...selectedDate,
      [fieldName]: date,
    });

    //  SAVE TO REDUX
    dispatch({
      type: SELECTED_START_DAY,
      startDay: moment(date).format("DD-MM-YYYY"),
    });
  };

  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: SAVE_SEARCH_SUBGROUND,
      numberOfPlayers: selectedPlayers,
      selectedStartTime: selectedStartTime
        ? moment(selectedStartTime).format("HH:mm:ss")
        : "",
    });
  };

  const getNumberOfPlayers = () => {
    return subGroundArr.reduce((acc, curr) => {
      if (
        curr.numberOfPlayers &&
        !acc.find(
          (item) => curr.numberOfPlayers && item.id === curr.numberOfPlayers
        )
      ) {
        const newObj = {
          id: curr.numberOfPlayers,
          value: `${curr.numberOfPlayers}`,
        };
        return [...acc, newObj];
      }
      return [...acc];
    }, []);
  };

  return (
    <>
      {/** MODAL BODY */}
      <Form onSubmit={(e) => onSubmit(e)}>
        <hr />
        <Row style={{ justifyContent: "center" }}>
          <Col xs="6" className="mt-2">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                margin="normal"
                size="small"
                variant="inline"
                disablePast={true}
                inputVariant="outlined"
                id="date-picker-inline"
                label="Select date"
                style={{ margin: 0, width: "100%" }}
                format="dd/MM/yyyy"
                value={selectedDate.date}
                onChange={(date) => handleDateChange(date, "date")}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                error={errors.startDay}
              />
            </MuiPickersUtilsProvider>
          </Col>
          <Col xs="6" className="mt-2">
            <DropdownV2
              fullWidth
              label="Select number of players"
              value={selectedPlayers.toString() || ""}
              options={getNumberOfPlayers() || []}
              valueBasedOnProperty="id"
              displayProperty="value"
              onChange={(numberOfPlayers) =>
                setSelectedPlayers(numberOfPlayers)
              }
              error={errors.numberOfPlayers}
              variant="outlined"
              size="small"
            />
          </Col>

          <Col xs="6" className="mt-2">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                style={{ width: "100%" }}
                margin="normal"
                size="small"
                variant="inline"
                inputVariant="outlined"
                id="time-picker"
                clearable={true}
                label="Select start time"
                value={selectedStartTime}
                o
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      size="small"
                      onClick={() => setSelectedStartTime(null)}
                    >
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
                InputAdornmentProps={{
                  position: "start",
                }}
                onChange={(time) => setSelectedStartTime(time)}
              />
            </MuiPickersUtilsProvider>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center", marginTop: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            startIcon={<SearchIcon />}
          >
            SEARCH
          </Button>
        </Row>
        <hr />
      </Form>
    </>
  );
};
const mapStateToProps = (state) => ({
  prices: state.price.prices,
  errors: state.errors,
  auth: state.auth,
  selectedStartDay: state.order?.orderData?.startDay,
  search: state.ground.search,
});
export default connect(mapStateToProps, {
  clearErrors,
  addOrder,
  getPrices,
})(SearchForm);
