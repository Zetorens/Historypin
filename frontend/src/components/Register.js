import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

// Composant réutilisable pour les champs d'entrée
const InputField = ({ label, type, value, onChange, placeholder }) => (
    <div className="input-group">
        <label>{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required
            placeholder={placeholder}
        />
    </div>
);

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/register`, {
                email,
                password,
            });
            setSuccess('Inscription réussie, vous pouvez vous connecter');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-box">
                    <h2>Bienvenue. Inscrivez-vous pour continuer.</h2>
                    <form onSubmit={handleRegister}>
                        <InputField
                            label="Adresse Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Adresse Email"
                        />
                        <InputField
                            label="Mot de passe"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mot de passe"
                        />
                        <InputField
                            label="Confirmer le mot de passe"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmer le mot de passe"
                        />
                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? "Chargement..." : "S'inscrire"}
                        </button>
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                    </form>
                    <p>Déjà un compte ? <Link to="/login" className="register-link">Se connecter</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
