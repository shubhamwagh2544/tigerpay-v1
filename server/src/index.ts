import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO as string)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    })

// middleware
app.use(express.json());



// health check
app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Health OK!!!'
    });
});


// server start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});