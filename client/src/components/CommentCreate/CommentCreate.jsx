import React, {useState} from "react";
import axios from "axios";

const CommentCreate = ({postId}) => {
    const [content, setContent] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        });

        setContent("");
    }

    return(
        <section>
            <form onSubmit={onSubmit}>
                <section className="form-group">
                    <label>New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)}className="form-control"/>
                </section>
                <button className="btn btn-primary">Submit</button>
            </form>
        </section>
    )
}

export default CommentCreate;