import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';

// <React.StrictMode> is a wrapper that helps with identifying potential problems in an application
ReactDOM.render( 
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);