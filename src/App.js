import React, {useEffect, useState} from 'react';
import { db, auth } from './firebase'

import Post from "./Components/Post/Post";

import './App.css';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

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
    const [ posts, setPosts ] = useState([]);
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSingIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if(authUser) {
                console.log(authUser);
                setUser(authUser);

                if (authUser.displayName) {

                } else {
                    return authUser.updateProfile({
                        displayName: username
                    })
                }
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();

        }
    }, [user, username]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        })
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleOpenSingIn = () => {
        setOpenSingIn(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value)
    };

    const handleEmail = (e) => {
        setEmail(e.target.value)
    };

    const handleUsername = (e) => {
        setUsername(e.target.value)
    };

    const handleLogout = () => {
        auth.signOut();
    };

    const handleCloseSignIn = () => {
        setOpenSingIn(false);
    };

    const handleSingIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .catch(error => console.log(error.message));

        handleCloseSignIn();
    };

    const handleSingUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                return authUser.user.updateProfile({
                    displayName: username,

                })
            })
            .catch(error => console.error('firebase', error.message));

        handleClose();
    };

  return (
    <div className="App">
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
    >
        <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
                <div className="app__formImage">
                    <img
                        className='app__headerImage'
                        src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                        alt=''
                    />
                </div>
                <Input
                    placeholder='username'
                    type='text'
                    value={username}
                    onChange={handleUsername}
                />
                <Input
                    placeholder='email'
                    type='text'
                    value={email}
                    onChange={handleEmail}
                />
                <Input
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={handlePassword}
                />
                {user ? (
                    <Button type='submit' onClick={handleLogout}>Logout</Button>
                ) : (
                    <div className="app__loginContainer">
                        <Button type='submit' onClick={handleSingUp}>Sing Up</Button>
                    </div>
                )}
            </form>
        </div>

    </Modal>
        <Modal
            open={openSignIn}
            onClose={handleCloseSignIn}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <form className="app__signup">
                    <div className="app__formImage">
                        <img
                            className='app__headerImage'
                            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                            alt=''
                        />
                    </div>
                    <Input
                        placeholder='email'
                        type='text'
                        value={email}
                        onChange={handleEmail}
                    />
                    <Input
                        placeholder='password'
                        type='password'
                        value={password}
                        onChange={handlePassword}
                    />
                    {user ? (
                        <Button type='submit' onClick={handleLogout}>Logout</Button>
                    ) : (
                        <div className="app__loginContainer">
                            <Button type='submit' onClick={handleSingIn}>Sing In</Button>
                        </div>
                    )}
                </form>
            </div>

        </Modal>
      <div className="app__header">
          <img
              className='app__headerImage'
              src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
              alt=''
          />
      </div>
        <Button onClick={handleOpenSingIn}>Sing In</Button>
        <Button onClick={handleOpen}>Sing Up</Button>
        { posts.map(({id, post}) => (
            <Post
                key = {id}
                post = {post}
            />
        ))}
    </div>
  );
}

export default App;
