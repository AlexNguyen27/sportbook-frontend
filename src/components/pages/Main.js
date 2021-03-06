import React from "react";
import { connect } from "react-redux";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Swal from "sweetalert2";
import { logoutUser } from "../../store/actions/auth";
import { useHistory } from "react-router-dom";
import { WEB_MANAGER_DOMAIN } from "../../store/actions/types";

const Main = ({ children, isHome, auth, logoutUser }) => {
  const history = useHistory();
  const logout = () => {
    Swal.fire({
      title: `Are you sure to logout?`,
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sure",
    }).then((result) => {
      if (result.value) {
        logoutUser();
        history.push("/");
      }
    });
  };

  const navLinksAuth = [
    {
      name: "Home",
      to: "/",
      onClick: () => {},
    },
    {
      name: "Create a business",
      to: "",
      onClick: () => window.open(WEB_MANAGER_DOMAIN),
    },
    {
      name: "Playground",
      to: "/playground",
    },
    {
      name: "Your Orders",
      to: "/user/info/history",
    },
    {
      name: "Your Account",
      to: "/login",
    },

    {
      name: "Log out",
      to: window.location.pathname,
      onClick: () => {
        logout();
      },
    },
  ];

  const navLinks = [
    {
      name: "Home",
      to: "/",
      onClick: () => {},
    },
    {
      name: "Create a business",
      to: "/",
      onClick: () => window.open(WEB_MANAGER_DOMAIN),
    },
    {
      name: "Playground",
      to: "/playground",
    },
    {
      name: "Login",
      to: "/login",
      onClick: () => history.push("/login"),
    },
    {
      name: "Sign up",
      to: "/signup",
      onClick: () => {},
    },
  ];

  const { isAuthenticated } = auth;
  return (
    <div>
      <Navbar
        navLinks={isAuthenticated ? navLinksAuth : navLinks}
        isHome={isHome}
      />
      {children}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Main);
