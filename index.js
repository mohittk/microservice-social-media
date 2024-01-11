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

app.use(express.json());
app.use('/api/v1/', postRoutes);

app.listen(PORT, () => {
    console.log(`Listening to the PORT: ${PORT}`)
})