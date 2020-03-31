const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes=require('./routes/user');

const app = express();

//db
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>console.log("DB connected"));

//routes
app.use('/api',userRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app listen on port ${port}`));
