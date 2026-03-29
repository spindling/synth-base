const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function startup(){

    db = await sqlite.open({
        filename: 'api.db',
        driver: sqlite3.Database
    });

    await db.run("DROP TABLE IF EXISTS Synthesizers");
    await db.run("CREATE TABLE Synthesizers (make TEXT, model TEXT, price INTEGER, keyboard INTEGER, type TEXT, voice TEXT)");
    await db.run("INSERT INTO Synthesizers VALUES (?,?,?,?,?,?)", 
        ["Moog", "MiniMoog", "7500", "1", "Analog", "Monophonic"]);
    await db.run("INSERT INTO Synthesizers VALUES (?,?,?,?,?,?)", 
        ["Yamaha", "DX7", "700", "1", "Digital", "Polyphonic"]);
    await db.run("INSERT INTO Synthesizers VALUES (?,?,?,?,?,?)", 
        ["ARP", "2600", "7500", "0", "Analog", "Monophonic"]);
}

startup();