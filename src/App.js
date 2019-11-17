import React from 'react';
import { Offline, Online } from "react-detect-offline";
import MapContainer from './components/Map'
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Online>Only shown when you're online</Online>
      <Offline>Only shown offline (surprise!)</Offline>
      <MapContainer/>
      <header className="App-header"></header>
      
    </div>
  );
}

export default App;
