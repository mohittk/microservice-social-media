const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const rateLimiter = require('express-rate-limit');
const postRoutes = require('./routes/postRoutes');
const PORT = process.env.PORT || 5000;
dotenv.config();

try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("DB connected");
    });

} catch (err) {
    console.log(err);
}

const limiter = rateLimiter({
    windowMs: 10*60*1000,
    max: 150,
    message: 'Too many requests, please try again!'
})

app.use(express.json());
app.use('/api/v1/', postRoutes);
app.use('/api/v1', limiter);

app.listen(PORT, () => {
    console.log(`Listening to the PORT: ${PORT}`)
})