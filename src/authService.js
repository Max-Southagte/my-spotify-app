export const getTokenFromUrl = () => { // https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#get-the-access-token
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('='); // Split the string into key and value
            initial[parts[0]] = decodeURIComponent(parts[1]); // Decode the value and assign it to the key in the initial object
            return initial;
        }, {});
};

export const loginUrl = `https://accounts.spotify.com/authorize?
client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&
redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&
scope=user-top-read%20playlist-read-private%20
playlist-read-collaborative%20user-read-private%20
user-read-email%20user-top-read%20user-read-recently-played&
response_type=token&
show_dialog=true`;

