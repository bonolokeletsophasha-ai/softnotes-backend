import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        orgin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

//Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the SoftNotesAPI!",
        status: "Server is running successfully.",
    });
});

export default app;