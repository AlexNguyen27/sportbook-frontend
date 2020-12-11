import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, IconButton, Tooltip } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  BASE_IMAGE_URL,
} from "../../../../store/actions/types";
import { trimObjProperties } from "../../../../utils/formatString";
import PageLoader from "../../../custom/PageLoader";
import TextFieldInputWithHeader from "../../../custom/TextFieldInputWithheader";
import {
  editUserInfo,
  getUserInfo,
  uploadAvatar,
} from "../../../../store/actions/user";
import DropdownV2 from "../../../custom/DropdownV2";
import { GENDER } from "../../../../utils/common";
import REGIONS from "../../../locales/regions.json";
import DISTRICTS from "../../../locales/districts.json";
import WARDS from "../../../locales/wards.json";

import { validateEmail } from "../../../../utils/commonFunction";
import { storage } from "../../../../constants/firebase";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  info: {
    padding: theme.spacing(2),
    fontSize: "16px",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  image: {
    position: "relative",
  },
  btnUpload: {
    position: "absolute",
    right: "116px",
    top: "155px",
  },
  inputFile: {
    // display: "none",
    marginTop: "5px",
    width: '-webkit-fill-available'
  },
}));

const UserInfoForm = ({
  user,
  errors,
  editUserInfo,
  getUserInfo,
  viewType,
  uploadAvatar,
  loading,
  setLoading,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const imageUrl = BASE_IMAGE_URL;
  const [avatar, setAvatar] = useState("");
  // const [loading, setLoading] = useState(true);

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    // playRole: "",
    createdAt: "",
    updatedAt: "",
  });

  const genderArr = Object.keys(GENDER).map((key) => ({
    key: key,
    value: GENDER[key],
  }));

  // const favoriteFootArr = Object.keys(FAVORITE_FOOT).map((key) => ({
  //   key: key,
  //   value: FAVORITE_FOOT[key],
  // }));

  const [selectedDropdownData, setSelectedDropdownData] = useState({
    selectedGenderKey: "",
    // selectedFavoriteFootKey: "",
    selectedRegionCode: "",
    selectedDistrictCode: "",
    selectedWardCode: "",
  });

  const {
    selectedGenderKey,
    selectedRegionCode,
    selectedDistrictCode,
    selectedWardCode,
    // selectedFavoriteFootKey,
  } = selectedDropdownData;

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

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    // playRole,
    createdAt,
    updatedAt,
  } = formData;
  // Save on change input value
  const onChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectGender = (genderKey) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedGenderKey: genderKey,
    });
  };

  const setInit = () => {
    if (viewType === "user") {
      const address = JSON.parse(user.address) || {};

      setformData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address ? address.address : "",
        // playRole: user.playRole || "",
        createdAt: moment(user.createdAt).format("DD/MM/YYYY HH:mm A") || "",
        updatedAt: moment(user.updatedAt).format("DD/MM/YYYY HH:mm A") || "",
      });
      setSelectedDropdownData({
        selectedRegionCode: _.get(address, "regionCode") || "",
        selectedDistrictCode: _.get(address, "districtCode") || "",
        selectedWardCode: _.get(address, "wardCode") || "",
        // selectedFavoriteFootKey: _.get(user, "favoriteFoot") || "",
        selectedGenderKey: _.get(user, "gender", "") || "",
      });
      setAvatar(user.avatar || imageUrl);
    }
  };

  useEffect(() => {
    // getUserInfo(setLoading);
    setInit();
  }, []);

  const onSubmit = (e) => {
    const formatData = trimObjProperties(formData);
    let dob = moment(selectedDate || "").format("DD/MM/YYYY");
    let error = {};
    Object.keys(formatData).map((key) => {
      if (formatData[key].trim() === "") {
        error[key] = "This field is required";
      }
    });

    if (JSON.stringify(error) === "{}" && !validateEmail(email)) {
      error.email = "Email is invalid!";
    }
    // if (!selectedFavoriteFootKey.trim()) {
    //   error.favoriteFoot = "This field is required";
    // }
    if (!selectedGenderKey.trim()) {
      error.gender = "This field is required";
    }
    if (!dob.trim() || !selectedDate) {
      error.dob = "This field is required";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (GENDER[selectedGenderKey]) {
      formatData.gender = selectedGenderKey;
    }

    formatData.dob = dob;
    formatData.regionCode = selectedRegionCode;
    formatData.districtCode = selectedDistrictCode;
    formatData.wardCode = selectedWardCode;
    // formatData.favoriteFoot = selectedFavoriteFootKey;

    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      editUserInfo(setLoading, formatData, user.id);
    }
  };

  const onCancel = () => {
    setInit();
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  const [selectedDate, setSelectedDate] = useState(
    user.dob ? new Date(user.dob) : null
  );

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

  // const onChangeFavoriteFoot = (code) => {
  //   setSelectedDropdownData({
  //     ...selectedDropdownData,
  //     selectedFavoriteFootKey: code,
  //   });
  // };

  const [loadingUpload, setLoadingUpload] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      try {
        setLoadingUpload(true);
        const uploadTask = storage.ref(`/user/avatars/${file.name}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("/user/avatars")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              setAvatar(url);
              uploadAvatar(setLoadingUpload, url, user.id);
            });
        });
      } catch (error) {
        console.log(error, "upload error------------------");
      }
    }
  };

  return (
    <PageLoader loading={loading}>
      <Row className="justify-content-center">
        <Col xs="3">
          <Paper className={classes.paper}>
            <PageLoader loading={loadingUpload}>
              <img
                src={avatar || imageUrl}
                alt="Girl in a jacket"
                width="100%"
                height={200}
                className={classes.iamge}
              />
              {/* <Tooltip title="Upload new avatar" aria-label="image"> */}
              {/* <div> */}
              <input
                accept="image/*"
                className={classes.inputFile}
                id="icon-button-file"
                multiple
                type="file"
                onChange={handleUpload}
              />
              {/* <label htmlFor="icon-button-file">
                    <IconButton
                      aria-label="upload"
                      className={classes.btnUpload}
                      component="span"
                    >
                      <CloudUploadIcon fontSize="large" />
                    </IconButton>
                  </label> */}
              {/* </div> */}
              {/* </Tooltip> */}
              <h6 className="mb-0 font-weight-bold">
                {firstName} {lastName}
              </h6>
            </PageLoader>
          </Paper>
        </Col>
        <Col xs="9">
          <h4 className="text-center mb-4">User Information</h4>
          <form onSubmit={(e) => onSubmit(e)}>
            <Row>
              <Col xs={6}>
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="firstName"
                  label="First name"
                  fullWidth
                  value={firstName}
                  onChange={onChange}
                  placeHolder="Enter first name"
                  error={errors.firstName}
                  variant="outlined"
                  size="small"
                />
              </Col>
              <Col xs={6}>
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  value={lastName}
                  onChange={onChange}
                  placeHolder="Enter last name"
                  error={errors.lastName}
                  size="small"
                  variant="outlined"
                />
              </Col>
              <Col>
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="email"
                  label="Email"
                  fullWidth
                  size="small"
                  value={email}
                  onChange={onChange}
                  className="mt-4"
                  placeHolder="Enter first name"
                  error={errors.email}
                  variant="outlined"
                />
              </Col>
              <Col className="mt-4">
                <DropdownV2
                  fullWidth
                  label="Gender"
                  value={selectedGenderKey.toString()}
                  options={genderArr || []}
                  valueBasedOnProperty="key"
                  size="small"
                  displayProperty="value"
                  onChange={(genderKey) => onSelectGender(genderKey)}
                  error={errors.gender || ""}
                  variant="outlined"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col xs={6}>
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="phone"
                  label="Phone"
                  fullWidth
                  size="small"
                  value={phone}
                  onChange={onChange}
                  placeHolder="Enter Phone"
                  error={errors.phone}
                  variant="outlined"
                />
              </Col>
              <Col xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    variant="inline"
                    style={{ width: "100%", margin: 0 }}
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    size="small"
                    label="Date of birth"
                    disableFuture={true}
                    error={errors.dob}
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Col>
            </Row>
            {/* ADDRESS */}
            <Row className="mt-4">
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
                />
              </Col>
              <Col xs={4}>
                <DropdownV2
                  fullWidth
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
                  value={selectedWardCode.toString()}
                  options={getWards() || []}
                  valueBasedOnProperty="code"
                  size="small"
                  displayProperty="name"
                  onChange={(code) => onChangeWard(code)}
                />
              </Col>
              <Col className="mt-4">
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="address"
                  label="Address"
                  fullWidth
                  size="small"
                  value={address}
                  onChange={onChange}
                  error={errors.address}
                  variant="outlined"
                />
              </Col>
            </Row>
            {/* Extra information */}
            {/* <Row className="mt-2"> */}
            {/* <Col xs={6}>
                      <DropdownV2
                        fullWidth
                        label="Farovite Foot"
                        variant="outlined"
                        size="small"
                        disabledPlaceholder="None"
                        value={selectedFavoriteFootKey.toString()}
                        options={favoriteFootArr || []}
                        valueBasedOnProperty="key"
                        displayProperty="value"
                        onChange={(code) => onChangeFavoriteFoot(code)}
                        error={errors.favoriteFoot || ""}
                      />
                    </Col>
                    <Col xs={6}>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name="playRole"
                        label="Play role"
                        fullWidth
                        value={playRole}
                        size="small"
                        onChange={onChange}
                        placeHolder="Enter play role"
                        error={errors.playRole}
                        variant="outlined"
                      />
                    </Col> */}
            {/* </Row> */}
            <Row className="mt-4">
              <Col xs={6}>
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="createdAt"
                  label="Created Date"
                  fullWidth
                  value={createdAt}
                  size="small"
                  placeHolder="Enter created at"
                  error={errors.createdAt}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled
                  variant="outlined"
                />
              </Col>
              <Col xs={6}>
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="updatedAt"
                  label="Latest update At"
                  fullWidth
                  size="small"
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                  value={updatedAt}
                  placeHolder="Enter created at"
                  variant="outlined"
                />
              </Col>
            </Row>
          </form>
          <Grid item xs={12} className="text-center mt-4">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => onSubmit(e)}
            >
              <SaveIcon className="mr-2" /> Save
            </Button>
            <Button
              variant="contained"
              className="ml-4"
              size="small"
              onClick={() => onCancel()}
            >
              <RotateLeftIcon className="mr-2" /> Cancel
            </Button>
          </Grid>
        </Col>
      </Row>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  editUserInfo,
  getUserInfo,
  uploadAvatar,
})(UserInfoForm);
