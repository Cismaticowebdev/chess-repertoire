const express = require("express");
const router = express.Router();
const db = require("../db");

// Route to get data from the database
router.get("/data", async (req, res, next) => {
  try {
    const data = await db.any("SELECT * FROM repertoires");
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Route to insert data into the database
router.post("/data", async (req, res, next) => {
  const { title, moves, creator } = req.body;
  try {
    await db.none(
      "INSERT INTO repertoires(title, moves, creator) VALUES($1, $2, $3)",
      [title, moves, creator]
    );
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Route to update data in the database
router.put("/data/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, moves, creator } = req.body;
  try {
    await db.none(
      "UPDATE repertoires SET title = $1, moves = $2, creator = $3 WHERE id = $4",
      [title, moves, creator, id]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
