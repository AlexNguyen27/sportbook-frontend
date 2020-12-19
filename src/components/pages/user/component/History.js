import React from "react";
import { useState } from "react";
import { Col, Row, Button } from "reactstrap";
import DropdownV2 from "../../../custom/DropdownV2";
import { ORDER_STATUS } from "../../../../utils/common";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { getOrderHistory } from "../../../../store/actions/order";
import HistoryTable from "./HistoryTable";
import { connect } from "react-redux";
import PageLoader from "../../../custom/PageLoader";
import { useEffect } from "react";

const History = ({ getOrderHistory }) => {
  const STATUS = { ...ORDER_STATUS, all: "All" };
  const [orderStatus, setOrderStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderHistory(setLoading, {
      status: "all",
    });
  }, []);

  const orderStatusArr = Object.keys(STATUS).map((key) => ({
    key: key,
    value: STATUS[key],
  }));

  const [selectedStartDate, setSelectedStartDate] = React.useState(
    moment().subtract(7, "days")
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getOrderHistory(setLoading, {
      status: orderStatus,
      fromDate: selectedStartDate,
      toDate: selectedEndDate,
    });
  };

  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

  return (
    <div>
      <h4 className="text-center mb-4">Your orders</h4>
      <form onSubmit={(e) => onSubmit(e)}>
        <Row style={{ justifyContent: "center" }}>
          <Col xs={3}>
            <DropdownV2
              fullWidth
              label="Order status"
              value={orderStatus.toString()}
              size="small"
              options={orderStatusArr || []}
              valueBasedOnProperty="key"
              displayProperty="value"
              onChange={(key) => setOrderStatus(key)}
              variant="outlined"
            />
          </Col>
          <Col xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                className="mt-0"
                variant="inline"
                style={{ width: "100%" }}
                inputVariant="outlined"
                size="small"
                format="dd/MM/yyyy 00:00:00"
                margin="normal"
                id="date-picker-inline"
                label="From date"
                value={selectedStartDate}
                onChange={(date) => setSelectedStartDate(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Col>
          <Col xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                className="mt-0"
                size="small"
                inputVariant="outlined"
                format="dd/MM/yyyy 23:59:59"
                minDate={selectedStartDate}
                style={{ width: "100%" }}
                margin="normal"
                id="date-picker-inline"
                label="To date"
                value={selectedEndDate}
                onChange={(date) => setSelectedEndDate(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
      <Row style={{ justifyContent: "center" }}>
        <Col>
          <PageLoader loading={loading}>
            <HistoryTable />
          </PageLoader>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
});
export default connect(mapStateToProps, { getOrderHistory })(History);
