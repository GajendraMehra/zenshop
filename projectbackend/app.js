require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express")

const bodyParser = require("body-parser")
const cokkieParser = require("cookie-parser")
const cors = require("cors")
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


app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
// app.use()