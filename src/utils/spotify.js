async function redirectToSpotifyAuthWithPKCE() {
    const generateRandomString = () => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        let codeVerifier = '';
        for (let i = 0; i < 128; i++) {
            codeVerifier += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return codeVerifier;
    }

    const generateCodeChallenge = async (codeVerifier) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        const codeChallange = btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

        return codeChallange;
    }

    const codeVerifier = generateRandomString();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem('spotify_code_verifier', codeVerifier);

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const scope = 'playlist-modify-public playlist-modify-private';

    const authUrl = 
        'https://accounts.spotify.com/authorize?' +
        `client_id=${encodeURIComponent(clientId)}` +
        '&response_type=code' +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        '&code_challenge_method=S256' +
        `&code_challenge=${encodeURIComponent(codeChallenge)}` +
        `&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl
};

export default redirectToSpotifyAuthWithPKCE;