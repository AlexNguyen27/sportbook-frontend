import React from "react";
import { Row, Col, Form } from "reactstrap";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DropdownV2 from "../../../custom/DropdownV2";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SubGroundDetail from "./SubGroundDetail";

const SearchSubGround = ({ onSubmit }) => {
  return (
    <div>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Row>
          <Col xs="4" className="mt-2">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                variant="outlined"
                id="date-picker-dialog"
                label="Pick or Select a date"
                format="dd/MM/yyyy"
                size="small"
                value={"12/12/2020"}
                onChange={(date) => ""}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Col>
          <Col xs="4" className="mt-4">
            <DropdownV2
              fullWidth
              label="Select start time"
              value={""}
              options={[]}
              valueBasedOnProperty="startTime"
              displayProperty="displayValue"
              onChange={(time) => {}}
              size="small"
            />
          </Col>
          <Col xs="4" className="mt-4">
            <DropdownV2
              fullWidth
              label="Select end time"
              value={""}
              options={[]}
              valueBasedOnProperty="priceId"
              displayProperty="displayValue"
              onChange={(priceId) => {}}
              size="small"
            />
          </Col>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Row>
      </Form>

      <SubGroundDetail />
    </div>
  );
};

export default SearchSubGround;
