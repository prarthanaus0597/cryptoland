import React from "react";
import logo from "../images/logo/white-logo.svg";
import { NavLink } from "react-router-dom";
import "../css/Header.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
//import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router";

const Header = ({ show }) => {
  const history_home = useHistory();

  const routeChange_home = () => {
    let path = `/`;
    history_home.push(path);
  };

  return (
    <div className="header-button">
      <div className="header">
        <div className="container">
          <br />
          <NavLink className="logo" to="/">
            <img className="img" src={logo} alt="Logo" />
          </NavLink>
        </div>
      </div>

      {show ? (
        <div className="buttons">
          <button className="btn btn-success" onClick={routeChange_home}>
            Back to Home
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
