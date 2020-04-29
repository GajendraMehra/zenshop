require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express")
const bodyParser = require("body-parser")
const cokkieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const port = 8080;
const app = express();

// Server starting
app.listen(port, () => {
    console.log(`Listening at ${port}`);

})
// connecting to database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB Connect");

}).catch(() => {
    console.log("ERROR");
});

// using the middlewares
app.use(bodyParser.json())
app.use(cokkieParser())
app.use(cors())

// routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)