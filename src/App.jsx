import { useState } from 'react';
import TrackList from "./components/TrackList";
import Track from './components/Track';

function App() {
  const [searchResults, setSerchResults] = useState([
    { id: 1, name: 'Track One', artist: 'Artist A', album: 'Album X' },
    { id: 2, name: 'Track Two', artist: 'Artist B', album: 'Album Y' },
    { id: 3, name: 'Track Three', artist: 'Artist C', album: 'Album Z' }
  ]);

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    if (playlistTracks.find((t) => t.id === track.id)) return;
    setPlaylistTracks([...playlistTracks,track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  };

  return (
    <div>
      <h1>Playlist App</h1>

      <h2>Search Results</h2>
      <TrackList
        tracks={searchResults}
        onAdd={addTrack}
        isRemoval={false}
      />

      <h2>My Playlist</h2>
      <TrackList 
        tracks={playlistTracks}
        onRemove={removeTrack}
        isRemoval={true}
      />
    </div>
  );
}

export default App;
