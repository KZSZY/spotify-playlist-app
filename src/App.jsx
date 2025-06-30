import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Callback from './components/Callback';
import LoginButton from './components/LoginButton';
import SearchBar from './components/SearchBar';
import TrackList from "./components/TrackList";
import Playlist from './components/Playlist';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  useEffect(() => {
    const storedToken = localStorage.getItem('spotify_acces_token');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const handleTokenReceived = (token) => {
    setAccessToken(token);
    localStorage.setItem('spotify_acces_token', token);
  }

  const addTrack = (track) => {
    if (playlistTracks.find((t) => t.id === track.id)) return;
    setPlaylistTracks([...playlistTracks,track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  };

  const search = (term) => {
    console.log('Search term:', term);
    
    const fakeResults = [
      { id: 1, name: 'Track One', artist: 'Artist A', album: 'Album X', uri: 'spotify:track:dummy1' },
      { id: 2, name: 'Track Two', artist: 'Artist B', album: 'Album Y', uri: 'spotify:track:dummy2' },
      { id: 3, name: 'Track Three', artist: 'Artist C', album: 'Album Z', uri: 'spotify:track:dummy3' }
    ];
    searchResults(fakeResults);
  }

  const savePlaylist = () => {
    console.log('Saving playlist to Spotify...');
    console.log('NAme:', playlistName);
    console.log('Tracks:', playlistTracks);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <div>
            <h1>Jammming</h1>

            {accessToken ? (
              <>
                <SearchBar onSearch={search} />

                <h2>Search Results</h2>
                <TrackList
                  tracks={searchResults}
                  onAdd={addTrack}
                  isRemoval={false}
                />

                <h2>My Playlist</h2>
                <Playlist
                  playlistName={playlistName}
                  onNameChange={setPlaylistName}
                  playlistTracks={playlistTracks}
                  onRemove={removeTrack}
                  onSave={savePlaylist}
                />
              </>
              ) : (
                <LoginButton />
              )
            }
          </div>
        } />

        <Route path='/callback' element={<Callback onTokenReceived={handleTokenReceived} />} />
      </Routes>
    </Router>
  );
}

export default App;
