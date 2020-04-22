require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express")
const port = 8080;

const app = express();
app.listen(port, () => {
    console.log(`Listening at ${port}`);

})
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connect");

}).catch(() => {
    console.log("ERROR");

});