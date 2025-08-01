import React from "react";

function Contact() {
    return (
        <div className="container py-5 text-light">
            <h2 className="mb-4">Contact Us</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" placeholder="Your Name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" placeholder="your@email.com" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Message:</label>
                    <textarea className="form-control" rows="4" placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>
    );
}

export default Contact;