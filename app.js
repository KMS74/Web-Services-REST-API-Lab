const express = require("express");
const cors = require("cors");
const v1Router = require("./routes/v1");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const monogString = process.env.DB_URL;
const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api", v1Router);

// connecting to mongoDB
mongoose
  .connect(monogString)
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log(`ERROR: ${err}`));

app.listen(PORT, () => {
  console.log(`app is running at http://localhost:${PORT}`);
});
