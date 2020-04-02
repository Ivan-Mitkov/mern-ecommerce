const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
//middleware
app.use(morgan("dev"));
//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie parser
app.use(cookieParser());

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB connected"));

//routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app listen on port ${port}`));
