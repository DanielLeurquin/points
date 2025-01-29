const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;
const FILE_PATH = "scores.json";

app.use(express.json());
app.use(cors());

// Initialize scores file if not exists
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify({ player1: 0, player2: 0 }, null, 2));
}

// Read scores
app.get("/scores", (req, res) => {
  fs.readFile(FILE_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Could not read scores" });
    res.json(JSON.parse(data));
  });
});

// Update scores
app.post("/scores", (req, res) => {
  const { player1, player2 } = req.body;
  const newScores = { player1, player2 };

  fs.writeFile(FILE_PATH, JSON.stringify(newScores, null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Could not update scores" });
    res.json(newScores);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
