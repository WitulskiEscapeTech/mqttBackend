const { mongoose } = require("mongoose");

const puzzleSchema = new mongoose.Schema({
    name: String,
    type: String,
    topic: String,
})

exports.puzzleSchema = puzzleSchema;