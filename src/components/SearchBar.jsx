import { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) return;

        onSearch(searchTerm);
        setSearchTerm('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={searchTerm}
                onChange={handleChange}
                placeholder="Enter a song or artist"
            />
            <button type='submit'>Search</button>
        </form>
    );
};

export default SearchBar;