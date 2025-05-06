import React from 'react';

function TopArtists({ artists }) {
    return (
      <div>
        <ul className="top-artists">
          {artists.map((artist) => (
            <li key={artist.id}>
              <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <img src={artist.images[0].url} alt={artist.name} />
                <div>
                  <p className="artist-name">{artist.name}</p>
                  <p className="artist-genre">{artist.genres.join(", ")}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  

export default TopArtists;
