const express = require("express");
const app = express();

const { initialiseDatabase } = require("./db/db.connect.js");

const Player = require("./models/players.model.js");

initialiseDatabase();

app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("HELLO, DEVELOPER");
});

app.get("/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(404).json({ error: "Unable to fetch the players" });
  }
});

app.post("/players", async (req, res) => {
  try {
    const player = new Player(req.body);
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    console.log("Error:", error);  // Log the actual error
    res.status(404).json({ error: "Unable to post the players" });
  }
});

app.put("/players/:id", async (req, res) => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedPlayer) {
      res.status(404).json({ error: "Unable to find the player" });
    }

    res.json(updatedPlayer);
  } catch (error) {
    res.status(404).json({ error: "Unable to edit the player" });
  }
});

app.delete("/players/:id", async (req, res) => {
  try {
    const deletePlayer = await Player.findByIdAndDelete(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!deletePlayer) {
      res.status(404).json({ error: "Unable to find the player" });
    }

    res.json({ deletePlayer });
  } catch (error) {
    res.status(404).json({ error: "Unable to delete the player" });
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on PORT ", PORT);
});
