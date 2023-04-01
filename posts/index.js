const express = require('express');
const bodyParser = require("body-parser");
const {randomBytes} = require('crypto');
const cors = require('cors'); 
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
// body parser parses the body being submitted to api
app.use(cors());
const posts = {};

// returns posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

// stores post in service's database
// emits post to event bus
app.post('/posts/create', async(req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    
    posts[id] = {id, title};

    await axios.post("http://eventbus-srv:4005/events", { 
        type: "postCreated",
        data:  {id, title}
    }).catch((err)=> {
        console.log(err);
    })
    
    res.status(201).send(posts[id]);
});

// route for event bus to send confirmation that it received post
app.post("/events", (req, res) => {
    console.log("received event", req.body.type);
    res.send({});
});


app.listen(4000, () => {
    console.log("v55");
    console.log('Listening on 4000');
})