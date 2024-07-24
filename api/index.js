import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// routes
import userRoute from "./routes/auth.route.js";
// express app
const app = express();
// middle wares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// data base connection
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
  console.log("DB connected");
});
// test api
app.get("/api/", (req, res) => {
  res.json({
    message: "Hello World",
    success: true,
  });
});
// routing
app.use("/api/user", userRoute);

// error hnalding
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({ success: false, statusCode, message });
});

// port and server logs
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server running");
});
