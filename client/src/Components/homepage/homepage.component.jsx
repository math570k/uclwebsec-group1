import React from 'react'
import { Redirect } from 'react-router-dom';
import auth from '../../auth';
import './homepage.styles.css';

const HomePage = () => {
    return (
        auth.isAuthenticated() ? (
            <div>
                <h1>Home Page</h1>
            </div>)
            : (
            <Redirect to={{ pathname: "/login", }} />
            )
    );
}

export default HomePage;