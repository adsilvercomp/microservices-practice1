import React, {useState, useEffect} from "react";
import axios from "axios";
import CommentCreate from "../CommentCreate/CommentCreate";
import CommentList from "../CommentList/CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        fetchPosts();
    },[]);

    const renderedPosts = Object.values(posts).map(post => {
        return(
            <section key={post.id} className="card" style={{width:"30%", marginBottom: "20px"}}>
                <section children className="card-body">
                    <h3>{post.title}</h3>    
                    <CommentList comments={post.comments}/>
                    <CommentCreate postId={post.id}/>
                </section> 
            </section>
        ) 
    });

    const fetchPosts = async () => {
        const res = await axios.get("http://posts.com/posts");
        setPosts(res.data);
    }
    
    return(
        <section className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </section>
    )
}

export default PostList;