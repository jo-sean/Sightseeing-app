import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShowSightPage from './pages/ShowSightPage';
import { useState } from 'react';

function App() {
  const [setSightToEdit] = useState();

  return (
    <div className="app">
      <h1 className="title">See Oregon</h1>
      <Router>
        <div className="appheader">
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/show-sights">
            <ShowSightPage setSightToEdit={setSightToEdit} />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;