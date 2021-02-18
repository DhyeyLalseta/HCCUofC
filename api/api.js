const express = require("express");
const app = express();
const data = require("./data");
const PORT = 8080;

const api = express.Router();
api.get("/twitter", (req, res) => {
  console.log("request");
  res.json(data);
  console.log("responded");
});

app.use("/api", api);
app.listen(PORT, () => console.log("Express started, port:" + PORT));
