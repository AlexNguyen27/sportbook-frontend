import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import GroundItem from "./component/GroundItem";
import FilterListIcon from "@material-ui/icons/FilterList";
import DropdownV2 from "../../custom/DropdownV2";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "@material-ui/core";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
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
}));

const SearchGround = (props) => {
  const classes = useStyles();

  return (
    <>
      <Row className={classes.wrapper}>
        <Col xs={8}>
          <Row>
            <Paper
              elevation={3}
              style={{ width: "100%", padding: "20px 10px 20px 10px" }}
            >
              <Row style={{ justifyContent: "center" }}>
                <Col xs={3} style={{ alignSelf: "center" }}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={[]}
                    size="small"
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Combo box"
                        variant="outlined"
                      />
                    )}
                  />
                </Col>
                <Col xs={3}>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={[]}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Combo box"
                        variant="outlined"
                      />
                    )}
                  />
                </Col>
                <Col xs={3}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={[]}
                    size="small"
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Combo box"
                        variant="outlined"
                      />
                    )}
                  />
                </Col>
                <Col
                  xs={2}
                  style={{ alignSelf: "center", textAlign: "center" }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    style={{ width: "100%" }}
                    color="primary"
                    className={classes.margin}
                    startIcon={<SearchIcon />}
                  >
                    search
                  </Button>
                </Col>
              </Row>
            </Paper>
          </Row>
          <Row>
            <GreenRadio
              checked={true}
              onChange={() => {}}
              value="c"
              name="radio-button-demo"
              inputProps={{ label: "C" }}
            />
            <span style={{ marginTop: "auto", marginBottom: "auto" }}>
              Show all locations are empty field and can book online
            </span>
          </Row>
          <hr></hr>
        </Col>
        <Col xs={8}>
          <Row>
            <Col style={{ alignSelf: "flex-end" }} xs={7}>
              <h5>23 results found in Ho Chi Minh city</h5>
            </Col>
            <Col xs={2} style={{ alignSelf: "center", textAlign: "right" }}>
              <h5 className="d-inline">
                <FilterListIcon size="small" className="mr-2" />
                Filter by
              </h5>
            </Col>
            <Col xs={3}>
              <DropdownV2
                label=""
                fullWidth
                value={"".toString()}
                options={[]}
                valueBasedOnProperty="key"
                displayProperty="value"
                onChange={(key) => {}}
                size="small"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row>
            {[...Array(6)].map((item) => (
              <GroundItem />
            ))}
          </Row>
        </Col>
      </Row>
      {/* AUTO COMPLATE GROUND NAME */}

      {/* OPEN TIME */}

      {/* AVAILABLE GROUND */}

      {/* MAP WITH ADDRESS */}
    </>
  );
};

export default SearchGround;
