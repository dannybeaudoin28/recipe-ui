import { useEffect, useState } from "react";
import axios from 'axios';
import LoginForm from "../../components/login-form/login-form.component";

import Cookies from 'js-cookie';


const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const baseUrl = 'https://89.116.167.78:8000/';

    const setIsAuthenticatedFromLogin = (data) => {
        setIsAuthenticated(data);
        localStorage.setItem('isAuthenticated', data);
    };

    useEffect(() => {
        const fetchData = async () => {

            setIsLoading(true);
            try {
                const response = await axios.get(baseUrl + 'api/user/me/', {
                    headers: {
                        'Authorization': `Token ${Cookies.get('token')}`,
                    }
                });
                setUserData(response.data);
                setError(null);
            } catch (error) {
                setError('Failed to fetch user data.');
                setUserData(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [Cookies.get('token')]);

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h1>Successfully authenticated</h1>
                    {isLoading ? (
                        <p>Loading user data...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div>
                            <p>Name: {userData?.name}</p>
                            <p>Email: {userData?.email}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h1>Please login to continue:</h1>
                    <LoginForm setIsAuthenticatedFromLogin={setIsAuthenticatedFromLogin}/>
                </div>
            )}
        </div>
    );
};

export default Home;
