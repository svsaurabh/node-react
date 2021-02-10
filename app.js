const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Node Homepage")
});

app.listen(port,()=>{
    console.log(`App is running at ${port}`);
});