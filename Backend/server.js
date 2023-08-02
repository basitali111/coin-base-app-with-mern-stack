const express = require('express');
const dbConnect = require('./Database/index');
const {port} = require('./config/index');
const router = require('./routes/index');

const app = express();

app.use(router);

dbConnect();
app.get('/',(req,res)=> res.json({msg:'Hello World12345'}));
app.listen(port,console.log(`Server is running on port ${port}`));