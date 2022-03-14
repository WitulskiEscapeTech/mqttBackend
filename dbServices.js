const mongoose = require("mongoose");
const { puzzleSchema } = require("./schema");

let conn;

function setConnection(newConn){
    return(conn = newConn);
}

function getConnection(){
    if(!conn){
        conn = mongoose.createConnection("mongodb://localhost:27017/escapeDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
    }
    return conn
}

async function addPuzzle(puzzle) {
    const puzzleModel = getConnection().model("Puzzle", puzzleSchema);
    try {
      const puzzleToAdd = new puzzleModel(puzzle);
      let addedPuzzle = await puzzleToAdd.save();
      return addedPuzzle;
    } catch (error) {
      return null;
    }
}

async function getAllPuzzles() {
    const puzzleModel = getConnection().model("Puzzle", puzzleSchema);
    return await puzzleModel.find();
}

exports.getConnection = getConnection;
exports.setConnection = setConnection;
exports.addPuzzle = addPuzzle;
exports.getAllPuzzles = getAllPuzzles;
