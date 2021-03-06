require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const tripRouter = require("./routers/tripRouter");
const userRouter = require("./routers/userRouter");
const placesRouter = require("./routers/placesRouter");
const PORT = process.env.PORT || 3001;
const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/aurevoir", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
app.use(express.static("client/build"));
// Define API routes here
app.use("/api/trips", tripRouter);
app.use("/api/users", userRouter);
app.use("/api/places", placesRouter);
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
