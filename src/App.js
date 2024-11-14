// src/components/App.js
import React, { useEffect, useState } from 'react';
import { getTokenFromUrl } from './authService';
import { getTopTracks, getTopArtists } from './spotifyApi';
import Login from './login';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import './App.css';

function App() {
    const [token, setToken] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [activeTab, setActiveTab] = useState('tracks'); // 'tracks' or 'artists'
    const [timeRange, setTimeRange] = useState('long_term'); // short_term, medium_term, long_term

    useEffect(() => {
        const hash = getTokenFromUrl();
        window.location.hash = '';
        const _token = hash.access_token;
        if (_token) setToken(_token);
    }, []);

    useEffect(() => {
        if (token) {
            if (activeTab === 'tracks') {
                getTopTracks(token, timeRange).then(setTracks).catch(console.error);
            } else if (activeTab === 'artists') {
                getTopArtists(token, timeRange).then(setArtists).catch(console.error);
            }
        }
    }, [token, activeTab, timeRange]);

    return (
        <div className="app">
            {token ? (
                <>
                    <div className="tabs">
                        <button onClick={() => setActiveTab('tracks')} className={activeTab === 'tracks' ? 'active' : ''}>
                            Top Tracks
                        </button>
                        <button onClick={() => setActiveTab('artists')} className={activeTab === 'artists' ? 'active' : ''}>
                            Top Artists
                        </button>
                    </div>
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
                    {activeTab === 'tracks' ? <TopTracks tracks={tracks} /> : <TopArtists artists={artists} />}
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;
