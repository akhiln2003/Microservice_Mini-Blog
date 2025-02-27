const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const { rmSync } = require('fs');
const cors = require('cors');
const axios = require('axios');
const { type } = require('os');


const app = express();
app.use(bodyParser.json());
app.use(cors())
const commentsByPostedId = {}

app.get('/post/:id/comments' , (req,res)=>{
    res.send(commentsByPostedId[req.params.id] || []);
});

app.post('/post/:id/comments' , async (req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostedId[req.params.id] || [];

    comments.push({ id : commentId , content , status : "pending" });
    commentsByPostedId[req.params.id] = comments;


    await axios.post("http://localhost:4005/events",{
        type: "CommentCreated",
        data:{
            id:commentId,
            content,
            postId:req.params.id,
            status : "pending"
        }
    })

    res.status(201).send(comments)
});


app.post('/events' , async (req,res)=>{
    console.log("Event Received" , req.body.type);
    const { type , data } = req.body;

    if( type == "CommentModerated"){
        const { id , postId , status , content } = data;

        const comments = commentsByPostedId[postId];

        const comment = comments.find(comment => comment.id == id );

        comment.status = status;

        await axios.post('http://localhost:4005/events' , {
            type: "CommentUpdated",
            data:{
                id , postId , status , content
            }
        })

    }
    res.send({})
    
})


app.listen(4001, ()=> console.log("Listening on 4001"))