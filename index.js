require('dotenv').config({quiet: true});
const path = require("path");
const express = require('express');

const { connectDB } = require('./config/db.config.js');

const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_URI;

connectDB(connectionString)
    .then(() => console.log('MongoDB Connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})
