import React, { useEffect, useState } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import GroundItem from "./component/GroundItem";
// import FilterListIcon from "@material-ui/icons/FilterList";
// import DropdownV2 from "../../custom/DropdownV2";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { getBenefits } from "../../../store/actions/benefit";
import { getGrounds } from "../../../store/actions/ground";
import PageLoader from "../../custom/PageLoader";
import Pagination from "@material-ui/lab/Pagination";
// import REGIONS from "../../locales/regions.json";
// import DISTRICTS from "../../locales/districts.json";
// import WARDS from "../../locales/wards.json";
import TextFieldInput from "../../custom/TextFieldInputWithheader";
import Checkbox from "@material-ui/core/Checkbox";
import { getAddress } from "../../../utils/commonFunction";
import moment from "moment";

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
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const DEFAULT_PAGE_SIZE = 8;

const SearchGround = ({ getBenefits, getGrounds, grounds }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [onShowAll, setOnShowAll] = useState(false);

  useEffect(() => {
    setLoading(true);
    getGrounds(setLoading).then(() => {
      setLoading(true);
      getBenefits(setLoading);
    });
  }, []);

  const groundArr = Object.keys(grounds).map((groundId) => grounds[groundId]);

  const [dataSource, setDataSource] = useState(groundArr);
  const [searchText, setSearchText] = useState("");

  const onChangePagination = (e, pageNumber) => {
    console.log("page", pageNumber, e);
    const getPageData = groundArr.slice(
      DEFAULT_PAGE_SIZE * (pageNumber - 1),
      DEFAULT_PAGE_SIZE * pageNumber
    );

    setDataSource([...getPageData]);
    // fitler with offset là
  };

  const onSearch = (search) => {
    setSearchText(search);
    const dataArr = onShowAll
      ? groundArr.filter((ground) => ground.isAvailable)
      : groundArr;
    // if check and serach is empty => 4
    // if not check and serach => search on 11
    // if check and sreach then search on 4
    const newDataSource = dataArr.filter((ground) => {
      const { title, phone } = ground;
      const address = getAddress(ground.address);
      return (
        (title || "").toLowerCase().match(search.trim().toLowerCase()) ||
        (phone || "").toLowerCase().match(search.trim().toLowerCase()) ||
        (address || "").toLowerCase().match(search.trim().toLowerCase())
      );
    });

    console.log(newDataSource, "newdata source");
    setDataSource([...newDataSource]);
  };

  const onShowAllEmptyField = (checked) => {
    setOnShowAll(checked);
    if (checked) {
      const newDataSource = dataSource.filter((ground) => ground.isAvailable);
      setDataSource([...newDataSource]);
    } else {
      setDataSource(groundArr);
    }
  };

  // TODO: ADD PAGINAGION LATER
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
                    <Col xs={12} style={{ alignSelf: "center" }}>
                      {/* <Autocomplete
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
                      /> */}

                      <TextFieldInput
                        id="outlined-multiline-flexible"
                        label="Search with playground name, phone, address..."
                        type="search"
                        fullWidth
                        value={searchText}
                        placeHolder="Searching..."
                        variant="outlined"
                        size="small"
                        onChange={(e) => onSearch(e.target.value)}
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
                    onClick={() => onSearch(searchText)}
                  >
                    search
                  </Button>
                </Col>
              </Row>
            </Paper>
          </Row>
          <Row>
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
          </Row>
          <hr></hr>
        </Col>
        <Col xs={8}>
          <Row>
            <Col style={{ alignSelf: "flex-end" }} xs={7}>
              <h5>
                {groundArr.length} {groundArr.length > 1 ? "results" : "result"}{" "}
                found in Ho Chi Minh city
              </h5>
            </Col>
          </Row>
          <Row>
            <Col xs={12} style={{ alignSelf: "center" }}>
              <div>
                <Pagination
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
              {dataSource.map((item) => (
                <GroundItem key={item.id} ground={item} />
              ))}
            </Row>
          </PageLoader>
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
