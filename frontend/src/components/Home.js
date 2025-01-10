import React from "react";
import "../css/Home.css";

const Home = () => {
    return (
        <div className="home">
            {/* Section header */}
            <header className="header">
                <div className="header-content">
                    <h1>Explorez l'histoire autrement</h1>
                    <div className="search-bar">
                        <input type="text" placeholder="Lieu ou monument" />
                        <button>🔍</button>
                    </div>
                    <p>Découvrez les trésors historiques autour de vous</p>
                </div>
            </header>

            {/* Section des monuments près de Paris */}
            <section className="section">
                <h2>Les plus beaux monuments près de Paris</h2>
                <div className="monuments-grid">
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <div className="monument-card" key={index}>
                                <div className="image-placeholder"></div>
                                <h3>Musée du Louvre</h3>
                                <p>Paris - 1er Arrondissement</p>
                            </div>
                        ))}
                </div>
            </section>

            {/* Section des monuments les plus visités */}
            <section className="section">
                <h2>Les monuments les plus visités actuellement</h2>
                <div className="monuments-grid">
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <div className="monument-card" key={index}>
                                <div className="image-placeholder"></div>
                                <h3>Musée du Louvre</h3>
                                <p>Paris - 1er Arrondissement</p>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
