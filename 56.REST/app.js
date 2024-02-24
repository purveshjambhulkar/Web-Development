//basic set up EXPRESS app
const express = require("express");
const app = express();
let port = 8080;


const path = require("path");
/**After this line executes, you can use the functionalities 
 * provided by the path module through the path variable. 
 * For example, you can use path.join() to concatenate parts 
 * of a file path in a platform-independent manner or path.resolve() 
 * to get the absolute path of a file or directory. */


//for creating unique IDs for each post
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

//method-override
var methodOverride = require('method-override')

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }));
/*-->app.use(express.urlencoded({ extended: true }));
 is setting up middleware in your Express.js
application to parse incoming URL-encoded form data 
and populate req.body with the parsed data, including 
support for parsing nested objects if extended is set to true.*/

app.set("view engine", "ejs");
/*After setting the view engine to EJS, Express.js will 
automatically look for EJS files in the views directory 
of your application and render them when you use functions 
like res.render()*/

app.set("views", path.join(__dirname, "views"));
/*By using this configuration, Express.js will know that
the views/templates are located in the "views" directory
of the application. This allows you to use relative paths
when rendering views, making your code more maintainable
and easier to work with.*/

app.use(express.static(path.join(__dirname, "public")));
/*By using this middleware, any files in the "public" directory
 of your application can be accessed directly via their URLs. 
 For example, if you have a file named "styles.css" in the 
"public" directory, it can be accessed at http://yourdomain.com/styles.css. */

let posts = [
    {
        id: uuidv4(),
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

//GET REQ to view all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

//GET REQ to render new.ejs for creating new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs", { posts });
})

//POST REQ to create new post and redirecting to the /posts
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    /*This line extracts the username and content properties 
    from the req.body object using object destructuring in JavaScript.
    req.body: This is an object in Express.js that contains the parsed request body. 
    When a client sends a POST request with data, such as form data or JSON data, 
    the body of the request is parsed and made available in the req.body object by 
    middleware like express.urlencoded() or express.json().
    */

    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
})

//GET REQ to see individual post in detail
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    /*When a request is made to a route that contains route parameters,
     Express.js parses the URL and extracts the values of these parameters.
      It then makes these values available in the req.params object, with 
      each property name corresponding to the named route parameter.
    For example, given the route /users/:userId, if a request is made to /users/123, 
    req.params would look like this:
    {
    userId: '123'
    }*/

    let post = posts.find((p) => id === String(p.id));
    res.render("show.ejs", { post });
});

//PATCH REQ to edit the post and to redirect to /posts
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === String(p.id));
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === String(p.id));
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== String(p.id));
    console.log(posts);
    res.redirect("/posts");
})

/**app.listen() is a method in Express.js used to start a server 
 * and make it listen for incoming connections on a specified port. */
app.listen(port, () => {
    console.log(`the is ${port}`);

})

