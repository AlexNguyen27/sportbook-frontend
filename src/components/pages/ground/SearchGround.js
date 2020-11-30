import React, { useEffect, useState } from "react";
import _ from "lodash";
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
import { connect } from "react-redux";
import { getBenefits } from "../../../store/actions/benefit";
import { getGrounds } from "../../../store/actions/ground";
import PageLoader from "../../custom/PageLoader";
import Pagination from "@material-ui/lab/Pagination";
import REGIONS from "../../locales/regions.json";
import DISTRICTS from "../../locales/districts.json";
import WARDS from "../../locales/wards.json";
import TextFieldInput from "../../custom/TextFieldInputWithheader";

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

const SearchGround = ({ getBenefits, getGrounds, grounds }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [onShowAll, setOnShowAll] = useState(false);
  const [groundData, setGroundData] = useState();

  useEffect(() => {
    setLoading(true);
    getGrounds(setLoading).then(() => {
      setLoading(true);
      getBenefits(setLoading);
    });
  }, []);

  const [selectedDropdownData, setSelectedDropdownData] = useState({
    selectedRegionCode: "",
    selectedDistrictCode: "",
    selectedWardCode: "",
  });

  const {
    selectedRegionCode,
    selectedDistrictCode,
    selectedWardCode,
  } = selectedDropdownData;

  const groundArr = Object.keys(grounds).map((groundId) => grounds[groundId]);
  const regionArr = Object.keys(REGIONS).map((key) => ({
    code: REGIONS[key].code,
    name: REGIONS[key].name_with_type,
  }));

  const getDistricts = () => {
    let districts = [];
    if (!selectedRegionCode.trim()) {
      return districts;
    }

    const districtArray = _.map(DISTRICTS, (district) => {
      const newDistrict = {
        code: district.code,
        name: district.name_with_type,
        parent_code: district.parent_code,
      };
      return newDistrict;
    });

    districts = _.filter(districtArray, ["parent_code", selectedRegionCode]);
    return districts;
  };

  const getWards = () => {
    let wards = [];
    if (!selectedDistrictCode.trim()) {
      return wards;
    }
    const wardArray = _.map(WARDS, (ward) => {
      const newWard = {
        code: ward.code,
        name: ward.name_with_type,
        parent_code: ward.parent_code,
      };
      return newWard;
    });
    wards = _.filter(wardArray, ["parent_code", selectedDistrictCode]);
    return wards;
  };

  const onChangeRegion = (code) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedRegionCode: code,
      selectedWardCode: "",
      selectedDistrictCode: "",
    });
  };

  const onChangeDistrict = (code) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedDistrictCode: code,
      selectedWardCode: "",
    });
  };

  const onChangeWard = (code) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedWardCode: code,
    });
  };

  return (
    <>
      <Row className={classes.wrapper}>
        <Col xs={8}>
          <Row style={{ justifyContent: "center" }}>
            <Paper
              elevation={3}
              style={{ width: "100%", padding: "20px 20px 20px 20px" }}
            >
              <Row style={{ justifyContent: "center" }}>
                <Col xs={10}>
                  <Row style={{ justifyContent: "center" }}>
                    <Col xs={8} style={{ alignSelf: "center" }}>
                      <Autocomplete
                        id="combo-box-demo"
                        options={groundArr || []}
                        size="small"
                        getOptionLabel={(option) => option.title}
                        onChange={(event, newValue) => {
                          setGroundData(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Enter ground name"
                            variant="outlined"
                          />
                        )}
                      />
                    </Col>
                    <Col xs={4} style={{ alignSelf: "center" }}>
                      <TextFieldInput
                        id="outlined-multiline-flexible"
                        name="phone"
                        label="Phone"
                        fullWidth
                        value={groundData?.phone || ""}
                        placeHolder="Phone"
                        variant="outlined"
                        size="small"
                        disabled
                      />
                    </Col>
                  </Row>
                  <Row style={{ justifyContent: "center", marginTop: "16px" }}>
                    <Col xs={4}>
                      <DropdownV2
                        fullWidth
                        size="small"
                        label="City / Province / Region"
                        value={selectedRegionCode.toString()}
                        options={regionArr || []}
                        valueBasedOnProperty="code"
                        displayProperty="name"
                        onChange={(code) => onChangeRegion(code)}
                        variant="outlined"
                      />
                    </Col>
                    <Col xs={4}>
                      <DropdownV2
                        fullWidth
                        variant="outlined"
                        label="District"
                        size="small"
                        value={selectedDistrictCode.toString()}
                        options={getDistricts() || []}
                        valueBasedOnProperty="code"
                        displayProperty="name"
                        onChange={(code) => onChangeDistrict(code)}
                      />
                    </Col>
                    <Col xs={4}>
                      <DropdownV2
                        fullWidth
                        label="Ward"
                        variant="outlined"
                        value={selectedWardCode.toString()}
                        options={getWards() || []}
                        valueBasedOnProperty="code"
                        size="small"
                        displayProperty="name"
                        onChange={(code) => onChangeWard(code)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={2}>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ width: "100%", alignSelf: "center" }}
                    color="secondary"
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
              checked={onShowAll}
              onChange={() => setOnShowAll(!onShowAll)}
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
          <PageLoader loading={loading}>
            <Row>
              {groundArr.map((item) => (
                <GroundItem key={item.id} ground={item} />
              ))}
            </Row>
          </PageLoader>
          <Col xs={12} style={{ alignSelf: "center" }}>
            <Pagination count={10} color="primary" />
          </Col>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  grounds: state.ground.grounds,
});
export default connect(mapStateToProps, { getBenefits, getGrounds })(
  SearchGround
);
