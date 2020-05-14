import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './pages/Home/Home'
import GamePanel from './pages/GamePanel'
import Challenges from './pages/Challenges'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game/:id" component={GamePanel} />
        <Route exact path="/game/:id/challenges" component={Challenges} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
