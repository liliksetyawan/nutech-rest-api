require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const { connectDB } = require("./config/database");
const fs = require('fs');


if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}


connectDB();

app.use(express.json());
app.use("/", userRoutes);
app.use("/", bannerRoutes);
app.use("/", serviceRoutes);
app.use("/", transactionRoutes);

const PORT = process.env.PORT || 3000;
const dbbost = process.env.DB_HOST
const dbport = process.env.DB_PORT
const dbname = process.env.DB_NAME

app.listen(PORT, () => console.log(`Server running on port ${PORT} ${dbbost} ${dbport} ${dbname}`));