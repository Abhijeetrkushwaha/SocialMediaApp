import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Post from './components/Post'

function App() {
  return (
    <div className="app">
      <Nav />
      <div className="dashboard">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default App;
