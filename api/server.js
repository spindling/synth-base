const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");

const app = express();
app.use(express.json());

async function startup(){
  db = await sqlite.open({
    filename: 'api.db',
    driver: sqlite3.Database
});
  
  const server = app.listen(3000, function() {
    console.log("RESTful API listening on port 3000");
  });
}

app.get("/api", async function(req, res){
    console.log("GET COLLECTION REQUEST RECEIVED");
    const data = await db.all("SELECT rowid as id, * FROM Synthesizers");
    res.json(data);
});

app.post("/api", async function(req,res){
    console.log("POST TO COLLECTION REQUEST RECEIVED");
    
});

app.delete("/api", async function(req, res){
    console.log("DELETE COLLECTION REQUEST RECEIVED");
    
});

app.get("/api/:id", async function(req, res){
    console.log("GET ITEM REQUEST RECEIVED");
    const data = await db.all("SELECT * FROM Synthesizers WHERE rowid=?", [req.params.id]);
    res.json(data);

});

app.put("/api/:id", async function(req, res){
    console.log("PUT/MODIFY ITEM REQUEST RECEIVED");

    await db.run("UPDATE Synthesizers SET model=?, make=?, price=?, keyboard=?, type=?, voice=? WHERE rowid=?",
        [req.body.make, req.body.model, req.body.price, req.body.keyboard, req.body.type, req.body.voice, req.params.id]);
    
    res.json({"status": `Record with id=${req.params.id} updated`});
});

app.delete("/api/:id", async function(req,res){
    console.log("DELETE ITEM REQUEST RECEIVED");
});

startup();
