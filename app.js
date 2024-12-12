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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));