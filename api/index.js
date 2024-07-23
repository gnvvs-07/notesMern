import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
// middle wares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server running");
});
