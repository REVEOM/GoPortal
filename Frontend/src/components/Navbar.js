import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-transparent px-3 d-flex justify-content-end" style={{height: "48px"}}>
            <div className="d-flex align-items-center gap-3 ms-auto">
                <Link className="nav-link text-light" to="/about">ABOUT</Link>
                <Link className="nav-link text-light" to="/howtoplay">HOW TO PLAY</Link>
                <Link className="nav-link text-light" to="/contact">CONTACT</Link>
                <img src="/img/flag-en.png" alt="EN" style={{width: 24, marginLeft: 8}} />
            </div>
        </nav>
    );
}
export default Navbar;