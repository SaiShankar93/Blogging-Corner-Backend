const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToMongoDB = async () => {
    try {
        console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Error while connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongoDB;