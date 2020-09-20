import React, { useState, useEffect } from 'react';
import './App.css';
// import Nav from './components/Nav';
import Post from './components/Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Input } from '@material-ui/core';
import ImageUpload from './components/ImageUpload';
// import Loader from './components/Loader'

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
  const [user, setUser] = useState(null);
  const [waitToLoad, setWaitToLoad] = useState(false);
  const [waitSignal, setWaitSignal] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        // console.log(authUser);
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
      setWaitSignal('just a second....')
        auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setOpen(false)
        setEmail('')
        setPassword('')
        setUsername('')
        setWaitSignal('')
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((err) => {
        alert(err.message)
        setWaitSignal('')
      })
  }

  const signIn = (e) => {
    e.preventDefault()
    setWaitSignal('just a second....')
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      setOpenSignIn(false)
      setEmail('')
      setPassword('')
      setWaitSignal('')
    })
    .catch((err) => {
      alert(err.message)
      setWaitSignal('')
    })
  }
  const links = user ? (
    <div className="btn btn-logout">
      <h4><span className="welcome">Welcome </span> To Snapost</h4>
      <Button onClick={() => {
      auth.signOut()
    }}>Logout</Button>
    </div>
  ) : (
    <div className="btn">
      <Button onClick={() => setOpenSignIn(true)}>Login</Button>
      <Button onClick={() => setOpen(true)}>Sign up</Button>
    </div>
  )

  const postUpload = user ? (
    <ImageUpload user={user} />
  ) : (
    <center>
      <h2>Login to upload post</h2>
    </center>
  )
  
  return (
    <div className="app">
      {/* <Loader /> */}
      {/* <Nav /> */}
      <div className="nav">
       <div className="nav-info">
        {
          waitToLoad && links
        }
       </div>
      </div>
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
            <center><p><div className="orange">{waitSignal}</div></p></center>
            <div className="login-signup-form">
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
            </div>
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
            <center><p><div className="orange">{waitSignal}</div></p></center>
            <div className="login-signup-form">
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
            </div>
          </form>
        </div>
      </Modal>
      <div className="dashboard">
         <div className="postUpload">
         { waitToLoad && postUpload }
         </div>
        {
          posts.map(({post, id}) => {
            return <Post username={post.username} description={post.description} timestamp={post.timestamp} imageUrl={post.imageUrl} key={id} />
          })
        }
      </div>
    </div>
  );
}

export default App;
