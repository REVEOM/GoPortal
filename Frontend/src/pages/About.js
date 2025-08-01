
import React from "react";

function About() {
    return (
        <div className="container py-5 text-light">
            <h2 className="mb-4">How to Play Go?</h2>
            <ol className="list-group list-group-numbered mb-4">
                <li className="list-group-item bg-dark text-light border-secondary">
                    <strong>1. Board Setup:</strong> Go is played on a 19x19 grid, but beginners can start with 9x9 or 13x13.
                </li>
                <li className="list-group-item bg-dark text-light border-secondary">
                    <strong>2. Placing Stones:</strong> Two players take turns placing black and white stones on the board intersections.
                </li>
                <li className="list-group-item bg-dark text-light border-secondary">
                    <strong>3. Capturing Stones:</strong> Surround your opponent's stones to capture them.
                </li>
                <li className="list-group-item bg-dark text-light border-secondary">
                    <strong>4. Ending the Game:</strong> The game ends when both players pass. The winner is the one with more territory.
                </li>
            </ol>
            <p className="fw-light">
                For more details and strategies, check out online Go tutorials or join our community!
            </p>
        </div>
    );
}

export default About;