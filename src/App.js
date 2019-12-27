import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Partida from './pages/Partida'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/partida" component={Partida} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
