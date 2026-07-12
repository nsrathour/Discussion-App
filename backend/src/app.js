import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js"
import questionRoutes from "./routes/questionRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Discussion App API is Running");
});

app.use("/api/auth" , authRoutes)
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

export default app;