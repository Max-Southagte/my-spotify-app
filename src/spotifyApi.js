export const getTopTracks = async (token, timeRange) => {
    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch top tracks');
    const data = await response.json();
    return data.items;
};

export const getTopArtists = async (token, timeRange) => {
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=10`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch top artists');
    const data = await response.json();
    return data.items;
};

export const getRecentPlays = async (token) => {
    const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=10`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch recently played');
    const data = await response.json();
    return data.items;
}

export const getTopGenres = async (token, timeRange) => {
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch Artists');
    const data = await response.json();

    const genreCount = {};

    data.items.forEach(artist => {
        artist.genres.forEach(genre => {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
    });

    const sortedGenres = Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .map(([genre, count]) => ({ genre, count }));

    return sortedGenres;
};

export const getArtistDetails = async (token, artistName) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=2`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error('Failed to fetch artist details');
    const data = await response.json();

    if (data.artists && data.artists.items.length > 0) {
        return data.artists.items[0];
    }

    throw new Error('Artist not found');
};

export const getReccomendations = async (token, seedArtists, seedTracks) => {
    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${seedArtists}&seed_tracks=${seedTracks}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error('Failed to fetch recommendations');
    const data = await response.json();
    return data.tracks;
}

