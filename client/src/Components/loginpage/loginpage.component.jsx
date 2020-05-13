import React from 'react'
import { Link } from 'react-router-dom'
import './loginpage.styles.css'

const LoginPage = () => {
    return (
        <div className='loginpage'>
            <form className="input_form" action="/login" method="POST">
                <h1>Login</h1>
                <input type="email" id="email" name="email" required placeholder="Email" autoComplete="off" />
                <input type="password" id="password" name="password" required placeholder="Password" />
                <div>
                    <Link to="/register">Register</Link>
                    <input type="submit" name="" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default LoginPage;