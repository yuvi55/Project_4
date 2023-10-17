import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './component';

function App() {
  // Empty dependency array to run the effect only once on component mount

  return (
    <div className='main_div'>
      <h1>Trippin on the Galaxy</h1>
      <h2>Discover amazing clicks from NASA</h2>
      <h3>😂😍🥰🐈</h3>

      <div>
          <Card/>
      </div>
    </div>
  );
}

export default App;
