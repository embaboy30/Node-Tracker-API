require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json());

const tracker = require('./routes/trackers');
app.use('/tracker', tracker);

app.listen(port, () => console.log('server start'))