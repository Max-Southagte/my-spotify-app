import React from 'react';

const TopGenres = ({ genres }) => {
  const topGenres = [...genres].sort((a, b) => b.count - a.count).slice(0, 10);

  return (
    <div style={{ width: '80%', margin: '20px auto', color: '#fff', textAlign: 'center' }}>
      <ol style={{ listStyleType: 'decimal', padding: 0 }}>
        {topGenres.map((genre, index) => (
          <li 
            key={index} 
            style={{
              backgroundColor: index % 2 === 0 ? '#444' : '#555',
              padding: '10px 20px',
              margin: '5px 0',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>{genre.genre}</span>
            <span>{index + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopGenres;
