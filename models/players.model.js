const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  placeOfBirth: {
    type: String,
    required: true,
  },
  contactAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  playingRole: {
    type: String,
    enum: ["Batsman", "Bowler", "All-Rounder"],
    required: true,
  },
  battingStyle: {
    type: String,
    enum: ["Right-Handed", "Left-Handed"],
    required: true,
  },
  bowlingStyle: {
    type: String,
    enum: ["Spin", "Pace"],
    required: true,
  },
});

module.exports = mongoose.model("Player", playerSchema);
