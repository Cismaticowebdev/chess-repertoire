const express = require("express");
const router = express.Router();
const db = require("../db");

// Route to get all the repertoires
router.get("/data", async (req, res, next) => {
  try {
    const data = await db.any("SELECT * FROM repertoires");
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Route to get a repertoire by id
router.get("/data/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await db.oneOrNone("SELECT * FROM repertoires WHERE id=$1", [
      id,
    ]);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "Repertoire not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Route to add a new repertoire
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

// Route to modify a repertoire
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

// Route to delete a repertoire
router.delete("/data/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.none("DELETE FROM repertoires WHERE id = $1", [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
