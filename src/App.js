import React, {useEffect, useState} from 'react';
import { db } from './firebase'

import Post from "./Components/Post/Post";

import './App.css';

function App() {
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        })
    }, []);
  return (
    <div className="App">
      <div className="app__header">
          <img
              className='app__headerImage'
              src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
              alt=''
          />
      </div>
        { posts.map(({id, post}) => (
            <Post
                key = { id }
                post = { post }
            />
        ))}
    </div>
  );
}

export default App;
