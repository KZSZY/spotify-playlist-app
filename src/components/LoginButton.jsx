import { redirectToSpotifyAuthWithPKCE } from "../utils/spotify";

function LoginButton() {
    return <button onClick={redirectToSpotifyAuthWithPKCE}>Log in with Spotify</button>;
};

export default LoginButton;