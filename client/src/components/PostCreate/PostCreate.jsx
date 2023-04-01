import React, {useState} from "react";
import axios from "axios";

const PostCreate = () => {
    const [title, setTitle] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post("http://posts.com/posts/create", {
            title
        });

        setTitle("");
    };

    return(
        <section>
            <form onSubmit={onSubmit}>
                <section className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={ e => setTitle(e.target.value)} className="form-control"></input>
                </section>
                <button className="btn btn-primary">Submit</button>
            </form>
        </section>
    )
}

export default PostCreate;