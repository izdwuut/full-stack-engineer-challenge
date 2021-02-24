const api = require('./api')

const dbPool = require('./db');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    api.getLandingPads().then(pads => {
        res.status(200);
        res.send({
            result: JSON.stringify(pads)
        });
    })
    
});

app.get('/:id', async (req, res) => {
    api.getLandingPad(req.params.id).then(pad => {
        res.status(200);
        res.send({
            result: pad
        });
    })
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);