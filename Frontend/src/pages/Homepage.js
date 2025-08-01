import React, { useState } from "react";
import MainTabs from "../components/MainTabs";
import PageSwitcher from "../components/PageSwitcher";
import LoginPanel from "../components/LoginPanel";
import LiveReports from "../components/LiveReports";

function Homepage() {
    // Ana sekme için state
    const [activeTab, setActiveTab] = useState("GO");

    return (
        <div className="homepage-bg min-vh-100 d-flex flex-column">
            {/* Üst Navbar */}
            <nav className="navbar navbar-dark bg-transparent px-3 d-flex justify-content-end" style={{height: "48px"}}>
                <div className="d-flex align-items-center gap-3 ms-auto">
                    <a className="nav-link text-light" href="#">ABOUT</a>
                    <a className="nav-link text-light" href="#">HOW TO PLAY</a>
                    <a className="nav-link text-light" href="#">CONTACT</a>
                    <img src="/img/flag-en.png" alt="EN" style={{width: 24, marginLeft: 8}} />
                </div>
            </nav>
            {/* Logo Ortada */}
            <div className="text-center my-2">
                <img src="/logo192.png" alt="GO Portal Logo" style={{height: 60}} />
                <span className="ms-2 fw-bold fs-3 text-light align-middle">Portal.com</span>
            </div>
            {/* Ana Tablar ve İçerik */}
            <MainTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center position-relative">
                <PageSwitcher activeTab={activeTab} />
                {/* Sol altta login ve raporlar */}
                <div className="position-absolute bottom-0 start-0 mb-4 ms-4 d-flex flex-row">
                    <LoginPanel />
                    <LiveReports />
                </div>
            </div>
        </div>
    );
}
export default Homepage;