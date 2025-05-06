import React, { useEffect, useState } from 'react';
import { getTokenFromUrl } from './authService';
import { getTopTracks, getTopArtists, getRecentPlays, getTopGenres, getArtistDetails } from './spotifyApi';
import Login from './login';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import TopGenres from './TopGenres';
import RecentlyPlayed from './RecentlyPlayed';
import Dashboard from './Dashboard';
import Insights from './Insights';
import './App.css';

function App() {
    const [token, setToken] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [dashboardData, setDashboardData] = useState({});
    const [insights, setInsights] = useState({});
    const [streamingData, setStreamingData] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [timeRange, setTimeRange] = useState('short_term');
    const [totalMinutesListened, setTotalMinutesListened] = useState(0);

    useEffect(() => {
        const hash = getTokenFromUrl();
        window.location.hash = '';
        const _token = hash.access_token;
        if (_token) setToken(_token);
    }, []);

    useEffect(() => {
        if (token) {
            if (!streamingData.length) {
                Promise.all([
                    fetch('/Spotify Account Data/StreamingHistory_music_0.json').then(res => res.json()),
                    fetch('/Spotify Account Data/StreamingHistory_music_1.json').then(res => res.json()),
                    fetch('/Spotify Account Data/StreamingHistory_music_2.json').then(res => res.json()),
                ])
                    .then(([history0, history1, history2]) => {
                        const allSongs = [...history0, ...history1, ...history2];

                        setStreamingData(allSongs);

                        const totalMs = allSongs.reduce((sum, entry) => sum + entry.msPlayed, 0);
                        setTotalMinutesListened(Math.floor(totalMs / 60000));

                        const songCount = allSongs.length;
                        const totalMinutes = Math.floor(totalMs / 60000);
                        const averageMinutesPerSong = totalMinutes / songCount;

                        const dayTotals = {};
                        allSongs.forEach(({ endTime, msPlayed }) => {
                            const date = new Date(endTime.split(" ")[0]);
                            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

                            dayTotals[dayOfWeek] = (dayTotals[dayOfWeek] || 0) + msPlayed;
                        });

                        const minutesEachDay = Object.keys(dayTotals).map((day) => ({
                            day,
                            totalMinutes: Math.floor(dayTotals[day] / 60000),
                        }));

                        const dayOrder = ['Monday', 'Tuesday', 'Wedneday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

                        const sortedMintesEachDay = minutesEachDay.sort(
                            (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
                        )

                        const monthTotals = {};

                        allSongs.forEach(({ endTime, msPlayed }) => {
                            const date = new Date(endTime.split(" ")[0]);
                            const month = date.toLocaleDateString('en-US', { month: 'long' });

                            monthTotals[month] = (monthTotals[month] || 0) + msPlayed;
                        })

                        const minutesEachMonth = Object.keys(monthTotals).map((month) => ({
                            month,
                            totalMinutes: Math.floor(monthTotals[month] / 60000),
                        }))

                        const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                                            'August', 'September', 'October', 'November', 'December']

                        const sortedMinutesEachMonth = minutesEachMonth.sort(
                            (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
                        );

                        const uniqueArtistsSet = new Set();
                        allSongs.forEach(({ artistName }) => {
                            if (artistName) {
                                uniqueArtistsSet.add(artistName);
                            }
                        });

                        const numUniqueArtists = Array.from(uniqueArtistsSet).length

                        const uniqueTracksSet = new Set();
                        allSongs.forEach(({ trackName }) => {
                            if (trackName) {
                                uniqueTracksSet.add(trackName);
                            }
                        });

                        const numUniqueTracks = Array.from(uniqueTracksSet).length

                        const artistPlayCounts = {};
                        const songPlayCounts = {};

                        allSongs.forEach(({ artistName, trackName }) => {
                            if (artistName) {
                                artistPlayCounts[artistName] = (artistPlayCounts[artistName] || 0) + 1;
                            }
                            if (trackName) {
                                songPlayCounts[trackName] = (songPlayCounts[trackName] || 0) + 1;
                            }
                        });

                        const topArtist = Object.entries(artistPlayCounts).reduce(
                            (top, [artist, count]) => (count > top.count ? { artist, count } : top),
                            { artist: null, count: 0 }
                        );

                        const topArtistSongPlayCounts = {};
                        allSongs.forEach(({ artistName, trackName }) => {
                            if (artistName && trackName) {
                                if (!topArtistSongPlayCounts[artistName]) {
                                    topArtistSongPlayCounts[artistName] = {};
                                }
                                topArtistSongPlayCounts[artistName][trackName] = (topArtistSongPlayCounts[artistName][trackName] || 0) + 1;
                            }
                        });

                        const topArtistSongs = Object.entries(topArtistSongPlayCounts[topArtist.artist] || {})
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 5)
                            .map(([name, count]) => ({ name, count }));

                        const topSong = Object.entries(songPlayCounts).reduce(
                            (top, [song, count]) => (count > top.count ? { song, count } : top),
                            { song: null, count: 0 }
                        );

                        setInsights((prevInsights) => ({
                            ...prevInsights,
                            totalMinutes,
                            averageMinutesPerSong,
                            songCount,
                            numUniqueArtists,
                            numUniqueTracks,
                            sortedMintesEachDay,
                            sortedMinutesEachMonth,
                            topArtist,
                            topSong,
                            topArtistSongs,
                        }));

                        if (topArtist.artist) {
                            getArtistDetails(token, topArtist.artist) // Fetch artist details from Spotify API
                                .then((artistDetails) => {
                                    setInsights((prevInsights) => ({
                                        ...prevInsights,
                                        topArtistDetails: artistDetails,
                                    }));
                                })
                                .catch(console.error);
                        }
                    })
                    .catch(console.error);

            }

            if (activeTab === 'tracks') {
                getTopTracks(token, timeRange).then(setTracks).catch(console.error);
            } else if (activeTab === 'artists') {
                getTopArtists(token, timeRange).then(setArtists).catch(console.error);
            } else if (activeTab === 'genres') {
                getTopGenres(token, timeRange).then(setGenres).catch(console.error);
            } else if (activeTab === 'recentlyPlayed') {
                getRecentPlays(token).then(setRecentlyPlayed).catch(console.error);
            } else if (activeTab === 'dashboard') {
                Promise.all([
                    getTopTracks(token, 'short_term'),
                    getTopArtists(token, 'short_term'),
                    getTopGenres(token, 'short_term'),
                    getRecentPlays(token),
                ])
                    .then(([topTracks, topArtists, topGenres, recentPlays]) => {
                        setDashboardData({
                            topTracks: topTracks.slice(0, 5),
                            topArtists: topArtists.slice(0, 5),
                            topGenres: topGenres.slice(0, 10),
                            recentPlays: recentPlays.slice(0, 5),
                        });
                    })
                    .catch(console.error);
            }
        }
    }, [token, activeTab, timeRange, streamingData]);

    return (
        <div className="app">
            {token ? (
                <>
                    <div className="tabs">
                        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>
                            Dashboard
                        </button>
                        <button onClick={() => setActiveTab('tracks')} className={activeTab === 'tracks' ? 'active' : ''}>
                            Top Tracks
                        </button>
                        <button onClick={() => setActiveTab('artists')} className={activeTab === 'artists' ? 'active' : ''}>
                            Top Artists
                        </button>
                        <button onClick={() => setActiveTab('genres')} className={activeTab === 'genres' ? 'active' : ''}>
                            Top Genres
                        </button>
                        <button onClick={() => setActiveTab('recentlyPlayed')} className={activeTab === 'recentlyPlayed' ? 'active' : ''}>
                            Recently Played
                        </button>
                        <button onClick={() => setActiveTab('insights')} className={activeTab === 'insights' ? 'active' : ''}>
                            Insights
                        </button>
                    </div>
                    {activeTab !== 'dashboard' && activeTab !== 'insights' && activeTab !== 'recentlyPlayed' && (
                        <div className="time-range">
                            <button onClick={() => setTimeRange('short_term')} className={timeRange === 'short_term' ? 'active' : ''}>
                                Last 4 Weeks
                            </button>
                            <button onClick={() => setTimeRange('medium_term')} className={timeRange === 'medium_term' ? 'active' : ''}>
                                Last 6 Months
                            </button>
                            <button onClick={() => setTimeRange('long_term')} className={timeRange === 'long_term' ? 'active' : ''}>
                                All Time
                            </button>
                        </div>
                    )}
                    {activeTab === 'dashboard' && <Dashboard data={dashboardData} totalMinutesListened={totalMinutesListened} />}
                    {activeTab === 'tracks' && <TopTracks tracks={tracks} />}
                    {activeTab === 'artists' && <TopArtists artists={artists} />}
                    {activeTab === 'genres' && <TopGenres genres={genres} />}
                    {activeTab === 'recentlyPlayed' && <RecentlyPlayed tracks={recentlyPlayed} />}
                    {activeTab === 'insights' && <Insights insights={insights} />}
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;