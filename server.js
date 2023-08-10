const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/connectDB");

//config dot env file
dotenv.config();

//database call
connectDB();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//import
//user routes
app.use("/api/v1/users", require("./routes/userRoute"));

//transactions routes
app.use("/api/v1/transactions", require("./routes/transactionRoute"));

//Default routes
// app.get("/", (req, res) => {
//     res.send( "<h1>Hello from server side</h1>" );
// })

// port 
const PORT = 8080 || process.env.PORT;

// listen server 
app.listen(PORT, (err) => {
    console.log(`Server is running on port ${PORT}`);
})