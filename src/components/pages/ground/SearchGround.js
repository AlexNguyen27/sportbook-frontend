import React, { useEffect, useState } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import GroundItem from "./component/GroundItem";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { getBenefits } from "../../../store/actions/benefit";
import { getGrounds, getSearchGrounds } from "../../../store/actions/ground";
import PageLoader from "../../custom/PageLoader";
import Pagination from "@material-ui/lab/Pagination";
import REGIONS from "../../locales/regions.json";
import DISTRICTS from "../../locales/districts.json";
import WARDS from "../../locales/wards.json";
import TextFieldInput from "../../custom/TextFieldInputWithheader";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import moment from "moment";
import Colors from "../../../constants/Colors";

const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

const ColorPagination = withStyles((theme) => ({
  root: {
    "& .Mui-selected": {
      color: "white",
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
  },
}))(Pagination);

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "100px",
    justifyContent: "center",
    marginLeft: 0,
    marginRight: 0,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const DEFAULT_PAGE_SIZE = 10;

const SearchGround = ({
  getBenefits,
  getGrounds,
  grounds,
  getSearchGrounds,
  categories,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [onShowAll, setOnShowAll] = useState(false);
  const [isNearLocation, setNearLocation] = useState(false);
  const [userLocation, setUserLocation] = useState("");

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

  const categoryArr = Object.keys(categories).map((cateId) => ({
    ...categories[cateId],
  }));

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    setLoading(true);
    getGrounds(setLoading).then(() => {
      setLoading(true);
      getBenefits(setLoading);
      onChangePagination(0, 1);
    });
  }, []);

  const groundArr = Object.keys(grounds).map((groundId) => grounds[groundId]);

  const onChangePagination = (e, pageNumber) => {
    const getPageData = groundArr.slice(
      DEFAULT_PAGE_SIZE * (pageNumber - 1),
      DEFAULT_PAGE_SIZE * pageNumber
    );

    setDataSource([...getPageData]);
  };
  // TODO : FIX PAGINATION
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onSearch = (e) => {
    e.preventDefault();

    setLoading(true);

    // ["Acb", " Xo Viet Nghe Tinh Road", " Phường 21", " Ho Chi Minh City", " Vietnam"]
    console.log("hear-------------", userLocation);
    let location = {};
    if (isNearLocation) {
      const locationData = userLocation.split(",");
      location = {
        regionName: locationData[3].replace("City", "").trim(),
      };
    }

    let searchData = {
      search: searchText,
      regionName: REGIONS[selectedRegionCode]?.name_with_type || "",
      districtName: DISTRICTS[selectedDistrictCode]?.name_with_type || "",
      wardName: WARDS[selectedWardCode]?.name_with_type || "",
      categoryId: selectedCategoryId,
      ...location,
    };

    if (onShowAll) {
      searchData = {
        ...searchData,
        isAvailable: true,
        startTime: moment().format("HH:mm:ss"),
        startDay: moment().format("DD-MM-YYYY"),
      };
    }
    getSearchGrounds(setLoading, searchData, setDataSource);
  };

  const onShowAllEmptyField = (checked) => {
    setOnShowAll(checked);
  };

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

  const hanleOnCheckNearLocation = (checked) => {
    setNearLocation(checked);
    if (window.navigator.geolocation) {
      const successfulLookup = (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=0b605467d7da49cc9ebbefc0991aea71`
        )
          .then((response) => response.json())
          .then(({ results }) => {
            setUserLocation(results[0].formatted);
          });
      };
      // Geolocation available
      window.navigator.geolocation.getCurrentPosition(
        successfulLookup,
        console.log
      );
    }
  };

  // TODO: ADD PAGINAGION LATER
  return (
    <div style={{ minHeight: "661px", background: Colors.background }}>
      <Row className={classes.wrapper}>
        <Col xs={9}>
          <form onSubmit={(e) => onSearch(e)}>
            <Row style={{ justifyContent: "center" }}>
              <Paper
                elevation={3}
                style={{ width: "100%", padding: "20px 20px 20px 20px" }}
              >
                <Row style={{ justifyContent: "center" }}>
                  <Col xs={10}>
                    <Row style={{ justifyContent: "center" }}>
                      <Col xs={8} style={{ alignSelf: "center" }}>
                        <TextFieldInput
                          id="outlined-multiline-flexible"
                          label="Search with playground name and phone..."
                          type="search"
                          fullWidth
                          value={searchText}
                          placeHolder="Searching..."
                          variant="outlined"
                          size="small"
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </Col>
                      <Col xs={4} style={{ alignSelf: "center" }}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={categoryArr || []}
                          size="small"
                          onChange={(event, newValue) => {
                            console.log(newValue);
                            setSelectedCategoryId(newValue?.id || "");
                          }}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select category"
                              variant="outlined"
                            />
                          )}
                        />
                      </Col>
                    </Row>
                    <Row
                      style={{ justifyContent: "center", marginTop: "16px" }}
                    >
                      <Col xs={4}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={regionArr || []}
                          size="small"
                          onChange={(event, newValue) => {
                            onChangeRegion(newValue?.code || "");
                          }}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select city"
                              variant="outlined"
                            />
                          )}
                        />
                      </Col>
                      <Col xs={4}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={getDistricts() || []}
                          size="small"
                          key={!!selectedRegionCode}
                          onChange={(event, newValue) => {
                            onChangeDistrict(newValue?.code || "");
                          }}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              value={selectedDistrictCode}
                              label="Select district"
                              variant="outlined"
                            />
                          )}
                        />
                      </Col>
                      <Col xs={4}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={getWards() || []}
                          size="small"
                          onChange={(event, newValue) => {
                            onChangeWard(newValue?.code || "");
                          }}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select ward"
                              variant="outlined"
                            />
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={2} style={{ alignSelf: "center" }}>
                    <ColorButton
                      type="submit"
                      variant="contained"
                      size="small"
                      style={{ width: "100%", alignSelf: "center" }}
                      color="#4caf50"
                      className={classes.margin}
                      startIcon={<SearchIcon />}
                    >
                      SEARCH
                    </ColorButton>
                  </Col>
                </Row>
              </Paper>
            </Row>
            <Row>
              <Col xs={6}>
                <GreenCheckbox
                  checked={onShowAll}
                  onChange={(e) => onShowAllEmptyField(e.target.checked)}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <span style={{ marginTop: "auto", marginBottom: "auto" }}>
                  Show all locations are available today{" "}
                  <span className="font-weight-bold">
                    ({moment().format("dddd DD-MM-YYYY")})
                  </span>
                </span>
              </Col>
              <Col xs={6}>
                <GreenCheckbox
                  checked={isNearLocation}
                  onChange={(e) => hanleOnCheckNearLocation(e.target.checked)}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <span style={{ marginTop: "auto", marginBottom: "auto" }}>
                  Find playground near your location
                </span>
              </Col>
            </Row>
          </form>
          <hr></hr>
        </Col>
        <Col xs={8}>
          <Row>
            <Col style={{ alignSelf: "flex-end" }} xs={7}>
              <h5>
                {groundArr.length}{" "}
                {groundArr.length > 1 ? "Playgrounds" : "Playground"}{" "}
              </h5>
            </Col>
          </Row>
          <Row>
            <Col xs={12} style={{ alignSelf: "center" }}>
              <div>
                <ColorPagination
                  count={Math.ceil(groundArr.length / DEFAULT_PAGE_SIZE)}
                  onChange={(e, pageNumber) =>
                    onChangePagination(e, pageNumber)
                  }
                  color="primary"
                  size="small"
                  shape="rounded"
                />
              </div>
            </Col>
          </Row>
          <PageLoader loading={loading}>
            <Row className="mb-4">
              {dataSource.map((ground) => (
                <GroundItem key={ground.id} ground={ground} />
              ))}
            </Row>
          </PageLoader>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  grounds: state.ground.grounds,
  categories: state.category.categories,
});
export default connect(mapStateToProps, {
  getBenefits,
  getGrounds,
  getSearchGrounds,
})(SearchGround);
