import React from 'react';
import MapContainer from './components/Map'
import TeamsContainer from './components/Teams'
import './App.css';
import socketIOClient from "socket.io-client";

const endpoint = process.env.REACT_APP_CLIENT_ENDPOINT
const socket = socketIOClient(endpoint);


function App() {
  
  return (
    <div className="App">
      <TeamsContainer socket={socket}/>
      <MapContainer socket={socket}/>
      <header className="App-header"></header>
      
    </div>
  );
}

export default App;
