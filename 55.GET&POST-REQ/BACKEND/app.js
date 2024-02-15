const express = require("express");
const app = express();
let port = 8080;

app.listen(port, () => {
    console.log(`the server is listening at post : ${port}`);

})

app.get("/register" , (req , res)=>{
    console.log(`this is get request`);
    
})
app.post("/register" , (req , res)=>{
    console.log(`this is post request`);
    
})