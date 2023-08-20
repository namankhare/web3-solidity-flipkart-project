const mongoose = require('mongoose');

const mongoConnection = (callback) => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('MongoDB Connected');
            callback();
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = mongoConnection;

