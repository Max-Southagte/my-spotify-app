// src/components/TopArtists.js
import React from 'react';

function TopGenres({ artists }) {
    return (
      <div>
        <ul className="top-genres">
          {artists.map((artist) => (
            <li key={artist.id}>
              <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <img src={artist.images[0].url} alt={artist.name} />
                <div>
                  <p className="artist-genre">{artist.genres[0]}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
export default TopGenres;