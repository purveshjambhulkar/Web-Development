const express = require("express");

const app = express();

const path = require("path");

let port = 8080;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log(`listening at port ${port}`);

});

app.get("/", (req, res) => {
    res.render("home.ejs");
});


app.get("/dice", (req, res) => {
    let dice_value = Math.floor(Math.random() * 6) + 1;
    res.render("diceroll.ejs", { num: dice_value });
}); 