const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
    const { type, data} = req.body;

    if (type === "commentCreated") {
        const status = data.content.includes("orange") ? "rejected" : "approved";
        console.log("this is status");
        console.log(status);
        await axios.post("http://eventbus-srv:4005/events", {
            type: "commentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch((err)=> {
            console.log(err);
        })
    }

    res.send({});
});

app.listen(4003, () => {
    console.log("Listening on 4003");
});