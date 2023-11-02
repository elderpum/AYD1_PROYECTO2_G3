const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const morgan = require("morgan");
const router = require("./Routes/router");

// OPTIONS
app.set("port", 3001);
app.set("json spaces", 2);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

//MIDDLEWARE

app.use(morgan("dev"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", router);

module.exports = app;