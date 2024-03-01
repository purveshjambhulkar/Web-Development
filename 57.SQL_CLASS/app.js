const mysql = require('mysql');
const { faker } = require('@faker-js/faker');
const express = require("express");
const app = express();
const path = require("path");

//method-override
var methodOverride = require('method-override');
const { error } = require('console');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));


app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty123@sql",
  database: "delta",
});

//function to create fake data using FAKER
let createRandomUser = () => {
  return {
    userId: faker.date.past(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

app.get("/", (req, res) => {
  let q = "SELECT count(*) from user";
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (error) {
    console.log(error);

  }
});


app.get("/user", (req, res) => {
  let q = "SELECT * FROM USER";
  try {
    connection.query(q, (error, result) => {
      // console.log(result);
      let data = result;
      res.render("users.ejs", { data });
    })
  } catch (error) {
    res.send("DB ERROR");
  }
})

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM USER WHERE ID='${id}'`
  try {
    connection.query(q, (error, result) => {
      // console.log(result);
      let data = result[0];
      res.render("edit.ejs", { data });
    })
  } catch (error) {
    res.send("DB ERROR");
  }
})

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { username, password } = req.body;
  let q1 = `SELECT * FROm user where id = '${id}'`;
  try {
    connection.query(q1, (error, result) => {
      // console.log(result);
      let data = result[0];
      // console.log(result);
      let correct_password = result[0]["password"];

      if (correct_password === password) {
        let q2 = `UPDATE USER SET username = '${username}' WHERE id = '${id}'`;
        try {
          connection.query(q2, (error, result) => {
            // console.log(result);
            res.redirect("/user");
          })
        } catch (error) {
          res.send("DB ERROR");
        }
      } else {
        res.send("WORNG PASSWORD");
      }
    })
  } catch (error) {
    res.send("DB ERROR");
  }
})


app.get("/user/add", (req, res) => {
  res.render("add.ejs");
})

app.post("/user/add", (req, res) => {
  let { id, username, email, password } = req.body;
  // console.log(id);
  // console.log(username);
  // console.log(email);
  // console.log(password);

  let q = `INSERT INTO user VALUES ('${id}' , '${username}' , '${email} ', '${password}')`;
  try {
    connection.query(q, (error, result) => {
      res.redirect("/user");
    })
  } catch (error) {
    res.send("DB ERROR");
  }
})

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  res.render("delete.ejs", { id });

})

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q1 = `SELECT * FROm user where id = '${id}'`;
  try {
    connection.query(q1, (error, result) => {
      let data = result[0];
      let correct_password = result[0]["password"];

      if (correct_password === password) {
        let q2 = `DELETE FROM user WHERE id = '${id}'`;
        try {
          connection.query(q2, (error, result) => {
            // console.log(result);
            res.redirect("/user");
          })
        } catch (error) {
          res.send("DB ERROR");
        }
      } else {
        res.send("WORNG PASSWORD");
      }
    })
  } catch (error) {
    res.send("DB ERROR");
  }
})
















app.listen("8080", () => {
  console.log(`the server is listening at port 8080`);
})