import redirectToSpotifyAuthWithPKC from "../utils/spotify";

function LoginButton() {
    const handleLogin = async () =>{
        redirectToSpotifyAuthWithPKC()
    }

    return <button onClick={handleLogin}>Login with Spotify</button>;
};

export default LoginButton;