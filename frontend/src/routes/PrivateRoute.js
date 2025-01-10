import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';  // Vérifie l'authentification

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        isAuthenticated() ? (  // Si authentifié, affiche le composant
            <Component {...rest} />
        ) : (
             <Navigate to="/login" />  // Sinon, redirige vers la page de login
        )
    );
};

export default PrivateRoute;
