import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router.js";
import { config } from "dotenv";
config();

const port = process.env.port || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.mdb_url)
  .then(app.listen(port, () => console.log(`🟩🟩🟩`)))
  .catch((err) => console.log(err));
