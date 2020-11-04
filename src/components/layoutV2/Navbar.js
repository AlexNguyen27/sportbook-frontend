import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/auth";
// import logo from '../../images/logo.svg';

import Landing from "./Landing";
import Swal from "sweetalert2";

const Navbar = ({ logoutUser }) => {
  const history = useHistory();
  const isAuthenticated = true;
  const [activeClass, setActiveClass] = useState('');

  const isHomePage = window.location.pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      console.log(window.location);
      window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
          setActiveClass('top-nav-collapse mb-16');
        } else {
          setActiveClass('');
        }
      })
    } else {
      setActiveClass('top-nav-collapse');
    }
  }, [isHomePage]);
  // const logoutButton = (
  //   <ul className="navbar-nav">
  //     <li className="nav-item">
  //       <Link
  //         className="nav-link"
  //         to=""
  //         onClick={() => {
  //           logoutUser();
  //         }}
  //       >
  //         Log out
  //       </Link>
  //     </li>
  //   </ul>
  // );

  // const loginButton = (
  //   <ul className="navbar-nav">
  //     <li className="nav-item">
  //       <Link className="nav-link" to="/staffLogin">
  //         Login
  //       </Link>
  //     </li>
  //   </ul>
  // );

  // const signUpButton = (
  //   <ul className="navbar-nav">
  //     <li className="nav-item">
  //       <Link className="nav-link" to="/signup">
  //         Sign up
  //       </Link>
  //     </li>
  //   </ul>
  // );

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
        history.push("/login");
      }
    });
  };

  
  const loginNavLink = () => {
    const isLogin = window.location.pathname.includes('login');
    return  <>
      {
        !isAuthenticated ? <>
        <li className="nav-item">
         <NavLink className="nav-link page-scroll" activeClassName="activeLink" to="/owner">
           Create a business
       </NavLink>
       </li>
         <li className="nav-item">
           <NavLink className="nav-link page-scroll" activeClassName="activeLink" to={isLogin ? "/signup": "/login" }>
             { isLogin ? 'Signup' : 'Login'}
       </NavLink>
         </li>
          </> : <>
         <li className="nav-item">
         <NavLink className="nav-link page-scroll" activeClassName="activeLink" to="/owner">
           Create a business
       </NavLink>
       </li>
         <li className="nav-item">
           <NavLink className="nav-link page-scroll" activeClassName="activeLink" onClick={() => logout()} to="">
             Logout
       </NavLink>
         </li> </>
      }
      </>
  }

  return (
    <>
      <nav className={["navbar navbar-expand-lg navbar-dark navbar-custom fixed-top", activeClass].join(' ')}>
        {/* <Link className="navbar-brand logo-image" to="#">
          Love Sport
        </Link> */}
        <a className="navbar-brand logo-image" href="#header">
          <NavLink className="navbar-brand logo-image front-size-16" style={{ color: 'black', textDecoration: 'none' }} activeClassName="activeLink" to="/">
            <span className="turquoise">Love</span> <span>Sport</span>
          </NavLink>
        </a>

        {/* <!-- Mobile Menu Toggle Button --> */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-awesome fas fa-bars"></span>
          <span className="navbar-toggler-awesome fas fa-times"></span>
        </button>
        {/* <!-- end of mobile menu toggle button --> */}

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav ml-auto">
            {
              !isHomePage ? loginNavLink() : <>
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#header">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#services">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#pricing">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#request">Request</a>
                </li>

                {/* <!-- Dropdown Menu -->           */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle page-scroll" href="#about" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">About</a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="terms-conditions.html"><span className="item-text">Terms Conditions</span></a>
                    <div className="dropdown-items-divide-hr"></div>
                    <a className="dropdown-item" href="privacy-policy.html"><span className="item-text">Privacy Policy</span></a>
                  </div>
                </li>
                {/* <!-- end of dropdown menu --> */}

                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#contact">Contact</a>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link page-scroll" activeClassName="activeLink" to="/owner">
                    Create a business
              </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link page-scroll" activeClassName="activeLink" to="/login">
                    Login
              </NavLink>
                </li>
              </>
            }

          </ul>
          {/* <span className="nav-item social-icons">
            <span className="fa-stack">
              <a href="#your-link">
                <i className="fas fa-circle fa-stack-2x facebook"></i>
                <i className="fab fa-facebook-f fa-stack-1x"></i>
              </a>
            </span>
            <span className="fa-stack">
              <a href="#your-link">
                <i className="fas fa-circle fa-stack-2x twitter"></i>
                <i className="fab fa-twitter fa-stack-1x"></i>
              </a>
            </span>
          </span> */}
        </div>
      </nav>
      {!isAuthenticated && <Landing />}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
