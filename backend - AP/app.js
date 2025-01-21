import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/char.js";
import wank from "./routes/wank.js";
import auth from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "https://www.tekkentactician.com",
      "http://localhost:5173",
      "https://kekken-tactician.vercel.app",
    ],
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", router);
app.use("/stats", wank);
app.use("/auth", auth);

// mongo connection
function connect() {
  mongoose.connection.on("connected", () => console.log("DB connected"));
  mongoose.connection.on("error", (error) => console.log("DB Error", error));

  return mongoose.connect(process.env.MONGO_URI);
}

connect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running on port 3000");
});
