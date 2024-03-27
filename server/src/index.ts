import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';
const app = express();
const PORT = 3000

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter)

app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
});