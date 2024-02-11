const express = require("express");

const app = express();

let port = 8080;

app.listen(port, () => {
    console.log(`the port is ${port}`);

})

app.get("/", (req, res) => {
    res.send(`this is normal request`);
})

app.get("/:username/:rollno", (req, res) => {
    let { username, id } = req.params;
    let htmlcode = "<h1>This is another example </h1><ul><li>$(username)</li><li>$(id)</li></ul>";
    res.send(htmlcode);
})

app.get("/search" , (req , res)=>{
    console.log(req.query);
    res.send(`send successful`)
})
// app.get("/apple" , (req , res)=>{
//     res.send(`this is apple request`);
// })
// app.get("/banana", (req , res)=>{
//     res.send(`this is banana request`);
// });

// app.get("*" , (req ,res)=>{
//     res.send(`this is for all request `);
// })

// app.post("/" , (req, res)=>{
//     res.send(`this is post request`);
// })
//listen to all type of Requests
// app.use((req, res)=>{
//     console.log(`request recived`);
//     let code = "<h1>This is reponse</h1><ul><li>NODE JS</li><li>EXpRESS </li><li>REACT</li></ul>";

//     // res.send(`this is the first response`);
//     res.send(code);
// });