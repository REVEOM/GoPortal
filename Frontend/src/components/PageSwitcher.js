import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./PageSwitcher.css"; // Animasyon için

function PageSwitcher({ activeTab }) {
    // Her tab'a özel içeriklerinizi burada tanımlayın
    const pages = {
        GO: <div className="text-light fs-4">GO Page İçeriği</div>,
        PLAY: <div className="text-light fs-4">PLAY Page İçeriği</div>,
        "PLAY BOTS": <div className="text-light fs-4">PLAY BOTS İçeriği</div>,
        PUZZLES: <div className="text-light fs-4">PUZZLES İçeriği</div>
    };
    return (
        <div className="position-relative my-4" style={{minHeight: 160}}>
            <SwitchTransition>
                <CSSTransition
                    key={activeTab}
                    timeout={300}
                    classNames="fade"
                >
                    <div>{pages[activeTab]}</div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}
export default PageSwitcher;