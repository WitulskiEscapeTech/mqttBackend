const { addPuzzle, getAllPuzzles, getConnection, setConnection } = require('./dbServices')

puzzle = {
    name: "test1",
    type: "activator",
    topic: "doesntmatter/now"
}

async function main(){
    await addPuzzle(puzzle);
    console.log(await getAllPuzzles());
}

main()
    .then()
    .catch(e => {console.log(e)})
