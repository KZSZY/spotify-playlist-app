import { useState } from 'react';
import TrackList from "./components/TrackList";
import Playlist from './components/Playlist';
import SearchBar from './components/SearchBar';

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Track One', artist: 'Artist A', album: 'Album X' },
    { id: 2, name: 'Track Two', artist: 'Artist B', album: 'Album Y' },
    { id: 3, name: 'Track Three', artist: 'Artist C', album: 'Album Z' }
  ]);

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  const addTrack = (track) => {
    if (playlistTracks.find((t) => t.id === track.id)) return;
    setPlaylistTracks([...playlistTracks,track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  };

  const savePlaylist = () => {
    console.log('Saving playlist:', playlistName);
    console.log('Tracks:', playlistTracks);
  };

  const search = (term) => {
    console.log("Searching for:", term);
  };

  return (
    <div>
      <h1>Playlist App</h1>

      <SearchBar 
        onSearch={search}
      />

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
    </div>
  );
}

export default App;
