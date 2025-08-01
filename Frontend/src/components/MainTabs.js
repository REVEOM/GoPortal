import React from "react";

function MainTabs({ activeTab, setActiveTab }) {
    const tabs = ["GO", "PLAY", "PLAY BOTS", "PUZZLES"];
    return (
        <div className="d-flex justify-content-center gap-2 my-3">
            {tabs.map(tab => (
                <button
                    key={tab}
                    className={`btn ${activeTab === tab ? "btn-primary" : "btn-outline-light"} rounded-pill px-4 fw-bold`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
export default MainTabs;