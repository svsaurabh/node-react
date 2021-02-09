const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("Node Homepage")
});

app.listen(5000,()=>{
    console.log(`App is running at 5000`);
});