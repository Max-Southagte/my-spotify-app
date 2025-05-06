import React from 'react';

function Dashboard({ data, totalMinutesListened }) {
    const { topTracks = [], topArtists = [], topGenres = [], recentPlays = [] } = data;

    const formattedMinutes = totalMinutesListened.toLocaleString();

    return (
        <div className="dashboard">
            <div className="dashboard-section total-minutes">
                <h3>Total Minutes Listened</h3>
                <ul className="dashboard-list">
                    <li>
                        <span>{formattedMinutes}</span>
                    </li>
                </ul>
            </div>
            <div className="dashboard-top">
                <div className="dashboard-section">
                    <h3>Top 5 Tracks (Last 4 Weeks)</h3>
                    <ul className="dashboard-list">
                        {topTracks.map((track) => (
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
                <div className="dashboard-section">
                    <h3>Top 5 Artists (Last 4 Weeks)</h3>
                    <ul className="dashboard-list">
                        {topArtists.map((artist) => (
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
                <div className="dashboard-section">
                    <h3>Top 10 Genres (Last 4 Weeks)</h3>
                    <ul className="dashboard-list">
                        {topGenres.map((genre, index) => (
                            <li key={index}>
                                <span>{genre.genre}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="dashboard-section">
                <h3 id="RPhead">Last 5 Recently Played Songs</h3>
                <ul className="recently-played">
                    {recentPlays.map((track) => (
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
        </div>
    );
}

export default Dashboard;