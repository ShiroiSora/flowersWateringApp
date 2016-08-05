// require the decache module:
import decache from 'decache';
import express from 'express';
import fs from 'fs';
import cors from 'cors';


let app = express();
const PORT = 8080;

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies


app.post('/plantApp/flower', (request, res, next) => { //next-switch to next post
    let body = '',
        json, filePath;

    filePath = __dirname + '/data/data.json';

    try {
        decache(filePath);
        json = require(filePath);
    }
    catch (e) {
        json = [];
    }
    json = [].concat(json, request.body);
    fs.writeFile(filePath, JSON.stringify(json), function() {
        res.end();
    });
});

app.get('/plantApp/flower', (req, res, next) => {

    let filePath = __dirname + '/data/' + 'data.json',
        data;

    try {
        decache(filePath);
        data = require(filePath);
    }
    catch (e) {
        console.log(e);
        res.status(404);
        data = {
            error: "Flowers not found!"
        };
    }
    res.json(data);
});

app.delete('/plantApp/flower/:name', (req, res, next) => {

    let json = [],
        filePath = __dirname + '/data/' + 'data.json',
        data;

    decache(filePath);
    data = require(filePath);
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === req.params.name) {
            data.splice(i, 1);
        }
    }
    json = [].concat(json, data);

    fs.writeFile(filePath, JSON.stringify(json), () => res.end());
});

app.put('/plantApp/flower', (req, res, next) => {

    let filePath = __dirname + '/data/' + 'data.json',
        data;

    let newData = req.body;
    decache(filePath);
    data = require(filePath);

    for (let i = 0; i < data.length; i++) {
        if (data[i].name === newData.name) {
            data[i].lastWateringDate = newData.lastWateringDate;
            data[i].nextWateringDate = newData.nextWateringDate;
            data[i].state = newData.state;
        }
    }
    console.log(JSON.stringify(data));

    fs.writeFile(filePath, JSON.stringify(data), () => res.end());
});



app.listen(PORT, () => console.log(`CORS-enabled web server listening on port ${PORT}`));