const path = require("path");
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.get('/api',(req,res)=>{
    res.send("Node API")
});

app.use(express.static(path.join(__dirname, "build")));
//app.use(express.static("public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });


app.listen(port,()=>{
    console.log(`App is running at ${port}`);
});