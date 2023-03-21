const { default: mongoose } = require('mongoose')
require("dotenv").config();

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("Connected to the DB");
})
.catch(err => {
    console.err("Error on DB connection");
})