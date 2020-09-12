import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import Post from './components/Post';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  
  // useEffect(() => {
  //   db.collection('posts')
  //   .onSnapshot(snapshot =>{
  //       setPosts(snapshot.docs.map(doc => (
  //         {post: doc.data(), id: doc.id}
  //       )))
  //   })
  // }, [] )
  const signUp = (e) => {
    e.preventDefault()
    console.log(username, password, email);
    setOpen(false)
  }
  
  return (
    <div className="app">
      <Nav />
      <Button onClick={() => setOpen(true)}>Sign up</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)} 
      >
        <div style={modalStyle} className={classes.paper}>
          <form>
            <Input 
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br/>
            <Button onClick={signUp}>Submit</Button>
          </form>
        </div>
      </Modal>
      <div className="dashboard">
        {
          posts.map(({post, id}) => {
            return <Post username={post.username} projectName={post.projectName} description={post.description} key={id} />
          })
        }
      </div>
    </div>
  );
}

export default App;
