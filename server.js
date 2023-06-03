//Server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const moment = require("moment");


const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql@123",
  database: "todoDB",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

app.get("/", (req, res) => {
  res.send("Hello from the Todo App API");
});

app.post("/todos", (req, res) => {
  let sql = "INSERT INTO todos SET ?";
  let todo = { 
      text: req.body.text, 
      completed: req.body.completed,
      due_date: req.body.due_date 
  };
  db.query(sql, todo, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Todo added...");
  });
});

app.get("/todos", (req, res) => {
  let sql = "SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') AS formatted_due_date FROM todos";
  db.query(sql, (err, results) => {
    if (err) throw err;
    const formattedResults = results.map(todo => ({
      ...todo,
      due_date: todo.formatted_due_date
    }));
    res.send(formattedResults);
  });
});




app.put("/todos/:id", (req, res) => {
  let sql = `UPDATE todos SET text = '${req.body.text}', completed = ${req.body.completed}, due_date = '${req.body.due_date}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Todo updated...");
  });
});

app.delete("/todos/:id", (req, res) => {
  let sql = `DELETE FROM todos WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Todo deleted...");
  });
});


app.listen(5000, () => {
  console.log("Server started on port 5000");
});
