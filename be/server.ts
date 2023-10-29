import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes"

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes middleware
app.use("/api/user", userRouter);

mongoose.connect(process.env.MONGO_URL!).then(() => console.log('Database Connected'))


app.listen(process.env.PORT || 4000, () => {
    console.log('Server listening on port 4000')
})