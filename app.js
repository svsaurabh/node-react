const path = require("path");
const express = require("express");
const cors = require("cors")
const connectDB = require("./server/config/db");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header

// @initialize app
const app = express();

//@connect database
connectDB();

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 100
  })
);
app.use(cookieParser());
app.use(express.json({ extended: false }));

const port = process.env.PORT || 5000;
app.use(cors());
app.use('/api/auth', require("./server/routes/api/auth"));
app.use('/api/author', require('./server/routes/api/author'));
app.use('/api/profile', require('./server/routes/api/profile'))
app.use('/api/oauth', require('./server/routes/api/oauth'))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api", (req, res) => {
  res.send("Node API");
});


app.use(express.static(path.join(__dirname, "build")));
//app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
