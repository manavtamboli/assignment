const express = require('express');
const { MongoClient, ObjectId} = require('mongodb');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const jsonParser = bodyParser.json();

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/todo");
const db = mongoClient.db('todo');
const col = db.collection('todo');

app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.use(express.static('public'));

app.get('/');

// GET /items
app.get('/items', async function (req, res) {
    const items = await col.find().toArray();
    res.status(200);
    res.send({ items : items });
});

// POST /item
app.post('/item', jsonParser, async function (req, res) {
    const id = req.body.id;
    const title = req.body.title;
    const desc = req.body.desc;
    const finished = req.body.finished;

    const entry = {
        "title": title,
        "desc": desc,
        "finished": finished
    };
    console.log(req.body);

    if (!id) await col.insertOne(entry); // if id is not provided, insert new _todo
    else { // or else update existing _todo
        const filter = { "_id" : new ObjectId(id) };
        const options = { upsert : true };
        await col.updateOne(filter, { $set :{
                "title": title,
                "desc": desc,
                "finished": finished
            }  }, options);
    }

    res.status(200);
    res.send();
});

mongoClient.connect()
    .then(() => {
        console.log("Database Connected...");
        app.listen(8080, () => console.log("Server started listening..."));
    });