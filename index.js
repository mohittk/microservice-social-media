const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const rateLimiter = require('express-rate-limit');
const postRoutes = require('./routes/postRoutes');
const connectdb = require('./utils/databaseConnection');
const PORT = process.env.PORT || 5000;
dotenv.config();

//database connection
connectdb();

//rate limiter
const limiter = rateLimiter({
    windowMs: 10*60*1000,
    max: 150,
    message: 'Too many requests, please try again!'
})

//middlewares
app.use(express.json()); 
app.use('/api/v1/', limiter, postRoutes);

app.listen(PORT, () => {
    console.log(`Listening to the PORT: ${PORT}`)
})