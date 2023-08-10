const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
};

module.exports = connectDB;