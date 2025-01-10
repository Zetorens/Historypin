import React from "react";
import "../css/Footer.css"


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h3>HistoryPin</h3>
                    <div className="social-icons">
                    <a href="#"><i className="fa fa-instagram"></i></a>
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-linkedin"></i></a>
                    </div>
                </div>

                <div className="footer-links">
                    <div>
                        <h4>Use cases</h4>
                        <ul>
                            <li>UI design</li>
                            <li>UX design</li>
                            <li>Wireframing</li>
                            <li>Diagramming</li>
                            <li>Brainstorming</li>
                            <li>Team collaboration</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Explore</h4>
                        <ul>
                            <li>Design</li>
                            <li>Prototyping</li>
                            <li>Development features</li>
                            <li>Design systems</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Resources</h4>
                        <ul>
                            <li>Blog</li>
                            <li>Best practices</li>
                            <li>Colors</li>
                            <li>Support</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;