const express = require("express");
const app = express();
let port = 8080;

app.listen(port, () => {
    console.log(`the server is listening at post : ${port}`);

})

app.get("/register" , (req , res)=>{
    let {user , email} = req.query;
    // res.send("THIS IS GET RESPONSE")
    res.send(`Welcome ${user} !`)
    console.log(`this is get request`);
    
})
app.post("/register" , (req , res)=>{
    console.log(`this is post request`);
    res.send("THIS IS POST RESPONSE")
    
})