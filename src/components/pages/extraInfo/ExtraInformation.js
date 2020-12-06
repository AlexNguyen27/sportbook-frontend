import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import { GET_ERRORS, CLEAR_ERRORS } from "../../../store/actions/types";
import PageLoader from "../../custom/PageLoader";
import {
  editUserInfo,
  getUserInfo,
  editExtraInfo,
} from "../../../store/actions/user";
import { FAVORITE_FOOT } from "../../../utils/common";
import ExtraInfoForm from "./component/ExtraInfoForm";
import SocialNetworkForm from "./component/SocialNetworkForm";

const useStyles = makeStyles((theme) => ({}));

const UserInfoForm = ({
  user,
  errors,
  getUserInfo,
  editExtraInfo,
  loading,
  setLoading,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(true);

  // const favoriteFootArr = Object.keys(FAVORITE_FOOT).map((key) => ({
  //   key: key,
  //   value: FAVORITE_FOOT[key],
  // }));

  // const [selectedDropdownData, setSelectedDropdownData] = useState({
  //   selectedFavoriteFootKey: "",
  // });

  // const { selectedFavoriteFootKey } = selectedDropdownData;
  const [socialNetworkForm, setSocialNetworkForm] = useState({
    facebook: "",
    zalo: "",
    twitter: "",
  });

  const [extraInfoForm, setExtraInfoForm] = useState({
    favoriteFoot: "",
    playRole: "",
    shirtNumber: "",
    favoritePlayTime: "",
    teamName: "",
  });

  const onChangeSocialNetworkForm = (e) => {
    setSocialNetworkForm({
      ...socialNetworkForm,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeExtraInfoForm = (e) => {
    setExtraInfoForm({
      ...extraInfoForm,
      [e.target.name]: e.target.value,
    });
  };
  const setInit = () => {
    if (user.socialNetwork) {
      setSocialNetworkForm({
        ...socialNetworkForm,
        ...JSON.parse(user.socialNetwork),
      });
    }
    if (user.extraInfo) {
      setExtraInfoForm({
        ...extraInfoForm,
        ...JSON.parse(user.extraInfo),
      });
    }
  };

  useEffect(() => {
    console.log("erer---------------------");
    // getUserInfo(user.id, setLoading);
    setInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    // const formatData = trimObjProperties(formData);

    // let error = {};
    // Object.keys(formatData).map((key) => {
    //   if (formatData[key].trim() === "") {
    //     error[key] = "This field is required";
    //   }
    // });

    // dispatch({
    //   type: GET_ERRORS,
    //   errors: error,
    // });
    editExtraInfo(setLoading, socialNetworkForm, extraInfoForm);
    // if (JSON.stringify(error) === "{}") {
    //   setLoading(true);
    //   editUserInfo(setLoading, formatData, user.id);
    // }
  };

  const onCancel = () => {
    setInit();
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  // const onChangeFavoriteFoot = (code) => {
  //   setSelectedDropdownData({
  //     ...selectedDropdownData,
  //     selectedFavoriteFootKey: code,
  //   });
  // };

  return (
    <PageLoader loading={loading}>
      <Row style={{ justifyContent: "center" }}>
        <Col xs="9">
          <form onSubmit={(e) => onSubmit(e)}>
            <ExtraInfoForm
              formData={extraInfoForm}
              onChange={onChangeExtraInfoForm}
            />
            <SocialNetworkForm
              formData={socialNetworkForm}
              onChange={onChangeSocialNetworkForm}
            />
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
  getUserInfo,
  editExtraInfo
})(UserInfoForm);
