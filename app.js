const path = require("path");
const express = require("express");
const connectDB = require("./server/config/db");

// @initialize app
const app = express();

//@connect database
connectDB();

app.use(express.json({ extended: false }));

const port = process.env.PORT || 5000;

app.use('/api/auth', require("./server/routes/api/auth"));
app.use('/api/author', require('./server/routes/api/author'));
app.use('/api/profile', require('./server/routes/api/profile'))

app.get("/api", (req, res) => {
  res.send("Node API");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.static(path.join(__dirname, "build")));
//app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
