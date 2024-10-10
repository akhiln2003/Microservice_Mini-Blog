const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());

const events = [];
 
app.post('/events' , async (req,res)=>{
    try{
        const event = req.body;

        events.push(event);
    
       const requests = [
        axios.post('http://localhost:4000/events', event),
        axios.post('http://localhost:4001/events', event),
        axios.post('http://localhost:4002/events', event),
        axios.post('http://localhost:4003/events', event)
    ];

    // Send all requests concurrently using Promise.allSettled
    const results = await Promise.allSettled(requests);
    
        res.send({status:"OK"})
        
    }catch(e){
        console.log(e)
    }
    

});


app.get('/events' , (req,res)=>{
    res.send(events)
});


app.listen(4005,()=> console.log("Lisitening on 4005"));