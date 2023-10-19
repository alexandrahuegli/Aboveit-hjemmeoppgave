// App.js
import React, { useState } from 'react';
import './App.css';

import CatBreeds from './CatBreeds';

function App() {
  const [selectedBreed, setSelectedBreed] = useState(null);

  const handleBreedSelect = (breed) => {
    setSelectedBreed(breed);
  };

  return (
    <div className="App">
      <h1>Cat Breeds Information</h1>
      <div className="App-container">
        <CatBreeds onSelectBreed={handleBreedSelect} />
      </div>
    </div>
  );
}

export default App;

