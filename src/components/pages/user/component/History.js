import React from "react";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import DropdownV2 from "../../../custom/DropdownV2";
import { ORDER_STATUS } from "../../../../utils/common";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import HistoryTable from "./HistoryTable";

const History = () => {
  const STATUS = { ...ORDER_STATUS, all: "All" };
  const [orderStatus, setOrderStatus] = useState("all");

  const orderStatusArr = Object.keys(STATUS).map((key) => ({
    key: key,
    value: STATUS[key],
  }));

  const [selectedStartDate, setSelectedStartDate] = React.useState(
    moment().subtract(7, "days")
  );

  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

  return (
    <div>
      <h4 className="text-center mb-4">Your orders</h4>
      <Row>
        <Col xs={4}>
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
        <Col xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              className="mt-0"
              variant="inline"
              style={{ width: "100%" }}
              inputVariant="outlined"
              size="small"
              format="MM/dd/yyyy"
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
        <Col xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              className="mt-0"
              size="small"
              inputVariant="outlined"
              format="MM/dd/yyyy"
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
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col>
          <HistoryTable
            status={orderStatus}
            fromDate={selectedStartDate}
            toDate={selectedEndDate}
          />
        </Col>
      </Row>
    </div>
  );
};

export default History;
