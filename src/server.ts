import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const URL = process.env.URL || " ";

async function main() {
  try {
    await mongoose.connect(URL);
    console.log("db connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
main().catch((err) => console.log(err));

import router from "./Routes/userRoute";
app.use("/api", router);


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
