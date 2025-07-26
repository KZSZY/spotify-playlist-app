import { useEffect, useState } from "react";
import { data } from "react-router-dom";

function Callback({ onTokenReceived}) {

    console.log('Callback loaded');

    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const verifier = localStorage.getItem('spotify_code_verifier');

        console.log('Code:', code);
        console.log('Verifier:', verifier);


        if (!code || !verifier) {
            console.error('Auth failed:', { code, verifier});
            setError('Login error. Try again.');
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
            return;
        }

        const fetchAccessToken = async (code, verifier) => {
            const body = new URLSearchParams({
                client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
                grant_type: 'authorization_code',
                code,
                redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
                code_verifier: verifier,
            }).toString();

            console.log("Body:", body);

            try {
                
                console.log("Sending token request to Spotify");

                const response = await fetch('https://accounts.spotify.com/api/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: body,
                    });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Token fetch failed');
                }

                onTokenReceived(data.access_token);
            } catch (error) {
                console.error('Token fetch error:', error);
                setError('Could not log in. Please try again.');
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
            }
        }

        fetchAccessToken(code, verifier);
    }, []);

    return (
        <div>
            {error ? <p className="error">{error}</p> : <p>Logging in...</p>}
        </div>
    );
}

export default Callback;