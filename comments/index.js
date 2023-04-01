const express = require("express");
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post("/posts/:id/comments", async (req, res) => {
    console.log("posts has been hit")
    // generate unqiue id for comment
    const commentId = randomBytes(4).toString('hex');
    // grab comment and post id off of reqquest body
    const {content} = req.body;
    // if the post id exists in the commentsByPostId object, assign the array to the comments variable, otherwise assign an empty array to the comments variable
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content, status: "pending"})

    
    await axios.post("http://eventbus-srv:4005/events", {
        type: "commentCreated",
        data: {
            id: commentId, 
            content,
            postId: req.params.id,
            status: "pending"
        }
    })

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
})

app.post("/events", async(req, res) => {

    console.log("received event", req.body.type);

    const { type, data } = req.body;

    if(type === "commentModerated") {
        const {postId, id, status, content} = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => {
            return comment.id === id;
        })

        comment.status = status;
        console.log("commentModerated has been hit")
        await axios.post("http://eventbus-srv:4005/events", {
            type: "commentUpdated",
            data: {
                id,
                status, 
                postId,
                content
            }
        }).catch((err)=> {
            console.log(err);
        })
    }

    res.send({});
});

app.listen(4001, () => {
    console.log("listening on port 4001");
})