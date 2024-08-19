import { useState } from 'react';
import './login-form.styles.scss';

import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

import Cookies from 'js-cookie';


const LoginForm = ({ setIsAuthenticatedFromLogin }) => {
    const baseUrl = 'recipe-container:8000/';

    const [loginInputs, setLoginInputs] = useState({
        email: '',
        password: '',
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        const { email, password } = loginInputs;

        event.preventDefault();

        if (email.length > 0 && password.length > 0) {
            axios.post(baseUrl + 'api/user/token/', loginInputs)
                .then(response => {
                    // Extract the JWT from the response
                    const token = response.data.token
                    console.log(token)

                    if (token !== undefined) {
                        Cookies.set('token', token)
                        setLoginInputs({
                            email: '',
                            password: '',
                        });
                        setIsAuthenticatedFromLogin(true);
                    } else {
                        setLoginInputs({
                            email: '',
                            password: '',
                        });
                    }
                })
                .catch(error => {
                    console.error('Login error:', error);
                });
        };
    }

    return (
        <div className='form-box'>
            <form onSubmit={handleSubmit}>
                <label>Email
                    <input
                        type="email"
                        name="email"
                        value={loginInputs.email}
                        onChange={handleChange}
                        placeholder='User Email'
                    />
                </label>
                <label>Password
                    <input
                        type="password"
                        name="password"
                        value={loginInputs.password}
                        onChange={handleChange}
                        placeholder='**********'
                    />
                </label>
                <input className='submitButton' type='submit' value='Login' />
            </form>
        </div>
    );
};
export default LoginForm;