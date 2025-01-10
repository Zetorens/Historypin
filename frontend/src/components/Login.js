import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Tous les champs sont requis");
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            navigate('/home');
        } catch (err) {
            if (!err.response) {
                setError('Problème réseau. Veuillez réessayer plus tard.');
            } else if (err.response.status === 401) {
                setError('Identifiants incorrects.');
            } else {
                setError('Erreur lors de la connexion');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-box">
                    <h2>Bienvenue. Connectez-vous pour continuer.</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Adresse Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Adresse Email"
                            />
                        </div>
                        <div className="input-group">
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Mot de passe"
                            />
                        </div>
                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? "Chargement..." : "Se connecter"}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </form>
                    <Link to="/forgot-password" className="forgot-password">Mot de passe oublié</Link>
                    <p>Pas de compte ? <Link to="/register" className="register-link">S'inscrire</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
