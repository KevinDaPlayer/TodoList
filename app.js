const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "todoList",
  user: "root",
  password: "1234",
});
db.connect();

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
  db.query("SELECT * FROM todoList ORDER BY IDCS", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.render("dashboard", { todolist: result });
  });
});

app.post("/writeList", (req, res) => {
  const { title, content } = req.body;
  db.query(
    "INSERT INTO todoList (title, content) VALUES (?, ?)",
    [title, content],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(
          '<script>alert("成功新增代辦事項!");window.location.herf="/dashboard";</script>'
        );
      }
    }
  );
});

app.post("/deleteList", (req, res) => {
  const { title } = req.body;
  db.query("DELETE FROM todoList WHERE title = ?", [title], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(
        '<script>alert("成功刪除代辦事項!");window.location.herf="/dashboard";</script>'
      );
    }
  });
});
