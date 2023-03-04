import './App.css';
import React, { useState } from 'react';
// import Canvas from './components/Canvas';

const [mode, toggleMode] = useState('home');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className='row'>
          {mode === 'home' && <Menu />}
        </span>
      </header>
    </div>
  );
}

export default App;
