const express = require("express");
const app = express();
let port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: "1a",
        username: "Purvesh",
        content: "Join engineering hub for free SPPU study material"

    },
    {
        id: uuidv4(),
        username: "viraj",
        content: "Iphone is the best phone when it comes to camera quality"

    },
    {
        id: uuidv4(),
        username: "om",
        content: "finally i cleared my backlogs euuu"

    },
    {
        id: uuidv4(),
        username: "sahil",
        content: "jaba deeeee jaba deeee"

    },
];


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs", { posts });
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id , username, content });
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === String(p.id));
    res.render("show.ejs", { post });
});

app.patch("/posts/:id" ,(req ,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === String(p.id));
    post.content = newContent;
    console.log(post);
    res.send("Working");
})

app.get("/posts/:id/edit" , (req , res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === String(p.id));
    res.render("edit.ejs" , {post});
})

app.listen(port, () => {
    console.log(`the is ${port}`);

})

