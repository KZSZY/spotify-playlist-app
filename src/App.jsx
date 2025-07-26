import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginButton from "./components/login_button";
import LogoutButton from "./components/logout_button";
import Callback from "./components/callback";

function App() {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('spotify_access_token');
        if (storedToken) {
            setAccessToken(storedToken);
        }
    }, []);

    const handleTokenReceived = (token) => {
        setAccessToken(token);
        localStorage.setItem('spotify_access_token', token);
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            {accessToken ? <LogoutButton /> : <LoginButton />}
                        </div>
                    }
                />
                <Route 
                    path="/callback"
                    element={
                        <Callback onTokenReceived={(token) => {
                            localStorage.setItem('spotify_access_token', token);
                            window.location.href = '/';
                        }} />} 
                />
            </Routes>
        </Router>
    );
};

export default App;