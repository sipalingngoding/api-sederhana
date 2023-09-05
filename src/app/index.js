import express from "express";
import {userRoute} from "../route/index.js";
import errorMiddleware from "../middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use(userRoute);

app.use(errorMiddleware);

app.use((req,res)=>{
    res.status(404).json({
        status : 'fail',
        message :'Route Not Found'
    });
});

export default app;
