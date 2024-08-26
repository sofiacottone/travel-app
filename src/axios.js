import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api', // backend url
    headers: {
        'Content-Type': 'application/json', // Imposta l'intestazione globale Content-Type
    },
});

// add the JWT token in the Authorization header
// if present in localStorage
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default instance;
