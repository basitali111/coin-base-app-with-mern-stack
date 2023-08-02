const express = require('express');
const dbConnect = require('./Database/index');
const {port} = require('./config/index');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use(router);

dbConnect();

app.use(errorHandler);
app.listen(port,console.log(`Server is running on port ${port}`));