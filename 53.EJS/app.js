const express = require("express");

const app = express();

let port = 8080;

app.set("view engine" , "ejs");

app.get("/", (req, res) => {
    res.render("home.ejs");
});
app.listen(port, () => {
    console.log(`listening at port ${port}`);

});
