import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Post from './components/Post';

function App() {
  const [posts, setPost] = useState([
    {username: 'Abhijeet', projectName: 'chatapp', id: 1, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, recusandae.'},
    {username: 'Jeet', projectName: 'image hub', id: 2, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, recusandae.'},
    {username: 'Kushwaha', projectName: 'git seacrh', id: 3, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, recusandae.'},
  ])
  return (
    <div className="app">
      <Nav />
      <div className="dashboard">
        {
          posts.map(post => {
            return <Post username={post.username} projectName={post.projectName} description={post.description} key={post.id} />
          })
        }
      </div>
    </div>
  );
}

export default App;
