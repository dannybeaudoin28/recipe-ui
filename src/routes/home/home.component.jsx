import { useState } from "react";

import LoginForm from "../../components/login-form/login-form.component";

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");

    const setIsAuthenticatedFromLogin = (data) => {
        setIsAuthenticated(data);
        localStorage.setItem('isAuthenticated', data);
    };

    return (
        <div>
            {isAuthenticated && (
                <div>
                    <h1>Successfully authenticated</h1>
                </div>
            )}
            {!isAuthenticated && (
                <div>
                    <h1>Please login to continue:</h1>
                    <LoginForm setIsAuthenticatedFromLogin={setIsAuthenticatedFromLogin}/>
                </div>
            )}
        </div>
    );
}
export default Home;