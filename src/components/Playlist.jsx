import TrackList from "./TrackList";

function Playlist({ playlistName, onNameChange, playlistTracks, onRemove, onSave }) {
    return (
        <div>
            <input
                value={playlistName} 
                onChange={(e) => onNameChange(e.target.value)}
            />
            
            <TrackList 
                tracks={playlistTracks}
                onRemove={onRemove}
                isRemoval={true}
            />

            <button onClick={onSave}>Save to Spotify</button>
        </div>
    );
};

export default Playlist;