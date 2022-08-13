import React from 'react';
import ReactDOM from 'react-dom/client';
//ici on importe le fichier SCSS et c'est tout. Le découpage se fait à l'aide des nom de class plus besoin d'appeler des fichiers CSS sur chaque page
import "./styles/index.scss"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

