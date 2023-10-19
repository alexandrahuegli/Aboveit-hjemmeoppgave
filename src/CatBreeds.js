// CatBreeds.js
import React, { useState, useEffect } from 'react';
import './App.css';

const CatBreeds = ({ onSelectBreed }) => {
  const [breeds, setBreeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/breeds?limit=100&page=0&api_key=live_HQ2p2jHlCzLlVWK1G8ZjfFbqZWzBHewj6VhHfrDpdx5DLCVO58PCKRFrq8kYJLdZ')
      .then((response) => response.json())
      .then((data) => setBreeds(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const startingLetters = [...new Set(breeds.map((breed) => breed.name[0].toUpperCase()))];

  const handleLetterClick = (letter) => {
    setSelectedLetter((prevLetter) => (prevLetter === letter ? '' : letter));
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Search for cat breeds"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="alphabet-filter">
        {startingLetters.map((letter) => (
          <span
            key={letter}
            className={selectedLetter === letter ? 'active' : ''}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </span>
        ))}
      </div>
      <ul>
        {breeds
          .filter((breed) => {
            const startsWithSelectedLetter = !selectedLetter || breed.name[0].toUpperCase() === selectedLetter;
            const matchesSearchQuery = breed.name.toLowerCase().includes(searchQuery.toLowerCase());
            return startsWithSelectedLetter && matchesSearchQuery;
          })
          .map((breed) => (
            <li key={breed.id} onClick={() => onSelectBreed(breed)}>
              <h2>{breed.name}</h2>
              <p>{breed.description}</p>
              {breed.image && (
                <img
                  src={breed.image.url}
                  alt={breed.name}
                  className="cat-image"
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CatBreeds;
