import express from "express"
import cors from "cors";
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json())
app.use(cookieParser())

connectDB();

const allowedOrigins = ['http://localhost:3000']


app.use(cors({origin: allowedOrigins, credentials: true}))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
