import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// ➕ ADD LEAD API
router.post("/", async (req, res) => {
  try {
    const { name, phone, source } = req.body;

    // validation
    if (!name || !phone || !source) {
      return res.status(400).json({ error: "All fields required" });
    }

    const result = await pool.query(
      "INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3) RETURNING *",
      [name, phone, source]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});  

// 📥 GET ALL LEADS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM leads ORDER BY id DESC");

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✏️ UPDATE LEAD STATUS
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const result = await pool.query(
      "UPDATE leads SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ❌ DELETE LEAD
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM leads WHERE id=$1", [id]);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✏️ UPDATE STATUS
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      "UPDATE leads SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;