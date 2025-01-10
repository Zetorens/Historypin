import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Map from './components/Map';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Redirection par défaut vers /login si aucune autre route n'est correspondante */}
                <Route path="*" element={<Login />} />

                {/* Route publique */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/map" element={<Map />} />

                {/* Route protégée */}
                
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
