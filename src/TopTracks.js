import React from 'react';

function TopTracks({ tracks }) {
    return (
      <div>
        <ul className="top-tracks">
          {tracks.map((track) => (
            <li key={track.id}>
              <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <img src={track.album.images[0].url} alt={track.name} />
                <div>
                  <p className="track-name">{track.name}</p>
                  <p className="track-artist">{track.artists.map(artist => artist.name).join(", ")}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  

export default TopTracks;
