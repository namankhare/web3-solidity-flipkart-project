import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoConnection from './config/mongoose.js';
import cors from 'cors'
const app = express();
dotenv.config();

app.use(cors({
    origin: "*",
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route
import router from './router.js';
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