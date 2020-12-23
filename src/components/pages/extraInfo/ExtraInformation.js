import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import { CLEAR_ERRORS } from "../../../store/actions/types";
import PageLoader from "../../custom/PageLoader";
import { editExtraInfo } from "../../../store/actions/user";
import ExtraInfoForm from "./component/ExtraInfoForm";
import SocialNetworkForm from "./component/SocialNetworkForm";

const UserInfoForm = ({ user, editExtraInfo, loading, setLoading }) => {
  const dispatch = useDispatch();

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
    setInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    editExtraInfo(setLoading, socialNetworkForm, extraInfoForm);
  };

  const onCancel = () => {
    setInit();
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <PageLoader loading={loading}>
      <Row style={{ justifyContent: "center" }}>
        <Col xs="12">
          <form onSubmit={(e) => onSubmit(e)}>
            <ExtraInfoForm
              formData={extraInfoForm}
              onChange={onChangeExtraInfoForm}
              setExtraInfoForm={setExtraInfoForm}
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
  editExtraInfo,
})(UserInfoForm);
