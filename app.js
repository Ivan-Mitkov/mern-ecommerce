const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Node" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app listen on port ${port}`));
