const express = require("express");
const app = express();


// //firt MIDDLEWARE
// app.use((req , res)=>{
//     console.log(`this is first middleware`);
//     res.send("Middleware worked successfully");
// })



//LOGGER
// app.use((req , res , next)=>{

//     req.time = new Date(Date.now()).toString();

//     res.send("Middleware worked");
//     console.log(`HOSTNAME :  ${req.hostname}`);
//     console.log(`IP : ${req.ip}`);
//     console.log(`RES : ${req.res}`);
//     console.log(`PATH : ${req.path}`);
//     console.log(`METHOD : ${req.method}`);
//     console.log(`ROUTE : ${req.route}`);

//     console.log(`TIME : ${req.time}`);

//     next(); 

// })




// //MW for a specific path
// app.use("/abc", (req, res, next) => {
//     console.log(`this is only for the /abc route`);
//     next();

// })



//MW to check whether the query pass the token or not
// app.use("/check", (req, res, next) => {
//     const token = req.query.token;
//     if (token === "12345") {
//         console.log(`access granted`);
//         res.send("acces granted");

//     }else{
//         console.log(`incorret token`);
//         res.send("access denied");
//     }
//     next();
// })



//PASSING MW AS A FUNCTION
// const checkTokenMW = ("/check", (req, res, next) => {
//     const token = req.query.token;
//     if (token === "12345") {
//         console.log(`access granted`);
//         res.send("acces granted");

//     }else{
//         console.log(`incorret token`);
//         res.send("access denied");
//     }
//     next();
// })


//get req for token check
// app.get("/check" ,checkTokenMW(), (req , res)=>{
//     console.log(`token check complete`);
    
// })

/*88888888888888888888888888888888888888888888888888888888888888888888888 */








app.get("/", (req, res) => {
    res.send("hi i am root");
})


app.get("/abc", (req, res) => {
    res.send("this is something");
})




app.listen(8080, () => {

})