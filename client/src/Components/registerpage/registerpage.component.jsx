import React from 'react'
import { Link } from 'react-router-dom'
import './registerpage.styles.css'

const RegisterPage = () => {
    return (
        <form className="input_form" action="/register" method="POST">
            <h1>Register</h1>
            <input type="text" id="name" name="name" required placeholder="Name" autoComplete="off" />
            <input type="email" id="email" name="email" required placeholder="Email" autoComplete="off" />
            <input type="password" id="password" name="password" required placeholder="Password" />
            <div>
                <Link to="/login">Return</Link>
                <input type="submit" name="" value="Submit" />
            </div>
        </form>
    );
}

export default RegisterPage;