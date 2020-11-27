import React from "react";
import { connect } from "react-redux";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const Main = ({ children, isHome, auth }) => {
  const navLinksAuth = [
    {
      name: "Home",
      to: "/",
      onClick: () => {},
    },
    {
      name: "Order History",
      to: "/",
      onClick: () => window.open("http://localhost:3001/signup"),
    },
    {
      name: "Your Account",
      to: "/login",
      children: [
        {
          name: "Your account",
          to: "/your-account",
          onClick: () => {},
        },
        {
          name: "Order management",
          to: "/your-account",
          onClick: () => {},
        },
      ],
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
      onClick: () => window.open("http://localhost:3001/signup"),
    },
    {
      name: "Login",
      to: "/login",
      onClick: () => {},
    },
    {
      name: "Sign up",
      onClick: () => {},

      to: "/signup",
    },
  ];

  const { isAuthenticated } = auth;
  return (
    <div>
      <Navbar
        navLinks={isAuthenticated ? navLinksAuth : navLinks}
        isHome={isHome}
      />s
      {children}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Main);
