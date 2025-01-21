// Import necessary modules
import express from "express";
import Character from "../models/Character.js";

const key = process.env.KEY;
// Create a new router
const router = express.Router();

// Route to create a new character
router.post("/characters/new", async (req, res) => {
  if (!req.body.key || req.body.key !== key) {
    return res.status(400).json({ message: "No you can't post here bozo" });
  }
  try {
    // Extract character data from request body
    const {
      name,
      image,
      heatSystem,
      mostImportantGrabs,
      guaranteedFollowUps,
      heatEngagers,
      importantMoves,
      punishers,
      importantCombos,
      wallCombos,
      comboEnders,
      chainThrows,
    } = req.body;

    // Create a new character document
    const newCharacter = new Character({
      name,
      image,
      heatSystem, // this includes the unique property and explanation for heat system
      mostImportantGrabs,
      guaranteedFollowUps,
      heatEngagers,
      importantMoves,
      punishers, // this includes all punisher data structured by game state
      importantCombos,
      wallCombos, // this includes general and with tornado categories
      comboEnders,
      chainThrows, // this includes all chain throws
    });

    // Save the character to the database
    const savedCharacter = await newCharacter.save();

    // Send a success response
    res.status(201).json(savedCharacter);
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({ message: error.message });
  }
});

// Get all characters
router.get("/characters", async (req, res) => {
  console.log(
    `Incoming request: ${req.method} ${req.url} from ${req.headers.origin}`
  );
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single character by ID
router.get("/characters/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({
        message: "Character not found",
      });
    }
    res.json(character);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// PATCH route for updating specific parts of a character
router.patch("/characters/:id", async (req, res) => {
  if (!req.body.key || req.body.key !== key) {
    return res.status(400).json({ message: "No you can't post here bozo" });
  }
  const { id } = req.params;
  const updates = req.body;

  try {
    let updateResult;
    if (updates.chainThrows) {
      updateResult = await Character.updateOne(
        { _id: id },
        {
          $push: { chainThrows: { $each: updates.chainThrows } },
        },
        { new: true, runValidators: true }
      );
    } else {
      updateResult = await Character.updateOne(
        { _id: id },
        {
          $set: updates,
        },
        { new: true, runValidators: true }
      );
    }

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.status(200).json({ message: "Character updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating character", error: error.message });
  }
});

export default router;
