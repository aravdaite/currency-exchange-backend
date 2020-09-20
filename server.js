const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');

//load env vars
dotenv.config({ path: './config/config.env' })

//connect to database
connectDB();

//route files
const getRate = require('./routes/update_currencies');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', process.env.DOMAIN);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'application/json');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//mount routes
app.use('/api', getRate);

const PORT = process.env.PORT || 5000;
const server = http.Server(app);

server.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

// handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //close server and exit process
    server.close(() => process.exit(1));
})