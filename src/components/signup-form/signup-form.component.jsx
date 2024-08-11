import './signup-form.styles.scss'

import { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

const SignupForm = ({ userData }) => {
    const baseUrl = 'http://www.dannybeaudoin613.com/api';
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        const { name, email, password, confirmPassword } = inputs;

        event.preventDefault();

        if (name && email && password && password === confirmPassword) {
            axios.post(baseUrl + '/user/create', inputs)
                .then(response => {
                    console.log(`Added user to records`);
                    setInputs({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                    navigate('/home');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            alert("Please double check you aren't missing any of the required fields or passwords do not match.");
        }
    }

    return (
        <div className='form-box'>
            <form onSubmit={handleSubmit}>
                <label>Name
                    <input
                        type="text"
                        name="name"
                        value={inputs.userName}
                        onChange={handleChange}
                        placeholder={userData?.userName || 'John'}
                    />
                </label>
                <label>Email
                    <input
                        type="email"
                        name="email"
                        value={inputs.userEmail}
                        onChange={handleChange}
                        placeholder={userData?.userEmail || 'test@test.com'}
                    />
                </label>
                <label>Password
                    <input
                        type="password"
                        name="password"
                        value={inputs.userPassword}
                        onChange={handleChange}
                        placeholder={'**********'}
                    />
                </label>
                <label>Confirm Password
                    <input
                        type="password"
                        name="confirmPassword"
                        value={inputs.userConfirmPassword}
                        onChange={handleChange}
                        placeholder={'**********'}
                    />
                </label>
                <input className='submitButton' type='submit' value='Signup' />
            </form>
        </div>
    );
}

export default SignupForm;