
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoConnection = require('./config/mongoose.js');
const cors = require('cors');
const morgan = require('morgan');


const app = express();
dotenv.config();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// expose images
app.use('/img', express.static('assets'));


// Route
const router = require('./router.js');

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World');
})

const port = process.env.PORT || 8000;

mongoConnection(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})