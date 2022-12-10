const express = require("express");
// const bodyParser = require("body-parser");
const db = require("./src/db/db");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to e-com application." });
});

app.use("/api", [
  require("./src/routes/auth"),
  require("./src/routes/buyer"),
  require("./src/routes/seller"),
]);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
