import React from 'react';
import { loginUrl } from './authService';

function Login() { // Login component to handle user authentication
    return (
        <div className="login">
            <h1>Spotify Analytics</h1>
            <a className="btn" href={loginUrl}>Login with Spotify</a>
        </div>
    );
}

export default Login;