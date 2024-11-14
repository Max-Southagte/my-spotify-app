// src/api/spotifyApi.js
export const getTopTracks = async (token, timeRange) => {
    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch top tracks');
    const data = await response.json();
    console.log(data);
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
    console.log(data);
    return data.items;
};
