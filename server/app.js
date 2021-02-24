const api = require('./api')

const dbPool = require('./db');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const rows = await dbPool.pool.query('SELECT * FROM spaceData');
    res.status(200);
    api.getLandingPads().then(pads => {
        // console.log(pads)
    })
    res.send({
        
        result: JSON.stringify(rows)
    });
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);