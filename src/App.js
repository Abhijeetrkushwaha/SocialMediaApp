import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import Post from './components/Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Input } from '@material-ui/core';
import ImageUpload from './components/ImageUpload';
import Loader from './components/Loader'

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
  const [openSignIn, setOpenSignIn] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [user, setUser] = useState(null)
  const [waitToLoad, setWaitToLoad] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        console.log(authUser);
        setUser(authUser);
        setWaitToLoad(true)

      } else {
        // user is logged out...
        setUser(null)
        setWaitToLoad(true)
      }
    })

    return () => {
      // perform some cleanup activity
      unsubscribe()
    }
  }, [user, username]);

  
  useEffect(() => {
    db.collection('posts')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot =>{
        setPosts(snapshot.docs.map(doc => (
          {post: doc.data(), id: doc.id}
        )))
    })
  }, [] )
  const signUp = (e) => {
    e.preventDefault()
    
    if(username) {
        auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((err) => alert(err.message))
      setOpen(false)
      setEmail('')
      setPassword('')
      setUsername('')
    } else {
      alert('Enter user name')
    }
  }

  const signIn = (e) => {
    e.preventDefault()

    auth.signInWithEmailAndPassword(email, password)
    .catch((err) => alert(err.message))

    setOpenSignIn(false)
    setEmail('')
    setPassword('')
  }
  const links = user ? (
    <div>
      <Button onClick={() => {
      auth.signOut()
    }}>Logout</Button>
    <ImageUpload user={user} />
    </div>
  ) : (
    <div>
      <Button onClick={() => setOpenSignIn(true)}>Login</Button>
      <Button onClick={() => setOpen(true)}>Sign up</Button>
    </div>
  )
  
  return (
    <div className="app">
      <Loader />
      <Nav />
      {
         waitToLoad && links
      }
      {/* { 
         user?.displayName ? (
          <ImageUpload username={user.displayName} />
          ) : (
            null
          )
      } */}
      
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

      {/* second modal */}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)} 
      >
        <div style={modalStyle} className={classes.paper}>
          <form>
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
            <Button onClick={signIn}>Submit</Button>
          </form>
        </div>
      </Modal>
      <div className="dashboard">
        {
          posts.map(({post, id}) => {
            return <Post username={post.username} projectName={post.projectName} description={post.description} imageUrl={post.imageUrl} key={id} />
          })
        }
      </div>
    </div>
  );
}

export default App;
