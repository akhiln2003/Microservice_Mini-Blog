const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); 



const app = express();
app.use(bodyParser.json());
app.use(cors());


const posts = {};

const handileEvent = ( type , data )=>{
    if( type == "PostCreated"){
        const { id , title } = data;
        posts[id] = { id , title , comments:[]}
    }
    if( type == "CommentCreated"){
        const { id , content , postId , status } = data;
        const post = posts[postId];
        post.comments.push({ id , content , status });
    }
    if( type == "CommentUpdated"){
        const { id , postId , content , status } = data;
        const post = posts[postId];
        const comment = post.comments.find( comment => comment.id == id);
        comment.status = status;
        comment.content = content
    }
}

app.get('/posts' , ( req , res )=>{
    res.send(posts)
});


app.post('/events' , ( req , res )=>{
    const { type , data } = req.body;
    handileEvent(type,data)     
    res.send({})
});



app.listen(4002,async()=>{
    console.log("lestening 4002");
    const res = await axios.get('http://localhost:4005/events')
    for( let evetn of res.data ){
        console.log("Processing event:" , evetn.type);
        handileEvent( evetn.type , evetn.data)
    }
})