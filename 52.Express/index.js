const express = require("express");

const app = express();

let port = 8080;

app.listen(port , ()=>{
    console.log(`the port is ${port}`);
    
})


//listen to all type of Requests 
app.use((req, res)=>{
    console.log(`request recived`);
    res.send(`this is the first response`);
});