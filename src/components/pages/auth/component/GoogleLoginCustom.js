import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import Swal from "sweetalert2";
import { Button } from "@material-ui/core";
import LoginModal from "./LoginModal";
import { checkExitsEmail } from "../../../../store/actions/user";
import { connect } from "react-redux";
import { loginUser } from "../../../../store/actions/auth";

// TODO ADD ENVIRONMENT KEY
const GoogleLoginCustom = ({
  checkExitsEmail,
  loginUser,
  title = "Login with Google",
}) => {
  const [googleData, setGoogleData] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [exitEmail, setIsExitEmail] = useState({});

  const onFailure = (response) => {
    console.log('error------------------', response)
    if (response?.error !== "popup_closed_by_user") {
      // Swal.fire({
      //   position: "center",
      //   type: "Warning",
      //   title: "An error occurred!\n Please try again!",
      //   showConfirmButton: true,
      // });
    }
  };

  const [loading, setLoading] = useState(false);
  const ohSuccess = (response) => {
    const { email } = response?.profileObj;
    setLoading(true);
    checkExitsEmail(setLoading, email, setIsExitEmail).then(() => {
      setGoogleData(response?.profileObj);
    });
  };

  useEffect(() => {
    if (exitEmail?.status) {
      loginUser({
        email: googleData?.email,
        hashPassword: exitEmail.hashPassword,
      });
    } else if (googleData?.email) {
      setLoginModal(true);
    }
  }, [setIsExitEmail, exitEmail, setGoogleData, googleData]);

  return (
    <>
      <GoogleLogin
        clientId="763384219926-86bkbi1pht54l1bl321epthe7n63b0ra.apps.googleusercontent.com"
        buttonText="Login with google"
        render={(renderProps) => (
          <Button
            className="w-100"
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#ec524b", color: "white" }}
            size="small"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<i className="fab fa-google-plus-g" />}
          >
            {title}
          </Button>
        )}
        onSuccess={ohSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
      <LoginModal
        modal={loginModal}
        setModal={setLoginModal}
        userData={googleData}
      />
    </>
  );
};

export default connect(null, { checkExitsEmail, loginUser })(GoogleLoginCustom);
