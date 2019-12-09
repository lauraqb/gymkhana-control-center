import React from 'react';
import MapContainer from './components/Map'
import TeamsContainer from './components/Teams'
import './App.css';


import socketIOClient from "socket.io-client";

const endpoint = 'http://localhost:8000' 
const socket = socketIOClient(endpoint);


function App() {
  
  return (
    <div className="App">
      <TeamsContainer socket={socket}/>
      <MapContainer/>
      <header className="App-header"></header>
      
    </div>
  );
}

export default App;
