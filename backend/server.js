require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./sequelize/config/sequelize");

const app = express();
const userRouter = require("./app/route/user");

app.use(express.json());
app.use(cors());


app.use("/api/user", userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});