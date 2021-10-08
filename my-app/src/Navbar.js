import React, { useState } from "react";
import "./App.css";
import logo from "./git_logo.png";
//import { Navbar } from 'react-bootstrap';

function Navbar() {
  return (
    <nav className="navbar navbar-dark x">
      <a className="anav navbar-brand" href="">
        <img src={logo} style={{ height: "1.2cm" }}></img>&nbsp; FIND JOB
      </a>
    </nav>
  );
}
export default Navbar;
