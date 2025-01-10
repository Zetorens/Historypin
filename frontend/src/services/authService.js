import axios from 'axios';

// URL du backend
const API_URL = process.env.REACT_APP_API_URL;

// Fonction pour se connecter et récupérer le token JWT
export const login = async (email, password) => {
    try {
        // Envoie une requête POST pour l'authentification
        const response = await axios.post(`${API_URL}/login`, { email, password });

        // Récupère le JWT depuis la réponse
        const { token } = response.data;

        // Stocke le token JWT dans le localStorage
        localStorage.setItem('jwtToken', token);

        return response.data; // Renvoie les données si nécessaire
    } catch (error) {
        console.error("Erreur lors de la connexion", error);
        throw new Error("Échec de la connexion");
    }
};

// Fonction pour se déconnecter
export const logout = () => {
    // Supprime le JWT de localStorage
    localStorage.removeItem('jwtToken');
};

// Fonction pour récupérer le token
export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
    const token = getToken();
    return !!token; // Retourne true si le token existe
};
