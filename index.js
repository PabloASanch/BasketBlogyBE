const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route")
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const app = express();

app.use(express.json()); 
app.use(cors());

app.use("/users", userRoute);
app.use("/Posts", postRoute)

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Connected to port " + port);
});
