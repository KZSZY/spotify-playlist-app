function Track({track, onAdd, onRemove, isRemoval}) {
    const handleClick = () => {
        if (isRemoval && onRemove) {
            onRemove(track);
        } else if (!isRemoval && onAdd) {
            onAdd(track);
        }
    };

    return (
        <div>
            <p>{track.name} - {track.artist}</p>
            <button onClick={handleClick}>
                {isRemoval ? '-' : '+'}
            </button>
        </div>
    );
}

export default Track;