import React from "react";
import { Link } from 'react-router-dom';
import Logo from "../images/Logo.PNG"
import "../css/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-logo">
                    <img src={Logo} alt="Logo de HistoryPin" className="logo-image" />
                </div>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    <li>Lorem</li>
                    <li>Lorem</li>
                    <li>Lorem</li>
                    <li className="navbar-login"><Link to="/Login" >Se connecter</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
