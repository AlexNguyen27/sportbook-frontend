import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../../../store/actions/common";
import moment from "moment";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { Row, Col, Form } from "reactstrap";
import { GET_ERRORS, SAVE_ORDER_DATA, SELECTED_START_DAY } from "../../../../store/actions/types";
import PageLoader from "../../../custom/PageLoader";
import DropdownV2 from "../../../custom/DropdownV2";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { trimObjProperties } from "../../../../utils/formatString";
import { getPrices } from "../../../../store/actions/price";
import { addOrder } from "../../../../store/actions/order";
import { useHistory } from "react-router-dom";
import { getAddress, isSameOrAfterNow } from "../../../../utils/commonFunction";
import Swal from "sweetalert2";

const AddOrderForm = ({
  errors,
  ground,
  subGrounds = {},
  getPrices,
  prices = {},
  auth: { isAuthenticated },
  selectedStartDay,
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const subGroundArr = Object.keys(subGrounds).map(
    (subGroundId) => subGrounds[subGroundId]
  );
  const [selectedSubGroundId, setSelectedSubGroundId] = useState(
    subGroundArr[0]?.id || ""
  );

  useEffect(() => {
    setLoading(true);
    getPrices(setLoading, selectedSubGroundId);
  }, [setSelectedSubGroundId, selectedSubGroundId]);

  const [formData, setFormData] = useState({
    price: "",
    discount: "",
  });

  const startTimeArr = () => {
    const startTimes = [];
    Object.keys(prices).map((key) => {
      if (
        !startTimes.find((item) => item.compare === prices[key].startTime) &&
        isSameOrAfterNow(
          prices[key].startTime,
          selectedStartDay
        )
      ) {
        startTimes.push({
          compare: prices[key].startTime,
          startTime: moment(prices[key].startTime, "HH:mm:ss").format("HH:mm"),
          displayValue: moment(prices[key].startTime, "HH:mm:ss").format(
            "hh:mm A"
          ),
        });
      }
    });
    return startTimes;
  };

  const [selectedDate, setSelectedDate] = React.useState({
    date:
      !selectedStartDay || !selectedStartDay.trim()
        ? new Date()
        : moment(selectedStartDay, "DD/MM/YYYY").format(),
    startTime: startTimeArr[0]?.id || "",
    selectedPriceId: "",
  });

  useEffect(() => {
    if (selectedStartDay && selectedStartDay.trim()) {
      setSelectedDate({
        ...selectedDate,
        date: moment(selectedStartDay, "DD/MM/YYYY").format(),
      });
    }
  }, [selectedStartDay]);

  const getEndTimes = (startTime = '') => {
    let selectedStartTime = startTime || selectedDate.startTime;
    let endTimes = [];
    if (!selectedStartTime.trim()) {
      return endTimes;
    }

    const endTimeArray = _.map(prices, (price) => {
      const newEndTime = {
        priceId: price.id,
        startTime: moment(price.startTime, "HH:mm:ss").format("HH:mm"),
        displayValue: moment(price.endTime, "HH:mm:ss").format("hh:mm A"),
      };
      return newEndTime;
    });

    endTimes = _.filter(endTimeArray, ["startTime", selectedStartTime]);
    return endTimes;
  };

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

  const handleStartTimeChange = (date) => {
    const entimeArr = getEndTimes(date);
    if (entimeArr.length === 1) {
      setSelectedDate({
        ...selectedDate,
        startTime: date,
        selectedPriceId: entimeArr[0].priceId,
      });
      setFormData({
        price: prices[entimeArr[0].priceId].price,
        discount: prices[entimeArr[0].priceId].discount.toString(),
      });
    } else {
      setSelectedDate({
        ...selectedDate,
        startTime: date,
      });
    }
  };

  const handleEndTimeChange = (priceId) => {
    setFormData({
      price: prices[priceId].price,
      discount: prices[priceId].discount.toString(),
    });
    setSelectedDate({
      ...selectedDate,
      selectedPriceId: priceId,
    });
  };

  const history = useHistory();
  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();
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
      return;
    }
    const { price, discount } = formData;

    const error = {};
    const formatedData = trimObjProperties({
      subGroundId: selectedSubGroundId,
      startDay: moment(selectedDate.date).format("DD/MM/YYYY"),
      startTime: prices[selectedDate.selectedPriceId]?.startTime || "",
      endTime: prices[selectedDate.selectedPriceId]?.endTime || "",
    });

    Object.keys(formatedData).map((key) => {
      if (!formatedData[key]) {
        error[key] = "This field is required";
      }
    });
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      const selectedSubGround = subGroundArr.find(
        (item) => item.id === selectedSubGroundId
      );
      dispatch({
        type: SAVE_ORDER_DATA,
        orderData: {
          ...formatedData,
          price,
          discount,
          groundName: ground.title,
          groundAddress: getAddress(ground.address) || "No address",
          groundBenefit: ground.benefit.split(","),
          subGroundName: selectedSubGround.name,
          numberOfPlayers: selectedSubGround.numberOfPlayers,
        },
      });
      // ORDER SCREEN
      history.push("/order");
    }
  };

  return (
    <PageLoader loading={loading} noPadding>
      {/** MODAL BODY */}
      <Form onSubmit={(e) => onSubmit(e)}>
        <hr />
        <Row>
          <Col xs="6" className="mt-2">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                size="small"
                disablePast={true}
                inputVariant="outlined"
                id="date-picker-dialog"
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
          <Col xs="6" className="mt-3">
            <DropdownV2
              fullWidth
              label="Select a sub ground"
              value={selectedSubGroundId.toString() || ""}
              options={subGroundArr || []}
              valueBasedOnProperty="id"
              displayProperty="name"
              onChange={(id) => setSelectedSubGroundId(id)}
              error={errors.subGroundId}
              variant="outlined"
              size="small"
            />
          </Col>
          <Col xs="6" className="mt-3">
            <DropdownV2
              fullWidth
              label="Select start time"
              value={selectedDate.startTime.toString() || ""}
              options={startTimeArr() || []}
              valueBasedOnProperty="startTime"
              displayProperty="displayValue"
              onChange={(time) => handleStartTimeChange(time)}
              error={errors.startTime}
              size="small"
              variant="outlined"
            />
          </Col>
          <Col xs="6" className="mt-3">
            <DropdownV2
              fullWidth
              label="Select end time"
              value={selectedDate.selectedPriceId.toString() || ""}
              options={getEndTimes() || []}
              valueBasedOnProperty="priceId"
              displayProperty="displayValue"
              onChange={(priceId) => handleEndTimeChange(priceId)}
              size="small"
              error={errors.endTime}
              variant="outlined"
            />
          </Col>
        </Row>
        <Row style={{ justifyContent: "center", marginTop: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
          >
            BOOK
          </Button>
        </Row>
        <hr />
      </Form>
    </PageLoader>
  );
};
const mapStateToProps = (state) => ({
  prices: state.price.prices,
  errors: state.errors,
  auth: state.auth,
  selectedStartDay: state.order?.orderData?.startDay,
});
export default connect(mapStateToProps, {
  clearErrors,
  addOrder,
  getPrices,
})(AddOrderForm);
