

const dotenv = require('dotenv').config();

const port= process.env.port;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
 
module.exports = {
    port,
    MONGODB_CONNECTION_STRING
}