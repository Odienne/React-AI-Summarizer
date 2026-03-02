import React from 'react';
import Hero from './components/Hero/Hero';
import Demo from './components/Demo/Demo';
import './App.css';

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient'></div>
      </div>
      <div className='app'>
        <Hero></Hero>
        <Demo></Demo>
      </div>
    </main>
  );
};

export default App;
