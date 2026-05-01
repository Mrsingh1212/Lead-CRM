import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import leadRoutes from "./routes/lead.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/leads", leadRoutes);

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});