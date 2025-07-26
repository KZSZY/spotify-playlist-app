function LogoutButton({ onLogout }) {
    const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    onLogout?.();
    window.location.href = '/';
    };

    return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;