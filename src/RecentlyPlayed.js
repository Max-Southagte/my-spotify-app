import React from 'react';

function RecentlyPlayed({ tracks }) {
    return (
        <div>
            <ul className="recently-played">
                {tracks.map((track) => (
                    <li key={track.track.id}>
                        <a href={track.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            <img src={track.track.album.images[0].url} alt={track.track.name} />
                            <div>
                                <p className="track-name">{track.track.name}</p>
                                <p className="track-artist">{track.track.artists.map(artist => artist.name).join(", ")}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentlyPlayed;