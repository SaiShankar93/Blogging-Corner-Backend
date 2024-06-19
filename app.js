const express = require("express");
const connectToMongoDB = require("./db");
const cors = require("cors");
const bodyParser = require('body-parser');
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const dotenv = require('dotenv');
const path = require("path");
const app = express();

// Connect to MongoDB
connectToMongoDB();
dotenv.config();

// Middleware
app.use(cors("*"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/user', userRoute);
app.use('/post', postRoute);


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});
