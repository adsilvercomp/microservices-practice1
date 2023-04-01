import React from 'react';
import PostCreate from "./components/PostCreate/PostCreate";
import PostList from './components/PostList/PostList';

const App = () => {
    return (
        <section className="container">
            <h2>Create Post</h2>
            <PostCreate/>
            <hr/>
            <h2>Posts</h2>
            <PostList/> 
        </section>
    )
}

export default App; 