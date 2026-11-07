import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the SoftNotes API!",
    status: "Server is running successfully.",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

export default app;