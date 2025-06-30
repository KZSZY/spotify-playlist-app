import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback({onTokenReceived}) {
    const navigate = useNavigate();

    useEffect(() => {
        const verifier = localStorage.getItem('spotify_code_verifier');
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        const error = params.get('error');
        if (error) {
            console.warn('Authorization denied:', error);
            navigate('/');
            return;
        }
        
        if (!code || !verifier) {
            console.error('Missing code or verifier');
            return;
        }
    
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            code_verifier: verifier,
        });

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString(),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.access_token) {
                    onTokenReceived(data.access_token);
                    localStorage.removeItem('spotify_code_verifier');
                    navigate('/');
                } else {
                    console.error('Token error:', data);
                }
            })
            .catch((err) => console.error('Fetch error:', err));
    }, [navigate, onTokenReceived]);

    return <p>Logging in Spotify...</p>;
};

export default Callback;