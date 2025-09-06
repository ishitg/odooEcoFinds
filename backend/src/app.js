import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/errorHandler.js";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended:true,limit: "16kb"}));

app.use(express.static("public"));

app.use(cookieParser());


// Router imports:
import productRouter from "./routes/product.router.js";


// routes declaration:
app.use("/api/products",productRouter);

//router imports
import userRouter from "./routes/user.route.js"

//router declarations
app.use("/api/users", userRouter);


//
app.use(errorHandler);

export {app}