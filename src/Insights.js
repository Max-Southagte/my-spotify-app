import React from 'react';
import { Chart as ChartJS } from "chart.js/auto"; //this is required for Chart.js to work with React
import { Bar } from "react-chartjs-2";

function Insights({ insights }) {
    const { 
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
        topArtistDetails,
    } = insights;

    const minutesEachDayChartData = {
        labels: sortedMintesEachDay.map(({ day }) => day),
        datasets: [
            {
                label: 'Listening Minutes Per Day',
                data: sortedMintesEachDay.map(({ totalMinutes }) => totalMinutes),
                backgroundColor: 'rgb(29, 185, 84)',
                borderColor: 'rgb(0, 0, 0)',
                borderWidth: 1.5,
            },
        ],
    };

    const minutesEachMonthChartData = {
        labels: sortedMinutesEachMonth.map(({ month }) => month),
        datasets: [
            {
                label: 'Listening Minutes Per Month',
                data: sortedMinutesEachMonth.map(({ totalMinutes }) => totalMinutes),
                backgroundColor: 'rgb(29, 185, 84)',
                borderColor: 'rgb(0, 0, 0)',
                borderWidth: 1.5,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgb(238, 231, 231)',
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'rgb(238, 231, 231)',
                },
            },
            y: {
                ticks: {
                    color: 'rgb(238, 231, 231)',
                },
            },
        },
    };

    const totalArtistMinutes = topArtistSongs.reduce((sum, song) => sum + song.count * averageMinutesPerSong, 0);
    const artistListeningPercentage = ((totalArtistMinutes / totalMinutes) * 100).toFixed(2);

    const totalSongMinutes = topSong.count * averageMinutesPerSong;
    const songListeningPercentage = ((totalSongMinutes / totalMinutes) * 100).toFixed(2);

    return (
        <div className="insights-container">
            <div className="insights">
                <h2>Streaming Insights</h2>
                <div className="insights-list">
                    <li>
                        <span>Total Listening Time:</span> {totalMinutes.toLocaleString()} minutes
                    </li>
                    <li>
                        <span>Average Time per Song:</span> {averageMinutesPerSong.toFixed(2)} minutes
                    </li>
                    <li>
                        <span>Total Songs Played:</span> {songCount}
                    </li>
                    <li>
                        <span>Unique Artists Listened To:</span> {numUniqueArtists}
                    </li>
                    <li>
                        <span>Unique Tracks Listened To:</span> {numUniqueTracks}
                    </li>
                </div>

                <h3>Total Listening Time by Day and Month</h3>
                <div className="insights-charts">
                    <div className="chart">
                        <Bar data={minutesEachDayChartData} options={chartOptions} />
                    </div>
                    <div className="chart">
                        <Bar data={minutesEachMonthChartData} options={chartOptions} />
                    </div>
                </div>

                <h3>Most played Artist and Song</h3>

                <div className="top-stats-row">
                    <div className="top-artist-section">
                        <h3>Most Played Artist</h3>
                        <p><strong>{topArtist.artist}</strong> with <strong>{topArtist.count}</strong> plays</p>
                        <p>Total Listening Time: <strong>{Math.floor(totalArtistMinutes)} minutes</strong></p>
                        <p><strong>{artistListeningPercentage}%</strong> of total listening time</p>
                        <h4>Top 5 Songs by {topArtist.artist}</h4>
                        <ol>
                            {topArtistSongs.map((song, index) => (
                                <li key={index}>
                                    {song.name} - {song.count} plays
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="artist-details">
                        <p><strong>Artist:</strong> {topArtistDetails.name}</p>
                        <p><strong>Followers:</strong> {topArtistDetails.followers.total.toLocaleString()}</p>
                        <p><strong>Genres:</strong> {topArtistDetails.genres.join(', ')}</p>
                        <p><strong>Popularity:</strong> {topArtistDetails.popularity}/100</p>
                        {topArtistDetails.images[0] && (
                            <img
                                src={topArtistDetails.images[0].url}
                                alt={`${topArtist.artist} profile`}
                                className="artist-image"
                            />
                        )}
                    </div>

                    <div className="top-song-section">
                        <h3>Most Played Song</h3>
                        <p><strong>{topSong.song}</strong> with <strong>{topSong.count}</strong> plays</p>
                        <p>Total Listening Time: <strong>{Math.floor(totalSongMinutes)} minutes</strong></p>
                        <p><strong>{songListeningPercentage}%</strong> of total listening time</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Insights;